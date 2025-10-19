import { motion } from "framer-motion";
import { FiCalendar, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const floatingAnimation = {
  float: {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const HeroCTA = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
    >
      {/* Primary CTA */}
      <motion.div variants={floatingAnimation} animate="float">
        <Link
          to="/explore"
          className="flex items-center gap-2 px-7 py-3 rounded-lg bg-purple-600 text-white font-bold text-base shadow-lg shadow-purple-600/40 hover:bg-purple-700 hover:scale-105 transition-all duration-300"
        >
          <FiCalendar /> Explore Events
        </Link>
      </motion.div>

      {/* Secondary CTA */}
      <motion.div
        variants={floatingAnimation}
        animate="float"
        transition={{ delay: 0.2 }}
      >
        <Link
          to="/host-an-event"
          className="flex items-center gap-2 px-7 py-3 rounded-lg border border-gray-600 text-gray-300 font-bold text-base hover:bg-white/10 hover:border-gray-400 hover:text-white transition-all duration-300 hover:scale-105"
        >
          <FiPlus /> Host Event
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default HeroCTA;