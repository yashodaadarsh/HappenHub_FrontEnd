import React from "react";
import { motion } from "framer-motion";
import { 
  Code, Palette, Briefcase, Mic, Gamepad, Rocket, Award, Users, Handshake, Presentation, PenTool, FlaskConical 
} from "lucide-react";

// --- Data for the scrolling rows ---
const row1 = [
  { icon: <Code />, name: "Hackathons" },
  { icon: <Briefcase />, name: "Internships" },
  { icon: <Rocket />, name: "AI & ML" },
  { icon: <Gamepad />, name: "Gaming Jams" },
  { icon: <Mic />, name: "Tech Talks" },
  { icon: <Users />, name: "Job Fairs" },
];

const row2 = [
  { icon: <Palette />, name: "Design Sprints" },
  { icon: <Presentation />, name: "Conferences" },
  { icon: <FlaskConical />, name: "Science Expos" },
  { icon: <PenTool />, name: "Workshops" },
  { icon: <Handshake />, name: "Networking" },
  { icon: <Award />, name: "Competitions" },
];

// Reusable component for a single scrolling row
const ScrollingRow = ({ items, direction = "left" }) => {
  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <motion.ul
        className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll"
        animate={{
          x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          animationPlayState: "running",
        }}
      >
        {[...items, ...items].map((item, index) => (
          <li
            key={index}
            className="flex-shrink-0 flex items-center justify-center gap-3 bg-[#2C2C44] text-gray-200 rounded-full px-5 py-3 border border-white/10"
          >
            <span className="text-purple-400">{item.icon}</span>
            <span className="font-semibold text-lg">{item.name}</span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

const InteractiveScroller = () => {
  return (
    <section className="w-full bg-[#1F1F2E] text-white py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-100 mb-4 text-center"
        >
          An Endless Stream of Opportunities
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-400 mb-12 text-center max-w-2xl text-lg"
        >
          From hackathons to internships, discover a constantly flowing river of events tailored to your interests. Hover to pause and explore.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="w-full flex flex-col items-center gap-6 group"
        >
          <div className="w-full space-y-6 group-hover:[&_ul]:[animation-play-state:paused]">
             <ScrollingRow items={row1} direction="left" />
             <ScrollingRow items={row2} direction="right" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
            <button 
              onClick={() => window.location.href='/explore'}
              className="px-8 py-4 bg-purple-600 text-white font-bold text-lg rounded-lg hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/30 transform hover:scale-105"
            >
                Explore All Events
            </button>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveScroller;