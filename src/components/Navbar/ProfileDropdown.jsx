import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useOutsideClick from "../../hooks/useOutsideClick";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-50 text-richblack-900 font-bold shadow-md hover:scale-105 transition"
      >
        {user?.name?.[0]?.toUpperCase() || "U"}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-richblack-800 text-white rounded-xl shadow-lg py-2">
          <Link
            to="/dashboard"
            className="block px-4 py-2 hover:bg-richblack-700 rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-richblack-700 rounded-lg"
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
