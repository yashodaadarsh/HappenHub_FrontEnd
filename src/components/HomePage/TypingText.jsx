import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TypingText = ({ text }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!text) return;
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed((prev) => prev + text[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [text]);

  if (!text) return null;

  return (
    <motion.p
      key={text}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="font-mono text-base md:text-xl text-transparent bg-clip-text 
      bg-gradient-to-r from-caribbeangreen-100 via-blue-100 to-blue-300 
      drop-shadow-[0_0_10px_rgba(17,138,178,0.25)] mt-2"
    >
      {displayed}
      {displayed.length < text.length && (
        <span className="animate-pulse text-caribbeangreen-100">|</span>
      )}
    </motion.p>
  );
};

export default TypingText;
