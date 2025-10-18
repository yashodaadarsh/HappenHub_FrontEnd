import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiX, FiMessageCircle } from "react-icons/fi";
import { GET_EVENT_BY_ID } from "../api/apis";
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlist.slice";
import { generateResponse } from "../services/gemini.service";

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
        } catch {
          setError("Failed to load event details");
        } finally {
          setLoading(false);
        }
      };
      fetchEventDetails();
    } else setLoading(false);
  }, [eventId, event]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-richblack-900 text-white">
        Loading event details...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-richblack-900 text-white">
        {error}
      </div>
    );

  if (!event)
    return (
      <div className="min-h-screen flex items-center justify-center bg-richblack-900 text-white">
        Event not found
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
    const reply = await generateResponse(newMessages, event);
    setMessages([...newMessages, { role: "model", content: reply }]);
    setBotTyping(false);
  };

  return (
    <div className="min-h-screen bg-richblack-900 text-white p-8 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto grid gap-6 transition-all duration-500"
        animate={{
          gridTemplateColumns: showChat ? "60% 40%" : "100% 0%",
        }}
        style={{
          display: "grid",
          gridTemplateColumns: showChat ? "60% 40%" : "100% 0%",
        }}
      >
        {/* LEFT SIDE: EVENT DETAILS */}
        <motion.div
          layout
          className="bg-richblack-800 rounded-xl shadow-xl p-8 border border-richblack-700"
          animate={{ scale: showChat ? 0.97 : 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-200 via-blue-100 to-yellow-50">
            {event.title}
          </h1>

          {event.image_url && (
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              src={event.image_url}
              alt={event.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg mb-10"
            />
          )}

          {/* Description */}
          <h2 className="text-2xl font-semibold text-yellow-50 mb-3">Event Overview</h2>
          <p className="text-richblack-100 text-lg leading-relaxed mb-8">
            {event.description || "No description available."}
          </p>

          {/* Event Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <div className="bg-richblack-900 rounded-lg p-5 border border-richblack-700">
              <h3 className="text-blue-300 font-semibold mb-1">Event Type</h3>
              <p className="text-gray-300">{event.type || "N/A"}</p>
            </div>
            <div className="bg-richblack-900 rounded-lg p-5 border border-richblack-700">
              <h3 className="text-blue-300 font-semibold mb-1">Location</h3>
              <p className="text-gray-300">{event.location || "Online"}</p>
            </div>
            <div className="bg-richblack-900 rounded-lg p-5 border border-richblack-700">
              <h3 className="text-blue-300 font-semibold mb-1">Salary / Reward</h3>
              <p className="text-gray-300">{event.salary || "Not disclosed"}</p>
            </div>
            <div className="bg-richblack-900 rounded-lg p-5 border border-richblack-700">
              <h3 className="text-blue-300 font-semibold mb-1">Organizer</h3>
              <p className="text-gray-300">{event.organizer || "Not specified"}</p>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="mt-10 mb-10">
            <h2 className="text-2xl font-bold text-yellow-50 mb-6">Timeline</h2>
            <div className="relative ml-6">
              <div className="absolute left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-green-500 rounded-full"></div>
              <div className="space-y-10 pl-8">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-blue-500 rounded-full shadow-md"></div>
                    <h3 className="text-xl font-semibold text-blue-300">Start Date</h3>
                  </div>
                  <p className="text-gray-300 mt-2">
                    {new Date(event.start_date).toLocaleString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full shadow-md"></div>
                    <h3 className="text-xl font-semibold text-green-300">End Date</h3>
                  </div>
                  <p className="text-gray-300 mt-2">
                    {new Date(event.end_date).toLocaleString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <button
              onClick={handleApply}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Apply Now
            </button>
            {isLoggedIn && (
              <button
                onClick={handleWishlistToggle}
                disabled={wishlistLoading}
                className={`flex items-center gap-2 px-6 py-4 border-2 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                  isWishlisted
                    ? "border-red-500 text-red-500 bg-red-500/10 hover:bg-red-500/20"
                    : "border-gray-500 text-gray-300 hover:border-red-500 hover:text-red-500"
                } ${wishlistLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isWishlisted ? <FaHeart /> : <FaRegHeart />}
                {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            )}
            {!showChat && (
              <motion.button
                onClick={() => setShowChat(true)}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-5 py-3 rounded-full shadow-md hover:bg-blue-700 transition-all"
              >
                <FiMessageCircle /> Ask AI
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* RIGHT SIDE: CHAT PANEL */}
        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 200, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-richblack-800 rounded-xl shadow-xl flex flex-col overflow-hidden border border-richblack-700"
            >
              <div className="flex justify-between items-center px-4 py-3 border-b border-richblack-700">
                <h3 className="text-lg font-semibold text-yellow-50">Chat with HappenBot 🤖</h3>
                <button onClick={() => setShowChat(false)} className="text-gray-300 hover:text-white">
                  <FiX size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-richblack-900">
                {messages.map((msg, i) => (
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
                {botTyping && (
                  <div className="text-gray-400 text-sm animate-pulse">HappenBot is typing...</div>
                )}
              </div>

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
