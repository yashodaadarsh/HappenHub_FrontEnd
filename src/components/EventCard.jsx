import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlist.slice";
import toast, { Toaster } from "react-hot-toast";

const EventCard = ({ event, index }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { wishlistEventIds, loading } = useSelector((state) => state.wishlist);

  const isWishlisted = wishlistEventIds.includes(event.event_id);

  const handleViewDetails = () => {
    navigate(`/events/${event.event_id}`, { state: { event } });
  };

  const handleWishlistToggle = async (e) => {
    e.stopPropagation(); // Prevent triggering the card click

    if (!isLoggedIn || !user) {
      toast.error("Please log in to add events to your wishlist!");
      return;
    }

    if (isWishlisted) {
      dispatch(removeFromWishlist({ eventId: event.event_id, userEmail: user.email }));
      toast.success("Removed from wishlist!");
    } else {
      dispatch(addToWishlist({ eventId: event.event_id, userEmail: user.email }));
      toast.success("Added to wishlist!");
    }
  };

  return (
    <motion.div
      key={event.event_id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-richblack-800 rounded-lg p-6 shadow-lg border border-richblack-700 hover:border-blue-400 transition-all hover:scale-105"
    >
      <Toaster position="top-right" />
      {event.image_url && (
        <div className="mb-4">
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-xl font-bold text-yellow-50 mb-2">
          {event.title}
        </h3>
        <p className="text-richblack-200 text-sm mb-2">
          {event.type} • {event.location}
        </p>
        <p className="text-caribbeangreen-200 font-semibold">
          {event.salary}
        </p>
      </div>

      <p className="text-richblack-100 text-sm mb-4 line-clamp-3">
        {event.description}
      </p>

      <div className="flex justify-between items-center text-sm text-richblack-300">
        <span>
          Start: {new Date(event.start_date).toLocaleDateString()}
        </span>
        <span>End: {new Date(event.end_date).toLocaleDateString()}</span>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleViewDetails}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
        >
          View Details
        </button>

        {isLoggedIn && (
          <button
            onClick={handleWishlistToggle}
            disabled={loading}
            className={`p-2 rounded-lg transition-all ${
              isWishlisted
                ? "text-red-500 hover:text-red-400"
                : "text-gray-400 hover:text-red-500"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isWishlisted ? <FaHeart size={20} className="text-red-500" /> : <FaRegHeart size={20} />}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default EventCard;