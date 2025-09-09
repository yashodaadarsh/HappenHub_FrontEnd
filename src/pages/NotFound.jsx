import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-richblack-900 text-white px-6">
      {/* Animated 404 */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-8xl md:text-9xl font-extrabold text-yellow-300 drop-shadow-lg"
      >
        404
      </motion.h1>

      {/* Subtitle */}
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-4 text-2xl md:text-3xl font-semibold text-gray-300 text-center"
      >
        Oops! Page Not Found
      </motion.h2>

      {/* Message */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-2 text-gray-400 text-center max-w-lg"
      >
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </motion.p>

      {/* Go Home Button */}
      <motion.button
        onClick={() => navigate("/")}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
        className="mt-8 px-8 py-4 rounded-xl font-semibold text-richblack-900 shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
        style={{
          background: "linear-gradient(to right, #fffad1, #fff6c2)",
        }}
      >
        Go Back Home
      </motion.button>
    </div>
  );
};

export default NotFound;
