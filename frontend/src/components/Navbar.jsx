import { useState } from "react";
import {
  ShoppingCart, UserPlus, LogIn, LogOut, Lock, Menu, X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

// MENU ITEMS for navigation
const menuItems = [
  { name: "Home", href: "/" },
  { name: "Category", href: "#category" },
  { name: "Testimonial", href: "#testimonial" },
  { name: "Footer", href: "#footer" },
];

export default function Navbar() {
  const [menuState, setMenuState] = useState(false);
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();
  const location = useLocation();

  // Helper: closes mobile menu when navigating
  const closeMenu = () => setMenuState(false);

  // Handles both smooth scrolling and normal navigation
  const handleMenuClick = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.getElementById(href.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      closeMenu();
    } else if (href === "/" && location.pathname === "/") {
      // If already on Home, scroll to top
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      closeMenu();
    }
    // else do nothing, let <Link> navigate as usual
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30">
      <nav
        data-state={menuState && "active"}
        className="group fixed z-20 w-full border-b border-dashed border-[#ede8d0] bg-[#fdf6ec]/80 backdrop-blur md:relative transition-colors duration-200"
      >
        <div className="m-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">

            {/* Logo and Hamburger */}
            <div className="flex w-full justify-between items-center lg:w-auto">
              <Link to="/" aria-label="home" className="flex items-center space-x-2">
                <span className="rounded-full bg-[#ede8d0] p-2">
                  <img
                    src="/logo.png"
                    alt="logo"
                    className="h-8 w-8 rotate-12"
                    loading="lazy"
                  />
                </span>
                <span className="font-bold text-base text-[#232323]">PRASANT</span>
              </Link>
              <button
                onClick={() => setMenuState((v) => !v)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-3 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu
                  className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-7 text-[#232323] font-bold transition duration-200"
                />
                <X
                  className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-7 -rotate-180 scale-0 opacity-0 transition duration-200 text-[#232323]"
                />
              </button>
            </div>

            {/* Nav Links and Actions */}
            <div
              className={`
                bg-[#fdfbd4] group-data-[state=active]:block mb-6 hidden w-full flex-wrap items-center justify-end
                space-y-8 rounded-3xl border border-[#ede8d0] p-6 shadow-2xl shadow-zinc-300/20
                md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0
                lg:shadow-none dark:shadow-none dark:lg:bg-transparent
                transition-all duration-200
              `}
            >
              {/* Main nav items */}
              <div className="lg:pr-4">
                <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      {item.href.startsWith("#") || (item.href === "/" && location.pathname === "/") ? (
                        <a
                          href={item.href}
                          onClick={(e) => handleMenuClick(e, item.href)}
                          className="text-[#232323] font-semibold hover:text-emerald-700 block px-2 py-1 rounded transition duration-150"
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          to={item.href}
                          onClick={closeMenu}
                          className="text-[#232323] font-semibold hover:text-emerald-700 block px-2 py-1 rounded transition duration-150"
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}

                  {/* Cart */}
                  {user && (
                    <li>
                      <Link
                        to="/cart"
                        onClick={closeMenu}
                        className="relative text-[#232323] font-semibold hover:text-emerald-700 px-2 py-1 rounded flex items-center transition"
                      >
                        <ShoppingCart size={18} className="mr-1" />
                        Cart
                        {cart.length > 0 && (
                          <span className="absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs ml-1">
                            {cart.length}
                          </span>
                        )}
                      </Link>
                    </li>
                  )}

                  {/* Admin dashboard (only if admin) */}
                  {isAdmin && (
                    <li>
                      <Link
                        to="/secret-dashboard"
                        onClick={closeMenu}
                        className="bg-[#232323] text-white px-4 py-1.5 rounded-md font-medium flex items-center transition hover:scale-105"
                      >
                        <Lock size={16} className="mr-1" />
                        <span className=" sm:inline text-white">Dashboard</span>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

              {/* Auth buttons */}
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:pl-6">
                {user ? (
                  <button
                    onClick={() => { closeMenu(); logout(); }}
                    className="bg-[#232323] hover:bg-[#444] text-white py-1.5 px-4 rounded-md flex items-center transition"
                  >
                    <LogOut size={16} />
                    <span className="ml-2">Log Out</span>
                  </button>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      onClick={closeMenu}
                      className="bg-[#232323] hover:bg-emerald-700 text-white py-1.5 px-4 rounded-md flex items-center transition"
                    >
                      <UserPlus size={16} className="mr-2" />
                      Sign Up
                    </Link>
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 px-4 rounded-md flex items-center transition"
                    >
                      <LogIn size={16} className="mr-2" />
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
