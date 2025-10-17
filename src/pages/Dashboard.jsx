import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {  setEvents } from "../redux/slices/recommendation.slice";
import EventCard from "../components/EventCard";
import { FaHome, FaHeart, FaCog, FaBars, FaTimes } from "react-icons/fa";
import { GET_PERSONALIZED_FEED } from "../api/apis";
import axios from "axios";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { events, loading, error } = useSelector((state) => state.recommendation);
  const { authLoading } = useSelector((state) => state.auth);
  const { isLoggedIn, user, userDetails } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Remove the useEffect from Dashboard since we're now fetching in initializeAuthAndFetchFeed

  // Check if we're on the main dashboard route (not nested)
  const isMainDashboard = location.pathname === "/dashboard";

  if ((loading || authLoading) && isMainDashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-richblack-900 text-white">
        <div className="text-xl">Loading your personalized events...</div>
      </div>
    );
  }

  if (error && isMainDashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-richblack-900 text-white">
        <div className="text-xl text-pink-200">{error}</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-richblack-900 text-white">
        <div className="text-xl">Please log in to view your personalized events.</div>
      </div>
    );
  }

  const sidebarItems = [
    { path: "/dashboard", icon: FaHome, label: "Home", active: isMainDashboard },
    { path: "/dashboard/wishlist", icon: FaHeart, label: "Wishlist", active: location.pathname === "/dashboard/wishlist" },
    { path: "/dashboard/profile", icon: FaCog, label: "My Profile", active: location.pathname === "/dashboard/profile" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-richblack-900 text-white flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-richblack-800 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-center h-16 bg-richblack-900 border-b border-richblack-700">
          <h2 className="text-xl font-bold text-white">Dashboard</h2>
        </div>

        <nav className="mt-8">
          {sidebarItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                  item.active
                    ? "bg-blue-600 text-white border-r-4 border-blue-400"
                    : "text-gray-300 hover:bg-richblack-700 hover:text-white"
                }`}
              >
                <IconComponent className="mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-richblack-900 border-b border-richblack-700 px-4 py-4 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden mr-4 p-2 rounded-md text-gray-400 hover:text-white hover:bg-richblack-800"
              >
                {sidebarOpen ? <FaTimes /> : <FaBars />}
              </button>
              <h1 className="text-2xl font-bold text-white">
                {sidebarItems.find(item => item.active)?.label || "Dashboard"}
              </h1>
            </div>
            <div className="text-sm text-gray-400">
              Welcome back, {userDetails?.firstName || user?.name || user?.firstName || "User"}!
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          {isMainDashboard ? (
            <div className="p-6">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-200 via-blue-100 to-yellow-50"
              >
                Your Personalized Events
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center text-richblack-100 mb-12 text-lg"
              >
                Discover events tailored just for you based on your preferences.
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, index) => (
                  <EventCard key={event.event_id} event={event} index={index} />
                ))}
              </div>

              {events.length === 0 && (
                <div className="text-center text-richblack-300 mt-12">
                  <p className="text-xl">No personalized events found at the moment.</p>
                  <p className="mt-2">Update your preferences to get better recommendations!</p>
                </div>
              )}
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
