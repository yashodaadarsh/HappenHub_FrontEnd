import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, LogOut } from "lucide-react"; // Consistent icons

import { logout } from "../../redux/slices/auth.slice"; // Assuming this path is correct
import useOutsideClick from "../../hooks/useOutsideClick"; // Assuming this path is correct

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Custom hook to close dropdown on outside click
  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
    navigate("/login");
  };

  const dropdownVariants = {
    initial: { opacity: 0, scale: 0.95, y: -10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -10 },
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2C2C44] border-2 border-transparent hover:border-purple-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
      >
        {/* You can use a profile image if available */}
        {/* <img src={user.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" /> */}
        <span className="text-lg font-bold text-gray-200">
          {user?.firstName?.[0]?.toUpperCase() || "U"}
        </span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute right-0 mt-2 w-56 origin-top-right bg-[#2C2C44]/80 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl shadow-purple-900/20"
          >
            <div className="p-2">
              {/* User Info Header */}
              <div className="px-3 py-2 border-b border-gray-700 mb-2">
                <p className="font-semibold text-gray-100 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
              
              {/* Dashboard Link */}
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center gap-3 px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-purple-600/30 hover:text-white transition-colors"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-purple-600/30 hover:text-white transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;