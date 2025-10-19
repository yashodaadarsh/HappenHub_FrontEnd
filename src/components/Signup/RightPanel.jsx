import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCircle, Sparkles, LayoutGrid, CheckCircle2 } from "lucide-react";

// Configuration for each step's content
const panelContent = [
  {
    icon: UserCircle,
    title: "Welcome to HappenHub!",
    description: "Let's start with your basic account details.",
  },
  {
    icon: Sparkles,
    title: "Tell Us Your Interests",
    description: "This helps us recommend the best tech events for you.",
  },
  {
    icon: LayoutGrid,
    title: "Set Your Preferences",
    description: "Choose the types of events you'd like to see on your feed.",
  },
  {
    icon: CheckCircle2,
    title: "You're Almost Done!",
    description: "Just one final look before you join the hub.",
  },
];

// Animation variants for the content transition
const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const RightPanel = ({ currentStep }) => {
  // Get the content for the current step (adjusting for 0-based array index)
  const content = panelContent[currentStep - 1];

  if (!content) return null; // Return null if step is out of bounds

  return (
    <div className="hidden md:flex justify-center items-start pt-16">
      <div
        className="w-full max-w-md h-[450px] bg-[#2C2C44] rounded-2xl border border-white/10 
                   flex items-center justify-center text-center p-8 
                   shadow-2xl shadow-purple-900/20"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep} // This key is crucial for AnimatePresence to detect changes
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <content.icon className="text-6xl text-purple-400 mb-6" strokeWidth={1.5}/>
            <h3 className="text-2xl font-bold text-gray-100 mb-2">
              {content.title}
            </h3>
            <p className="text-gray-400 max-w-xs">
              {content.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RightPanel;