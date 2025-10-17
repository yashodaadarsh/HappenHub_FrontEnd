import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { generateResponse } from "../services/gemini.service";
import { FiMessageCircle, FiX } from "react-icons/fi";

const EventChatBot = ({ event }) => {
  const [messages, setMessages] = useState([
    { role: "system", content: event.description || "No description available." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const chatRef = useRef(null);

  // Close chat if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (chatRef.current && !chatRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const updatedMessages = [...messages, { role: "user", content: input }];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    const reply = await generateResponse(updatedMessages, event.description);
    setMessages([...updatedMessages, { role: "model", content: reply }]);
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.1 }}
        className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition-all"
      >
        <FiMessageCircle size={18} /> Ask AI
      </motion.button>

      {/* Chat Popup */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <motion.div
            ref={chatRef}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-richblack-800 text-white rounded-xl shadow-lg w-[400px] h-[500px] flex flex-col relative"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-richblack-700">
              <h3 className="text-lg font-semibold text-yellow-50">Chat with HappenBot 🤖</h3>
              <button onClick={() => setOpen(false)} className="text-gray-300 hover:text-white">
                <FiX size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-richblack-900">
              {messages
                .filter((m) => m.role !== "system")
                .map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-richblack-700 text-gray-100"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              {loading && (
                <div className="text-gray-400 text-sm animate-pulse">HappenBot is typing...</div>
              )}
            </div>

            {/* Input Box */}
            <div className="flex border-t border-richblack-700 p-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about this event..."
                className="flex-1 bg-transparent outline-none text-white text-sm px-2"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm font-semibold disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default EventChatBot;
