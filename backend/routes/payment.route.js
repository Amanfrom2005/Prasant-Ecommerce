// backend/routes/payment.routes.js
import { Router } from "express";
import { createCheckoutOrder, verifyPayment } from "../controllers/payment.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js"; // your auth middleware

const router = Router();

router.post("/create-order", protectRoute, createCheckoutOrder);
router.post("/verify-payment", protectRoute, verifyPayment);

export default router;
