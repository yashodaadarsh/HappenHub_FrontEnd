import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MapPin, Calendar } from "lucide-react";
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlist.slice";
import toast from "react-hot-toast";

const EventCard = ({ event, index }) => {
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.07, type: "spring", stiffness: 200, damping: 25 }}
      onClick={handleViewDetails}
      className="relative w-full aspect-[4/5] max-h-[450px] rounded-2xl overflow-hidden cursor-pointer group shadow-2xl shadow-black/40"
    >
      {/* Background Image */}
      <motion.img
        layoutId={`event-image-${event.event_id}`}
        src={event.image_url || 'https://via.placeholder.com/400x500?text=HappenHub'}
        alt={event.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      
      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* Floating Glass Wishlist Button */}
      {isLoggedIn && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.7)" }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWishlistToggle}
          disabled={wishlistLoading}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10"
          aria-label="Toggle Wishlist"
        >
          <Heart 
            size={18} 
            className={`transition-all ${isWishlisted ? 'text-pink-500' : 'text-gray-300'}`}
            fill={isWishlisted ? 'currentColor' : 'none'} 
          />
        </motion.button>
      )}

      {/* Glass Status Badge */}
      <AnimatePresence>
        {(isLive || isStartingSoon) && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className={`absolute top-4 left-4 z-10 px-3 py-1.5 text-xs font-bold rounded-full border backdrop-blur-md
              ${isLive ? 'bg-green-500/20 text-green-300 border-green-400/30' : 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30'}`}
          >
            {isLive ? "Live Now" : "Starting Soon"}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content positioned at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <p className="text-sm font-semibold text-purple-300 uppercase tracking-wider">{event.type}</p>
        <h3 className="text-2xl font-bold mt-1 mb-2 line-clamp-2 leading-tight">{event.title}</h3>
        
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="overflow-hidden"
        >
            <div className="flex flex-col gap-2 text-sm text-gray-300 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span>{event.location || "Online"}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{new Date(event.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(event.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
            </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EventCard;