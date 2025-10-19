import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown"; // Assuming this component exists
import { Menu, X, CalendarDays, LogIn, UserPlus } from "lucide-react";

const Navbar = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Add a background blur when user scrolls down a bit
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
      >
        <nav
          className={`max-w-6xl mx-auto flex items-center justify-between mt-3 px-6 py-3 
          rounded-xl border border-white/10 shadow-lg shadow-purple-900/20 transition-all duration-300
          ${isScrolled ? "bg-[#2C2C44]/50 backdrop-blur-lg" : "bg-transparent backdrop-blur-none"}`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-gray-100"
          >
            <CalendarDays className="text-purple-400" />
            HappenHub
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-5 py-2 rounded-lg border border-gray-600 text-gray-300 font-semibold hover:bg-white/10 hover:border-gray-400 hover:text-white transition-all duration-300"
                >
                  <LogIn size={16} />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 px-5 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-300 shadow-lg shadow-purple-600/30"
                >
                  <UserPlus size={16} />
                  Sign up
                </Link>
              </>
            ) : (
              <ProfileDropdown />
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-300"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div 
            className="fixed top-[76px] left-0 w-full z-40 bg-[#1F1F2E] flex flex-col items-center gap-6 py-6 md:hidden shadow-2xl border-t border-white/10"
            onClick={() => setMobileMenuOpen(false)} // Close menu on link click
        >
            {!isLoggedIn ? (
            <>
                <Link
                to="/login"
                className="flex items-center gap-2 text-lg text-gray-300 hover:text-purple-400"
                >
                <LogIn size={20} />
                Login
                </Link>
                <Link
                to="/signup"
                className="flex items-center gap-2 text-lg text-gray-300 hover:text-purple-400"
                >
                <UserPlus size={20} />
                Sign up
                </Link>
            </>
            ) : (
            <ProfileDropdown />
            )}
        </div>
      )}

      {/* Spacer to prevent content from hiding behind the fixed navbar */}
      <div className="h-[84px]"></div>
    </>
  );
};

export default Navbar;