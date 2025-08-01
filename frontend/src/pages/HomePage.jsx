import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import { HeroSection } from "../components/hero-section-6";
import Footerdemo from "../components/ui/footer-section";
import CircularTestimonialsDemo from "../components/testimonials";

const categories = [
	{ href: "/Sneakers", name: "Sneakers", imageUrl: "/Sneakers.webp" },
	{ href: "/Oxfords", name: "Oxfords", imageUrl: "/Oxfords.webp" },
	{ href: "/Loafers", name: "Loafers", imageUrl: "/Loafers.webp" },
	{ href: "/Boots", name: "Boots", imageUrl: "/Boots.webp" },
	{ href: "/Sandals", name: "Sandals", imageUrl: "/Sandals.webp" },
	{ href: "/Dress Shoes", name: "Dress Shoes", imageUrl: "/Dress-shoes.webp" },
	{ href: "/Running Shoes", name: "Running Shoes", imageUrl: "/Running-shoes.webp" },
	{ href: "/Casual Shoes", name: "Casual Shoes", imageUrl: "/Casual-shoes.webp" },
	{ href: "/Ankle Boots", name: "Ankle Boots", imageUrl: "/Ankle-boots.webp" },
	{ href: "/Platform Shoes", name: "Platform Shoes", imageUrl: "/Platform-shoes.webp" },
	{ href: "/Football Boot", name: "Football Boot", imageUrl: "/Football-boots.webp" },
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className='relative min-h-screen text-white overflow-hidden'>
      <HeroSection />

      {/* <-- This ID must match your Navbar scroll anchor */}
      <div id="category" className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <h1 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>
          Explore Our Categories
        </h1>
        <p className='text-center text-xl text-gray-300 mb-12'>
          Discover the latest trends in eco-friendly fashion
        </p>
        <div className='flex flex-wrap justify-center gap-2'>
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>
        {!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
      </div>

      {/* IMPORTANT: add `id="testimonial"` to the wrapper div */}
      <div id="testimonial">
        <CircularTestimonialsDemo />
      </div>
      {/* Same for footer */}
      <div id="footer">
        <Footerdemo />
      </div>
    </div>
  );
};
export default HomePage;
