import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import TypingText from "./TypingText";

const features = [
  {
    title: "Unified Events",
    description: "All events scattered? We bring them together.",
  },
  { title: "Personalized", description: "Personalized just for you." },
  {
    title: "Smart Reminders",
    description: "Smart reminders so you never miss anything.",
  },
  {
    title: "Better Participation",
    description: "Better participation, better experiences.",
  },
];

const WhyHappenHub = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // 🔧 Make animation start earlier & smoother
  const scale = useTransform(scrollYProgress, [0, 0.1], [0.75, 1]); // smoother growth
  const y = useTransform(scrollYProgress, [0, 0.1], ["120%", "0%"]); // appear slightly earlier
  const rotate = useTransform(scrollYProgress, [0, 0.1], [-12, 0]); // softer rotation
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.9, 1],
    [0, 1, 1, 0]
  );

  const [activeIndex, setActiveIndex] = useState(-1);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (v < 0.25) {
        setActiveIndex(-1);
        setShowCelebration(false);
      } else if (v >= 0.25 && v < 0.85) {
        const stepSize = 0.6 / features.length;
        const index = Math.floor((v - 0.25) / stepSize);
        setActiveIndex(index >= 0 && index < features.length ? index : -1);
        setShowCelebration(false);
      } else {
        setActiveIndex(-1);
        setShowCelebration(true);
      }
    });
  }, [scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[450vh] "
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.div
          style={{ scale, y, rotate, opacity }}
          className="relative flex flex-col items-center"
          transition={{
            type: "spring", // 🔧 smoother spring animation
            stiffness: 80,
            damping: 15,
          }}
        >
          {/* Laptop Image */}
          <img
            src="/laptop.png"
            alt="Laptop"
            className="w-[95vw] md:w-[75vw] lg:w-[65vw] drop-shadow-2xl"
          />

          {/* Laptop Screen Content */}
          <div className="absolute top-[30%] w-[70%] md:w-[55%] text-center px-2">
            {!showCelebration ? (
              <>
                {activeIndex === -1 ? (
                  <motion.h2
                    key="why"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-6xl font-extrabold bg-gradient-to-r from-caribbeangreen-100 via-blue-200 to-richblue-200 bg-clip-text text-transparent"
                  >
                    Why HappenHub?
                  </motion.h2>
                ) : (
                  <motion.div
                    key={features[activeIndex].title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl md:text-6xl font-bold bg-gradient-to-r from-caribbeangreen-100 via-blue-200 to-richblue-200 bg-clip-text text-transparent">
                      {features[activeIndex].title}
                    </h3>
                    <TypingText text={features[activeIndex].description} />
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                key="done"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <span className="text-3xl md:text-4xl font-bold text-caribbeangreen-100 animate-bounce">
                  That's It ! Explore Events Now !!!
                </span>
                <span className="text-lg text-richblack-50">
                  Explore events now and never miss out again.
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyHappenHub;
