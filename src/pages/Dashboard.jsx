import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchPersonalizedFeed, setCurrentPage } from "../redux/slices/recommendation.slice";
import { fetchWishlistEvents } from "../redux/slices/wishlist.slice";
import EventCard from "../components/EventCard";
import { LayoutDashboard, Heart, Settings, Menu, X, CalendarDays, PanelLeftClose, PanelRightClose } from "lucide-react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { events, loading, error, currentPage, totalPages } = useSelector((state) => state.recommendation);
  const { isLoggedIn, userDetails, authLoading } = useSelector((state) => state.auth);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  useEffect(() => {
    if (isLoggedIn && userDetails) {
      if (events.length === 0) {
        dispatch(fetchPersonalizedFeed({ page: 0, size: 12 }));
      }
      dispatch(fetchWishlistEvents(userDetails.email));
    }
  }, [isLoggedIn, userDetails, dispatch, events.length]);

  const isMainDashboard = location.pathname === "/dashboard";
  const isLoading = (loading || authLoading || (!userDetails && isLoggedIn));

  if (isLoading && isMainDashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1F1F2E] text-gray-300 font-sans">
        Loading Your Personalized Hub...
      </div>
    );
  }

  const sidebarItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Home" },
    { path: "/dashboard/wishlist", icon: Heart, label: "Wishlist" },
    { path: "/dashboard/profile", icon: Settings, label: "My Profile" },
    // Add more links here to test sidebar scrolling if needed
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#1F1F2E] text-gray-200 flex font-sans">
      {/* --- UPDATED SIDEBAR --- */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 bg-[#2C2C44] border-r border-white/10 
                   transform lg:sticky lg:top-0 h-screen overflow-y-auto  // <-- KEY CHANGES HERE
                   transition-all duration-300 ease-in-out
                   ${isSidebarExpanded ? 'w-64' : 'w-20'}
                   ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex items-center justify-between h-20 px-4 border-b border-white/10 sticky top-0 bg-[#2C2C44] z-10">
            <div className={`flex items-center gap-2 overflow-hidden transition-all duration-300 ${isSidebarExpanded ? 'w-40' : 'w-0'}`}>
                <CalendarDays className="text-purple-400 flex-shrink-0" size={24}/>
                <h2 className="text-2xl font-bold text-gray-100 whitespace-nowrap">HappenHub</h2>
            </div>
            <button 
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)} 
              className="p-2 rounded-lg hover:bg-white/10 hidden lg:block"
            >
                {isSidebarExpanded ? <PanelLeftClose /> : <PanelRightClose />} 
            </button>
        </div>

        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center py-3.5 text-left transition-all duration-200 relative
                  ${isSidebarExpanded ? 'px-6' : 'px-0 justify-center'}
                  ${isActive
                    ? "bg-purple-600/20 text-purple-300 font-semibold"
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                  }`}
              >
                {isActive && <div className={`absolute left-0 h-full w-1 bg-purple-500 rounded-r-full transition-all`}></div>}
                <item.icon className="flex-shrink-0" size={22} />
                <span className={`whitespace-nowrap overflow-hidden transition-all ${isSidebarExpanded ? 'w-full ml-4' : 'w-0'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-[#1F1F2E] border-b border-white/10 px-4 py-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden mr-4 p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10">
                {sidebarOpen ? <X /> : <Menu />}
              </button>
              <h1 className="text-xl font-bold text-gray-100">
                {sidebarItems.find(item => location.pathname === item.path)?.label || "Dashboard"}
              </h1>
            </div>
            <div className="text-sm text-gray-400">
              Welcome, <span className="font-semibold text-gray-200">{userDetails?.firstName || "User"}</span>!
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {isMainDashboard ? (
            <div className="p-6">
              <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-gray-100 mb-2">
                Your Personalized Feed
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{delay: 0.1}} className="text-gray-400 mb-8">
                Discover events we think you'll love.
              </motion.p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {events.map((event, index) => (
                  <EventCard key={event.event_id} event={event} index={index} />
                ))}
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
};

export default Dashboard;