import { useEffect, useState } from "react";
import { motion } from "framer-motion";
const TypingText = ({ text }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    console.log("text : ", text);

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
      className="font-mono text-base md:text-xl text-yellow-50 drop-shadow-lg mt-2"
    >
      {displayed ? displayed : ""}
      {displayed.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </motion.p>
  );
};

export default TypingText;
