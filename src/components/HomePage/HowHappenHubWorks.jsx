import { motion } from "framer-motion";
import { FaCalendarAlt, FaBell, FaUserFriends, FaStar } from "react-icons/fa";

const features = [
  {
    icon: <FaCalendarAlt className="text-cyan-400 text-xl" />,
    title: "Discover Events",
    desc: "Explore curated events happening across your campus and city.",
  },
  {
    icon: <FaUserFriends className="text-cyan-400 text-xl" />,
    title: "Personalized Feed",
    desc: "AI-powered recommendations based on your interests.",
  },
  {
    icon: <FaBell className="text-cyan-400 text-xl" />,
    title: "Smart Reminders",
    desc: "Get notified before events you care about start.",
  },
  {
    icon: <FaStar className="text-cyan-400 text-xl" />,
    title: "Join & Engage",
    desc: "RSVP easily and interact with event organizers directly.",
  },
];

const HowHappenHubWorks = () => {
  return (
    <section className="w-full py-20 px-6 bg-[#0B0B0B] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,212,255,0.08)_0%,_#0B0B0B_80%)] -z-10"></div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* LEFT SIDE — TIMELINE STYLE FEATURES */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
            How HappenHub Works
          </h2>

          <div className="relative pl-10">
            {/* Vertical Line */}
            <div className="absolute left-3 top-0 w-[2px] h-full bg-gradient-to-b from-cyan-400 via-blue-500 to-transparent"></div>

            <div className="flex flex-col gap-10">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="relative flex items-start gap-4"
                >
                  {/* Dot on Line */}
                  <div className="absolute left-[-1.2rem] w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(0,255,255,0.5)]"></div>

                  <div className="p-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-300">
                      {f.title}
                    </h3>
                    <p className="text-gray-300 text-sm max-w-xs">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE — SINGLE GLASS CARD */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 w-full flex justify-center"
        >
          <div className="relative w-[340px] md:w-[380px] bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-2xl">
            {/* Top Card - Event Preview */}
            <div className="p-5 rounded-xl bg-white/10 border border-white/10">
              <h4 className="text-lg font-semibold text-cyan-300">
                AI & Robotics Expo
              </h4>
              <p className="text-sm text-gray-300">Nov 24, 2025 · IIT Madras</p>
              <div className="mt-3 flex gap-2">
                <span className="px-3 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400/30">
                  Tech
                </span>
                <span className="px-3 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full border border-blue-400/30">
                  Workshop
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] my-6 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            {/* Bottom Card - CTA */}
            <div className="p-5 rounded-xl bg-white/10 border border-white/10">
              <h4 className="text-lg font-semibold mb-2">Ready to Join?</h4>
              <p className="text-sm text-gray-300 mb-4">
                Sign up now and personalize your event feed instantly.
              </p>
              <button className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-400 text-black font-semibold rounded-full hover:scale-105 transition-transform shadow-md">
                Sign Up Free
              </button>
            </div>

            {/* Subtle Glow */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-cyan-400/20 rounded-full blur-3xl"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowHappenHubWorks;
