import React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateResponse } from "../services/gemini.service";
import { MessageCircle, X, Send } from "lucide-react"; // Consistent icons

const EventChatBot = ({ event }) => {
  const [messages, setMessages] = useState([
    { role: "model", content: "Hey! I'm HubBot. Ask me anything about this event!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const updatedMessages = [...messages, { role: "user", content: input }];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    try {
      const reply = await generateResponse(updatedMessages, event.description);
      setMessages([...updatedMessages, { role: "model", content: reply }]);
    } catch (error) {
       setMessages([...updatedMessages, { role: "model", content: "Sorry, I'm having a little trouble connecting right now. Please try again!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="fixed bottom-24 right-4 sm:right-8 z-50 w-[calc(100%-2rem)] max-w-sm h-[500px] 
                       bg-[#2C2C44]/80 backdrop-blur-lg rounded-2xl border border-white/10 
                       shadow-2xl shadow-purple-900/20 flex flex-col"
          >
            {/* Header */}
            <div className="flex-shrink-0 flex justify-between items-center px-4 py-3 border-b border-white/10">
              <h3 className="text-lg font-semibold text-purple-300">Chat with HubBot 🤖</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#1F1F2E]/50">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm shadow-md ${
                    msg.role === "user"
                      ? "bg-purple-600 text-white rounded-br-lg"
                      : "bg-gray-700 text-gray-200 rounded-bl-lg"
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {loading && <TypingIndicator />}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="flex-shrink-0 flex items-center border-t border-white/10 p-3 bg-[#2C2C44]/80">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent outline-none text-gray-200 text-sm px-2"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-purple-600 hover:bg-purple-700 p-2 rounded-full text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-4 sm:right-8 z-50 flex items-center justify-center w-16 h-16 bg-purple-600 text-white rounded-full shadow-2xl shadow-purple-600/40"
        aria-label="Toggle Chatbot"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? "close" : "chat"}
            initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </>
  );
};

// A more visually engaging typing indicator
const TypingIndicator = () => (
  <div className="flex justify-start">
    <div className="px-4 py-3 rounded-2xl bg-gray-700 text-gray-200 rounded-bl-lg shadow-md">
      <div className="flex gap-1 items-center">
        <span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce"></span>
      </div>
    </div>
  </div>
);

export default EventChatBot;