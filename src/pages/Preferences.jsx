import React, { useState } from "react";
import { motion } from "framer-motion";

const preferencesList = [
  "Hackathons",
  "Internships",
  "Jobs",
  "Technology",
  "Computer Science",
  "AI & Machine Learning",
  "Open Source",
  "Startups",
  "Web Development",
  "Mobile Development",
  "Cybersecurity",
  "Cloud Computing",
  "Data Science",
  "Competitive Programming",
  "DevOps",
];

const Preferences = ({ onComplete }) => {
  const [selectedPrefs, setSelectedPrefs] = useState([]);

  const togglePreference = (pref) => {
    setSelectedPrefs((prev) =>
      prev.includes(pref)
        ? prev.filter((item) => item !== pref)
        : [...prev, pref]
    );
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-richblack-900 text-white px-6">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-pink-200 via-blue-100 to-yellow-50 bg-clip-text text-transparent"
      >
        Choose Your Interests
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-gray-400 mt-2 text-center"
      >
        Select topics you care about so we can personalize your experience.
      </motion.p>

      {/* Preferences Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-8 max-w-3xl"
      >
        {preferencesList.map((pref) => (
          <button
            key={pref}
            onClick={() => togglePreference(pref)}
            className={`px-4 py-2 rounded-2xl border text-sm font-medium transition-all duration-300 ${
              selectedPrefs.includes(pref)
                ? "bg-yellow-300 text-richblack-900 border-yellow-400 scale-105"
                : "bg-richblack-800 border-richblack-600 hover:bg-richblack-700"
            }`}
          >
            {pref}
          </button>
        ))}
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 mt-10"
      >
        <button
          onClick={() => onComplete(selectedPrefs)}
          className="px-8 py-3 rounded-xl font-semibold text-richblack-900 shadow-lg transition-all duration-300 transform hover:scale-105"
          style={{
            background: "linear-gradient(to right, #fffad1, #fff6c2)",
          }}
        >
          Continue
        </button>

        <button
          onClick={() => onComplete([])}
          className="px-8 py-3 rounded-xl font-semibold bg-richblack-700 hover:bg-richblack-600 transition-all duration-300"
        >
          Skip for Now
        </button>
      </motion.div>
    </div>
  );
};

export default Preferences;
