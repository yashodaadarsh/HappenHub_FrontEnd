import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Heart, X, MessageCircle, Send, Calendar, MapPin, Award, Building } from "lucide-react";
import { GET_EVENT_BY_ID } from "../api/apis";
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlist.slice";
import { generateResponse } from "../services/gemini.service";
import toast from "react-hot-toast";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

const EventDetails = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoggedIn, userDetails } = useSelector((state) => state.auth);
  const { wishlistEventIds, loading: wishlistLoading } = useSelector((state) => state.wishlist);

  const [event, setEvent] = useState(location.state?.event || null);
  const [loading, setLoading] = useState(!event);
  const [error, setError] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const [messages, setMessages] = useState([{ role: "model", content: "Hey! I'm HubBot. Ask me anything about this event!" }]);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const chatEndRef = useRef(null);

  const isWishlisted = wishlistEventIds.includes(event?.event_id);

  useEffect(() => {
    if (!event) {
      const fetchEventDetails = async () => {
        try {
          const { data } = await axios.get(GET_EVENT_BY_ID(eventId));
          setEvent(data);
        } catch (err) {
          setError("Oops! Failed to load event details. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
      fetchEventDetails();
    }
  }, [eventId, event]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, botTyping]);

  const handleApply = () => window.open(event.event_link, "_blank", "noopener,noreferrer");

  const handleWishlistToggle = () => {
    if (!isLoggedIn || !userDetails) {
      toast.error("Please log in to add events to your wishlist.");
      return;
    }
    const payload = { eventId: event.event_id, userEmail: userDetails.email };
    if (isWishlisted) {
      dispatch(removeFromWishlist(payload));
    } else {
      dispatch(addToWishlist(payload));
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setBotTyping(true);
    try {
      const reply = await generateResponse(newMessages, event);
      setMessages([...newMessages, { role: "model", content: reply }]);
    } catch (error) {
      setMessages([...newMessages, { role: "model", content: "Sorry, I'm having trouble connecting right now. Please try again in a moment." }]);
    } finally {
      setBotTyping(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#1F1F2E] text-gray-300">Loading Event...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-[#1F1F2E] text-pink-400">{error}</div>;
  if (!event) return <div className="min-h-screen flex items-center justify-center bg-[#1F1F2E] text-gray-300">Event Not Found</div>;

  const formatDate = (dateString) => new Date(dateString).toLocaleString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-[#1F1F2E] text-gray-200 p-4 sm:p-6 lg:p-8 font-sans">
      {/* Scrollable Event Content */}
      <div
        className={`max-w-7xl mx-auto transition-all duration-500 ease-in-out ${
          showChat ? 'lg:mr-[420px]' : 'mr-0'
        }`}
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-6">
          <motion.div variants={itemVariants} className="bg-[#2C2C44] border border-white/10 rounded-xl shadow-2xl shadow-purple-900/10 p-6 sm:p-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-6 text-gray-100">{event.title}</h1>
            {event.image_url && <motion.img layoutId={`event-image-${eventId}`} src={event.image_url} alt={event.title} className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg mb-6" />}
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-8">
              <InfoCard icon={Calendar} label="Type" value={event.type || 'N/A'} />
              <InfoCard icon={MapPin} label="Location" value={event.location || 'Online'} />
              <InfoCard icon={Award} label="Reward" value={event.salary || 'N/A'} />
              <InfoCard icon={Building} label="Organizer" value={event.organizer || 'N/A'} />
            </div>

            <div className="flex flex-wrap gap-4 justify-center items-center">
              <button onClick={handleApply} className="flex-grow sm:flex-grow-0 px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors transform hover:scale-105 shadow-lg shadow-purple-600/30">Apply Now</button>
              {isLoggedIn && <button onClick={handleWishlistToggle} disabled={wishlistLoading} className={`flex items-center gap-2 px-5 py-3 border-2 rounded-lg font-semibold transition-all transform hover:scale-105 ${isWishlisted ? 'border-pink-500 text-pink-400 bg-pink-500/10' : 'border-gray-600 text-gray-400 hover:border-pink-500 hover:text-pink-400'} ${wishlistLoading && 'opacity-50'}`}>
                  <Heart fill={isWishlisted ? 'currentColor' : 'none'} size={18} /> {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </button>}
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-[#2C2C44] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">Event Overview</h2>
            <p className="text-gray-300 leading-relaxed">{event.description || "No description available."}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-[#2C2C44] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6">Timeline</h2>
            <div className="relative border-l-2 border-purple-500/30 ml-3 pl-8 space-y-10">
              <TimelineItem date={formatDate(event.start_date)} title="Start Date" isStart />
              <TimelineItem date={formatDate(event.end_date)} title="End Date" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* FIXED CHAT PANEL */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#2C2C44] shadow-2xl flex flex-col overflow-hidden border-l border-white/10 z-50"
          >
            <div className="flex justify-between items-center px-4 py-3 border-b border-white/10 flex-shrink-0">
              <h3 className="text-lg font-semibold text-purple-300">Chat with HubBot 🤖</h3>
              <button onClick={() => setShowChat(false)} className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#1F1F2E]">
              {messages.map((msg, i) => <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm shadow-md ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-br-lg' : 'bg-gray-700 text-gray-200 rounded-bl-lg'}`}>{msg.content}</div>
              </div>)}
              {botTyping && <div className="flex justify-start"><div className="px-4 py-2 rounded-2xl bg-gray-700 text-gray-200 rounded-bl-lg shadow-md"><div className="flex gap-1 items-center"><span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span><span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span><span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce"></span></div></div></div>}
              <div ref={chatEndRef} />
            </div>
            <div className="flex items-center border-t border-white/10 p-3 bg-[#2C2C44] flex-shrink-0">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask anything..." className="flex-1 bg-transparent outline-none text-gray-200 text-sm px-2" />
              <button onClick={handleSend} disabled={botTyping || !input.trim()} className="bg-purple-600 hover:bg-purple-700 p-2 rounded-full text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><Send size={18} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING ACTION BUTTON FOR CHAT */}
      <AnimatePresence>
        {!showChat && (
          <motion.button onClick={() => setShowChat(true)} initial={{ scale: 0, y: 100 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0, y: 100 }} whileHover={{ scale: 1.1 }} className="fixed bottom-8 right-8 z-40 flex items-center gap-2 bg-purple-600 text-white font-semibold px-5 py-3 rounded-full shadow-2xl shadow-purple-600/40">
            <MessageCircle size={20} /> Ask HubBot
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper components for cleaner JSX
const InfoCard = ({ icon: Icon, label, value }) => (
  <div className="bg-[#1F1F2E]/50 rounded-lg p-3">
    <Icon className="mx-auto text-purple-400 mb-2" size={24} />
    <h3 className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{label}</h3>
    <p className="text-sm text-gray-200 font-medium truncate">{value}</p>
  </div>
);

const TimelineItem = ({ date, title, isStart }) => (
  <div className="relative">
    <div className={`absolute -left-[39px] top-1 w-5 h-5 rounded-full shadow-md ${isStart ? 'bg-purple-500 shadow-purple-500/40' : 'bg-gray-500'}`}></div>
    <h3 className={`text-lg font-semibold ${isStart ? 'text-purple-300' : 'text-gray-300'}`}>{title}</h3>
    <p className="text-gray-400 mt-1 text-sm">{date}</p>
  </div>
);

export default EventDetails;