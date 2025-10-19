import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import HeroCTA from "./HeroCTA";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-12 pb-20 overflow-hidden font-sans">
      {/* Soft radial background glow */}
      <div className="absolute inset-0 bg-[#1F1F2E] -z-20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(147,51,234,0.15)_0%,_#1F1F2E_70%)] -z-10"></div>

      {/* Intro Text - UPDATED */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center" // Container to center the title and underline
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-purple-400">
          HappenHub
        </h2>
        <div className="mt-3 h-1.5 w-48 bg-purple-500 rounded-full"></div>
      </motion.div>
      
      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-4 text-base md:text-lg text-gray-400"
      >
        An Event Aggregator & Personalizer
      </motion.p>


      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-6 text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent 
        bg-gradient-to-r from-gray-200 to-gray-400 drop-shadow-[0_0_15px_rgba(147,51,234,0.3)]"
      >
        Discover, Join & Never Miss an Event
      </motion.h1>
      
      {/* Subheadline with Typing Effect */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-5 text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed"
      >
        <TypeAnimation
          sequence={[
            "Find the best campus and city events...",
            2000,
            "Get personalized AI recommendations...",
            2000,
            "Effortless participation, just one click away.",
            2500,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </motion.p>


      {/* CTA Buttons */}
      <HeroCTA />

      {/* Video Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-12 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/20 border border-white/10"
      >
        <div className="relative w-full aspect-video bg-[#2C2C44] flex items-center justify-center">
          <video
            className="w-full h-full object-cover"
            src="/videos/hero-demo.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F2E]/80 via-transparent"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;