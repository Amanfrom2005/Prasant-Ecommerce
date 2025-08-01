import { Link } from "react-router-dom";
import GlowCard from "./ui/spotloght-card";

const CategoryItem = ({ category }) => {
  return (
    <GlowCard
      className="overflow-hidden group cursor-pointer"
      glowColor="purple"  // try "blue", "green", "red", "orange"
      size="lg"
    >
      <Link to={"/category" + category.href}>
        <div className="relative w-full h-72 rounded-2xl overflow-hidden">
          {/* Fade overlay */}
          <div className="absolute inset-0 z-10 rounded-2xl pointer-events-none" />
          {/* Main image with zoom */}
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-110"
            loading="lazy"
          />
          {/* Text overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="text-white text-2xl font-bold mb-2">{category.name}</h3>
            <p className="text-gray-200 text-sm">Explore {category.name}</p>
          </div>
        </div>
      </Link>
    </GlowCard>
  );
};

export default CategoryItem;
