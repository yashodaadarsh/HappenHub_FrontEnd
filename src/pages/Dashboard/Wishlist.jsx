import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchWishlistEvents } from "../../redux/slices/wishlist.slice";
import EventCard from "../../components/EventCard";
import { HeartCrack } from "lucide-react";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlistEvents, loading, error } = useSelector((state) => state.wishlist);
  const { userDetails } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userDetails?.email) {
      dispatch(fetchWishlistEvents(userDetails.email));
    }
  }, [dispatch, userDetails]);

  if (loading) {
    return <div className="p-6 text-center text-gray-400">Loading your wishlist...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-pink-400">{error}</div>;
  }

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100">My Wishlist</h1>
        <p className="text-gray-400">Events you've saved for later.</p>
      </motion.div>

      {wishlistEvents.length === 0 ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16 flex flex-col items-center">
          <HeartCrack className="text-5xl text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500">Explore events and click the heart icon to save them here!</p>
        </motion.div>
      ) : (
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistEvents.map((event) => (
              <EventCard key={event.event_id} event={event} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Wishlist;