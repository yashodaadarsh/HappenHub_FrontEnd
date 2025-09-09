import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down -> hide navbar
        setVisible(false);
      } else {
        // Scrolling up -> show navbar
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Fixed Header with Animate on Scroll */}
      <header
        className={`fixed top-3 left-0 right-0 z-50 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-[150%]"
        }`}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 bg-richblack-800 shadow-md rounded-md">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl opacity-100 font-bold font-inter text-yellow-100"
          >
            HappenHub
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4 md:gap-6">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="text-yellow-100 font-bold border border-richblack-200 md:px-5 py-2 px-3 rounded-lg hover:bg-yellow-100 hover:text-richblack-800 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-yellow-100 text-richblack-700 font-bold px-4 py-2 rounded-lg hover:bg-richblack-700 hover:text-yellow-100 transition-all"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <ProfileDropdown />
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-yellow-100"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Mobile Menu Drawer */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-richblack-900 flex flex-col items-center gap-4 py-4 md:hidden shadow-lg border-t border-richblack-700">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-yellow-100 hover:text-yellow-200 text-lg"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-yellow-50 text-richblack-900 px-4 py-2 rounded-lg hover:bg-yellow-100 transition"
                  >
                    Sign up
                  </Link>
                </>
              ) : (
                <ProfileDropdown />
              )}
            </div>
          )}
        </nav>
      </header>

      {/* Spacer for Layout */}
      <div className="h-[60px] md:h-[64px]"></div>
    </>
  );
};

export default Navbar;
