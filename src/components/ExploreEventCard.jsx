import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MapPin, Calendar, Award, ArrowRight, Building } from "lucide-react";
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlist.slice";
import toast from "react-hot-toast";

const ExploreEventCard = ({ event, index }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, userDetails } = useSelector((state) => state.auth);
  const { wishlistEventIds, loading: wishlistLoading } = useSelector((state) => state.wishlist);

  const isWishlisted = wishlistEventIds?.includes(event.event_id);

  // --- Date Logic for Status Badges ---
  const now = new Date();
  const startDate = new Date(event.start_date);
  const isLive = now >= startDate && now <= new Date(event.end_date);
  const isStartingSoon = !isLive && startDate > now && startDate <= new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

  const handleViewDetails = () => {
    navigate(`/events/${event.event_id}`, { state: { event } });
  };

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    if (!isLoggedIn) return toast.error("Please log in to use the wishlist.");
    if (!userDetails?.email) return toast.error("Could not verify user.");

    const payload = { eventId: event.event_id, userEmail: userDetails.email };
    try {
      if (isWishlisted) {
        await dispatch(removeFromWishlist(payload)).unwrap();
      } else {
        await dispatch(addToWishlist(payload)).unwrap();
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ delay: index * 0.07, type: "spring", stiffness: 200, damping: 25 }}
      onClick={handleViewDetails}
      className="relative flex flex-col md:flex-row bg-[#2C2C44] rounded-xl border border-white/10 shadow-lg cursor-pointer
                 overflow-hidden transition-all duration-300 group hover:border-purple-500 hover:shadow-xl hover:shadow-purple-900/20 hover:-translate-y-1"
    >
      {/* --- Status Badge --- */}
      <AnimatePresence>
        {(isLive || isStartingSoon) && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className={`absolute top-4 left-4 z-10 px-2.5 py-1 text-xs font-bold rounded-full border backdrop-blur-sm
              ${isLive ? 'bg-green-500/20 text-green-300 border-green-400/30' : 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30'}`}
          >
            {isLive ? "Live Now" : "Starting Soon"}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Section */}
      <div className="w-full md:w-52 h-48 md:h-auto flex-shrink-0 overflow-hidden">
        <img
          src={event.image_url || 'https://via.placeholder.com/200x250?text=HappenHub'}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Main Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-4">
            <div>
                <p className="text-sm font-semibold text-purple-400 uppercase tracking-wider">{event.type}</p>
                <h3 className="text-xl font-bold text-gray-100 mt-1 line-clamp-1">{event.title}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <Building size={12} />
                    <span>{event.organizer || "Unknown Organizer"}</span>
                </div>
            </div>
            {isLoggedIn && (
                <button
                onClick={handleWishlistToggle}
                disabled={wishlistLoading}
                className="p-2 flex-shrink-0 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Toggle Wishlist"
                >
                <Heart 
                    size={20} 
                    className={`transition-all ${isWishlisted ? 'text-pink-500' : 'text-gray-500 hover:text-pink-400'}`}
                    fill={isWishlisted ? 'currentColor' : 'none'} 
                />
                </button>
            )}
        </div>
        
        {/* --- Description --- */}
        <p className="flex-grow my-4 text-sm text-gray-400 line-clamp-2">
            {event.description}
        </p>

        {/* --- Footer Info --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-sm text-gray-500 border-t border-white/10 pt-3 mt-auto">
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-400">
                    <MapPin size={14} />
                    <span>{event.location || "Online"}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                    <Award size={14} />
                    <span>{event.salary || "Not Disclosed"}</span>
                </div>
            </div>
            <div className="flex flex-col sm:items-end w-full sm:w-auto">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Calendar size={14} />
                    <span>Starts: {new Date(event.start_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400 font-semibold group-hover:gap-3 transition-all">
                    View Details <ArrowRight size={16} />
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExploreEventCard;