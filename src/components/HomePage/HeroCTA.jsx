import { motion } from "framer-motion";
import { FaCalendarAlt, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

// Floating animation variants
const floatingAnimation = {
  float: {
    y: [0, -8, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const HeroCTA = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="mt-8 flex flex-col md:flex-row gap-4 justify-center items-center"
    >
      {/* Primary CTA */}
      <motion.div variants={floatingAnimation} animate="float">
        <Link
          to="/explore"
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-caribbeangreen-200 to-blue-300 text-richblack-900 font-bold text-lg shadow-lg hover:scale-105 hover:shadow-caribbeangreen-200/40 transition-all"
        >
          <FaCalendarAlt /> Explore Events
        </Link>
      </motion.div>

      {/* Secondary CTA */}
      <motion.div variants={floatingAnimation} animate="float">
        <Link
          to="/create-event"
          className="flex items-center gap-2 px-6 py-3 rounded-full border border-richblue-200 text-richblue-200 font-bold text-lg hover:bg-richblue-200 hover:text-richblack-900 transition-all hover:scale-105"
        >
          <FaPlus /> Create Event
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default HeroCTA;
