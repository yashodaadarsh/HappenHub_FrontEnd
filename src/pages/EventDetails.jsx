import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { GET_EVENT_BY_ID } from "../api/apis";
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlist.slice";
import { generateResponse } from "../services/gemini.service";
import { FiMessageCircle } from "react-icons/fi";

const EventDetails = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { wishlistEventIds, loading: wishlistLoading } = useSelector((state) => state.wishlist);

  const [event, setEvent] = useState(location.state?.event || null);
  const [loading, setLoading] = useState(!event);
  const [error, setError] = useState(null);
  const [showChat, setShowChat] = useState(false);

  // Chat state
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);

  const isWishlisted = wishlistEventIds.includes(event?.event_id);

  useEffect(() => {
    if (!event) {
      const fetchEventDetails = async () => {
        try {
          const response = await axios.get(GET_EVENT_BY_ID(eventId));
          setEvent(response.data);
        } catch (err) {
          setError("Failed to load event details");
        } finally {
          setLoading(false);
        }
      };
      fetchEventDetails();
    } else {
      setLoading(false);
    }
  }, [eventId, event]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-xl">Loading event details...</div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-xl text-pink-200">{error}</div>
      </div>
    );

  if (!event)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-xl">Event not found</div>
      </div>
    );

  const handleApply = () => window.open(event.event_link, "_blank", "noopener,noreferrer");

  const handleWishlistToggle = () => {
    if (!isLoggedIn || !user) return;
    if (isWishlisted)
      dispatch(removeFromWishlist({ eventId: event.event_id, userEmail: user.email }));
    else dispatch(addToWishlist({ eventId: event.event_id, userEmail: user.email }));
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setBotTyping(true);
    const reply = await generateResponse(newMessages, event.description);
    setMessages([...newMessages, { role: "model", content: reply }]);
    setBotTyping(false);
  };

  return (
    <div className="min-h-screen bg-richblack-900 text-white px-6 py-12 overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto flex transition-all duration-500"
        animate={{
          gridTemplateColumns: showChat ? "60% 40%" : "100% 0%",
        }}
        style={{
          display: "grid",
          gridTemplateColumns: showChat ? "60% 40%" : "100% 0%",
          gap: "1rem",
        }}
      >
        {/* Left: Event Info */}
        <motion.div
          layout
          animate={{ scale: showChat ? 0.95 : 1, opacity: showChat ? 0.9 : 1 }}
          transition={{ duration: 0.3 }}
          className="bg-richblack-800 p-8 rounded-xl shadow-lg"
        >
          {/* Event Name */}
          <h1 className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-200 via-blue-100 to-yellow-50">
            {event.title}
          </h1>

          {/* Event Image */}
          {event.image_url && (
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-80 object-cover rounded-lg shadow-lg mb-6"
            />
          )}

          {/* Description */}
          <p className="text-richblack-100 text-lg leading-relaxed mb-6">
            {event.description}
          </p>

          {/* Ask AI Button */}
          {!showChat && (
            <motion.button
              onClick={() => setShowChat(true)}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-5 py-2 rounded-full shadow-md hover:bg-blue-700 transition-all ml-auto"
            >
              <FiMessageCircle size={18} /> Ask AI
            </motion.button>
          )}

          {/* Timeline */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-yellow-50 mb-4">Timeline</h2>
            <p className="text-blue-300 font-semibold">
              Start:{" "}
              {new Date(event.start_date).toLocaleString("en-US", {
                dateStyle: "long",
                timeStyle: "short",
              })}
            </p>
            <p className="text-green-300 font-semibold">
              End:{" "}
              {new Date(event.end_date).toLocaleString("en-US", {
                dateStyle: "long",
                timeStyle: "short",
              })}
            </p>
          </div>
        </motion.div>

        {/* Right: Chat Panel */}
        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 200, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-richblack-800 rounded-xl shadow-xl flex flex-col overflow-hidden"
            >
              {/* Chat Header */}
              <div className="flex justify-between items-center px-4 py-3 border-b border-richblack-700">
                <h3 className="text-lg font-semibold text-yellow-50">
                  Chat with HappenBot 🤖
                </h3>
                <button
                  onClick={() => setShowChat(false)}
                  className="text-gray-300 hover:text-white"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-richblack-900">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
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
                {botTyping && (
                  <div className="text-gray-400 text-sm animate-pulse">
                    HappenBot is typing...
                  </div>
                )}
              </div>

              {/* Chat Input */}
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
                  disabled={botTyping}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm font-semibold disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default EventDetails;
