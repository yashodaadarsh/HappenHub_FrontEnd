import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchWishlistEvents, removeFromWishlist } from "../../redux/slices/wishlist.slice";
import EventCard from "../../components/EventCard";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlistEvents, loading, error } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchWishlistEvents(user.email));
    }
  }, [dispatch, user]);

  const handleRemoveFromWishlist = (eventId) => {
    if (user?.email) {
      dispatch(removeFromWishlist({ eventId, userEmail: user.email }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-xl text-white">Loading your wishlist...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-xl text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">My Wishlist</h1>
        <p className="text-gray-400">Events you've saved for later</p>
      </motion.div>

      {wishlistEvents.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="text-6xl text-gray-600 mb-4">💝</div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500">Start exploring events and add them to your wishlist!</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistEvents.map((event, index) => (
              <div key={event.event_id} className="relative">
                <EventCard event={event} index={index} />
                <button
                  onClick={() => handleRemoveFromWishlist(event.event_id)}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors"
                  title="Remove from wishlist"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Wishlist;