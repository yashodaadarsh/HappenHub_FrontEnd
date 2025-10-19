import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TypingText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) return;
    
    setDisplayedText("");
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(intervalId);
      }
    }, 35); // Typing speed

    return () => clearInterval(intervalId);
  }, [text]);

  if (!text) return null;

  return (
    <motion.p
      key={text} // Re-triggers animation when text changes
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="font-mono text-lg md:text-xl text-transparent bg-clip-text 
      bg-gradient-to-r from-purple-300 to-gray-300 
      drop-shadow-[0_0_12px_rgba(147,51,234,0.35)] mt-2"
    >
      {displayedText}
      {/* Blinking cursor */}
      {displayedText.length < text.length && (
        <span className="animate-pulse text-purple-400">|</span>
      )}
    </motion.p>
  );
};

export default TypingText;