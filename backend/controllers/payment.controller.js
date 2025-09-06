import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import { razorpay } from "../lib/razorpay.js";

export const createCheckoutOrder = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    let totalAmount = 0;
    products.forEach((p) => {
      totalAmount += p.price * p.quantity;
    });

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });
      if (coupon) {
        totalAmount -= (totalAmount * coupon.discountPercentage) / 100;
      }
    }

    // Razorpay wants amount in paise (INR * 100)
    const options = {
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
      notes: {
        userId: req.user._id.toString(),
        products: JSON.stringify(products),
        couponCode: couponCode || "",
      },
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      orderId: order.id,
      currency: order.currency,
      amount: order.amount,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

import crypto from "crypto";

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    // Save order in DB
    const orderNotes = req.body.notes ? JSON.parse(req.body.notes) : {};
    const products = orderNotes.products ? JSON.parse(orderNotes.products) : [];

    const newOrder = new Order({
      user: orderNotes.userId,
      products: products.map((p) => ({
        product: p._id,
        quantity: p.quantity,
        price: p.price,
      })),
      totalAmount: req.body.amount / 100, // convert paise to INR
    });

    await newOrder.save();

    res.status(200).json({ success: true, orderId: newOrder._id });
  } catch (error) {
    console.error("Payment verification failed:", error);
    res.status(500).json({ error: "Payment verification failed" });
  }
};


export const checkoutSuccess = async (req, res) => {
	try {
		const { sessionId } = req.body;
		const session = await stripe.checkout.sessions.retrieve(sessionId);

		if (session.payment_status === "paid") {
			if (session.metadata.couponCode) {
				await Coupon.findOneAndUpdate(
					{
						code: session.metadata.couponCode,
						userId: session.metadata.userId,
					},
					{
						isActive: false,
					}
				);
			}

			// create a new Order
			const products = JSON.parse(session.metadata.products);
			const newOrder = new Order({
				user: session.metadata.userId,
				products: products.map((product) => ({
					product: product.id,
					quantity: product.quantity,
					price: product.price,
				})),
				totalAmount: session.amount_total / 100, // convert from cents to dollars,
				stripeSessionId: sessionId,
			});

			await newOrder.save();

			res.status(200).json({
				success: true,
				message: "Payment successful, order created, and coupon deactivated if used.",
				orderId: newOrder._id,
			});
		}
	} catch (error) {
		console.error("Error processing successful checkout:", error);
		res.status(500).json({ message: "Error processing successful checkout", error: error.message });
	}
};

async function createStripeCoupon(discountPercentage) {
	const coupon = await stripe.coupons.create({
		percent_off: discountPercentage,
		duration: "once",
	});

	return coupon.id;
}

async function createNewCoupon(userId) {
	await Coupon.findOneAndDelete({ userId });

	const newCoupon = new Coupon({
		code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
		discountPercentage: 10,
		expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
		userId: userId,
	});

	await newCoupon.save();

	return newCoupon;
}
