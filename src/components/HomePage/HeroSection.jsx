import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import HeroCTA from "./HeroCTA";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[100vh] flex flex-col items-center justify-center text-center px-6 mt-12 mb-10">
      {/* Background Gradient */}
      <div className="absolute inset-0  opacity-90 -z-10"></div>

      {/* Intro Text */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-base md:text-lg tracking-wider text-richblack-100 font-mono uppercase"
      >
        HappenHub — An Event Aggregator & Personalizer
      </motion.h2>

      {/* Typing Effect */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-3 text-lg md:text-xl font-mono text-richblack-50"
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
          speed={50}
          repeat={Infinity}
        />
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-6 text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-caribbeangreen-100 via-blue-200 to-richblue-200"
      >
        Discover, Join & Never Miss an Event
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-4 text-lg md:text-xl text-richblack-50 max-w-2xl"
      >
        HappenHub brings all your campus and city events together, with smart
        reminders and easy participation.
      </motion.p>

      {/* CTA Buttons */}
      <HeroCTA />

      {/* Video Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-10 w-full max-w-4xl rounded-2xl overflow-hidden shadow-lg border border-richblue-600"
      >
        <div className="relative w-full h-[220px] md:h-[360px] bg-gradient-to-r from-richblue-800 to-richblue-900 flex items-center justify-center">
          {/* Replace with your actual video */}
          <video
            className="w-full h-full object-cover"
            src="/videos/hero-demo.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>

          {/* Optional overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-richblue-900/70 via-transparent"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
