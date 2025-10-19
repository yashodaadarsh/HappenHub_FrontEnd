import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Ghost } from "lucide-react"; // Using Lucide for themed icons

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000); // Redirect after 5 seconds

    return () => clearTimeout(timer); // Cleanup timer
  }, [navigate]);

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center bg-[#1F1F2E] text-gray-200 px-6 overflow-hidden font-sans">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(147,51,234,0.1)_0%,_#1F1F2E_70%)] -z-10"></div>

      {/* Ghost Icon - Floating Animation */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: [0, -20, 0], opacity: 1 }}
        transition={{ 
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 0.8 } 
        }}
        className="mb-8"
      >
        <Ghost size={120} className="text-purple-400 opacity-80" />
      </motion.div>

      {/* Animated 404 */}
      <motion.h1
        initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
        className="text-7xl sm:text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text 
        bg-gradient-to-r from-purple-300 via-gray-200 to-purple-400 drop-shadow-[0_0_15px_rgba(147,51,234,0.4)]"
      >
        404
      </motion.h1>

      {/* Subtitle */}
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mt-6 text-2xl md:text-3xl font-semibold text-gray-100 text-center"
      >
        Uh oh! This page went on an adventure...
      </motion.h2>

      {/* Message */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-3 text-gray-400 text-center max-w-lg leading-relaxed"
      >
        It seems the event you were looking for has vanished into the digital ether.
        But don't worry, we'll get you back to the happening hub shortly!
      </motion.p>

      {/* Countdown Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-6 text-sm text-purple-300 animate-pulse"
      >
        Redirecting you to the homepage in 5 seconds...
      </motion.p>
    </div>
  );
};

export default NotFound;