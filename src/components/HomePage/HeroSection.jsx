import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import HeroCTA from "./HeroCTA";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[100vh] flex flex-col items-center justify-center text-center px-6 mt-12 mb-10 overflow-hidden">
      {/* Soft radial background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(10,90,114,0.25)_0%,_#000814_80%)] -z-10"></div>

      {/* Intro Text */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-sm md:text-base tracking-widest text-caribbeangreen-100 font-mono uppercase"
      >
        HappenHub — An Event Aggregator & Personalizer
      </motion.h2>

      {/* Typing Effect */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-4 text-base md:text-xl font-mono text-blue-100"
      >
        <TypeAnimation
          sequence={[
            "Find the best events around you...",
            1500,
            "Get personalized recommendations...",
            1500,
            "Never miss what's happening next!",
            2000,
          ]}
          speed={45}
          repeat={Infinity}
        />
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-6 text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent 
        bg-gradient-to-r from-caribbeangreen-100 via-blue-100 to-richblue-100 drop-shadow-[0_0_15px_rgba(17,138,178,0.35)]"
      >
        Discover, Join & Never Miss an Event
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-5 text-lg md:text-xl text-richblack-100 max-w-2xl leading-relaxed"
      >
        HappenHub connects you to the most exciting campus and city events —
        personalized just for you with smart reminders and effortless
        participation.
      </motion.p>

      {/* CTA Buttons */}
      <HeroCTA />

      {/* Video Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-10 w-full max-w-4xl rounded-2xl overflow-hidden shadow-lg border border-richblue-600"
      >
        <div className="relative w-full h-[220px] md:h-[360px] bg-gradient-to-r from-richblue-800 to-richblue-900 flex items-center justify-center">
          <video
            className="w-full h-full object-cover"
            src="/videos/hero-demo.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>
          <div className="absolute inset-0 bg-gradient-to-t from-richblue-900/70 via-transparent"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
