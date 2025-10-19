import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TypingText from "./TypingText"; // Assuming this is already themed
import { ArrowRight, PartyPopper } from "lucide-react";

const features = [
  {
    title: "All Events, One Place.",
    description: "Tired of searching everywhere? We unify events from across campus and the city into one seamless feed.",
  },
  {
    title: "Your Personal Curator.",
    description: "Our AI learns what you love and recommends events you won't want to miss. It's like having a personal event planner.",
  },
  {
    title: "Never Miss a Beat.",
    description: "Get smart reminders before your favorite events start, so you're always on time and in the know.",
  },
  {
    title: "1-Click Participation.",
    description: "Register for hackathons, workshops, and more with a single click. No more filling out the same forms again and again.",
  },
];

// Animation variants for the text inside the laptop screen
const textVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const WhyHappenHub = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smoother scroll-based animations for the laptop
  const scale = useTransform(scrollYProgress, [0, 0.15], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 0.15], ["100%", "0%"]);
  const rotate = useTransform(scrollYProgress, [0, 0.15], [-10, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // This effect maps the scroll progress to the active feature index
    return scrollYProgress.on("change", (v) => {
      const featureStart = 0.25;
      const featureEnd = 0.85;

      if (v < featureStart) {
        setActiveIndex(-1);
        setShowCelebration(false);
      } else if (v >= featureStart && v < featureEnd) {
        const stepSize = (featureEnd - featureStart) / features.length;
        const index = Math.floor((v - featureStart) / stepSize);
        setActiveIndex(index >= 0 && index < features.length ? index : -1);
        setShowCelebration(false);
      } else {
        setActiveIndex(-1);
        setShowCelebration(true);
      }
    });
  }, [scrollYProgress]);

  // --- INTERACTIVE FEATURE: Click to advance ---
  const handleNextFeature = () => {
    const sectionHeight = sectionRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const totalScrollableHeight = sectionHeight - viewportHeight;
    
    const featureStart = 0.25;
    const featureEnd = 0.85;
    const stepSize = (featureEnd - featureStart) / features.length;
    
    // Calculate the scroll progress for the *next* feature
    const nextIndex = activeIndex < features.length - 1 ? activeIndex + 1 : features.length;
    const targetProgress = featureStart + nextIndex * stepSize;
    
    // Convert progress to a pixel value and scroll smoothly
    const targetScrollY = sectionRef.current.offsetTop + totalScrollableHeight * targetProgress;
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="relative min-h-[450vh] bg-[#1F1F2E]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale, y, rotate, opacity }}
          className="relative flex flex-col items-center cursor-pointer"
          onClick={handleNextFeature} // Click to scroll to the next feature
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }} // Interactive hover
        >
          {/* Laptop Image */}
          <img src="/laptop.png" alt="HappenHub on a Laptop" className="w-[95vw] md:w-[75vw] lg:w-[65vw] drop-shadow-2xl" />

          {/* Laptop Screen Content */}
          <div className="absolute top-[28%] w-[68%] md:w-[55%] h-[45%] flex items-center justify-center text-center px-2">
            <AnimatePresence mode="wait">
              {!showCelebration ? (
                activeIndex === -1 ? (
                  <motion.h2
                    key="why"
                    variants={textVariants} initial="initial" animate="animate" exit="exit"
                    className="text-3xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-gray-200 to-purple-300"
                  >
                    Why HappenHub?
                  </motion.h2>
                ) : (
                  <motion.div
                    key={features[activeIndex].title}
                    variants={textVariants} initial="initial" animate="animate" exit="exit"
                  >
                    <h3 className="text-2xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-gray-200">
                      {features[activeIndex].title}
                    </h3>
                    <TypingText text={features[activeIndex].description} />
                  </motion.div>
                )
              ) : (
                <motion.div
                  key="done"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex flex-col items-center gap-4"
                >
                  <PartyPopper size={64} className="text-purple-400 animate-bounce" />
                  <span className="text-2xl md:text-4xl font-bold text-purple-300">
                    Ready to Dive In?
                  </span>
                  {/* INTERACTIVE FEATURE: Final CTA Button */}
                  <motion.button
                    onClick={() => navigate('/explore')}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 mt-4 px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold shadow-lg shadow-purple-600/30"
                  >
                    Explore Events Now <ArrowRight size={18}/>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyHappenHub;