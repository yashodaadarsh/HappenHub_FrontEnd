import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GET_EVENT_BY_ID } from "../api/apis";
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlist.slice";

const EventDetails = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { wishlistEventIds, loading: wishlistLoading } = useSelector((state) => state.wishlist);

  const [event, setEvent] = useState(location.state?.event || null);
  const [loading, setLoading] = useState(!event);
  const [error, setError] = useState(null);

  const isWishlisted = wishlistEventIds.includes(event?.event_id);

  useEffect(() => {
    // If event data is not passed via props, fetch it from API
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-richblack-900 text-white">
        <div className="text-xl">Loading event details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-richblack-900 text-white">
        <div className="text-xl text-pink-200">{error}</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-richblack-900 text-white">
        <div className="text-xl">Event not found</div>
      </div>
    );
  }

  const handleApply = () => {
    window.open(event.event_link, "_blank", "noopener,noreferrer");
  };

  const handleWishlistToggle = () => {
    if (!isLoggedIn || !user) {
      // Could show a login prompt here
      return;
    }

    if (isWishlisted) {
      dispatch(removeFromWishlist({ eventId: event.event_id, userEmail: user.email }));
    } else {
      dispatch(addToWishlist({ eventId: event.event_id, userEmail: user.email }));
    }
  };

  return (
    <div className="min-h-screen bg-richblack-900 text-white px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Event Name */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-200 via-blue-100 to-yellow-50">
          {event.title}
        </h1>

        {/* Event Image */}
        {event.image_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        )}

        {/* Complete Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-yellow-50 mb-4">AI Shortened Description</h2>
          <p className="text-richblack-100 text-lg leading-relaxed">
            {event.description}
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-yellow-50 mb-6">Timeline</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-500"></div>
            <div className="space-y-8">
              <div className="relative flex items-center">
                <div className="absolute left-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-richblack-900"></div>
                <div className="ml-16">
                  <h3 className="text-xl font-semibold text-blue-300">Start Date</h3>
                  <p className="text-richblack-200">
                    {new Date(event.start_date).toLocaleDateString("en-US", {
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
              <div className="relative flex items-center">
                <div className="absolute left-6 w-4 h-4 bg-green-500 rounded-full border-4 border-richblack-900"></div>
                <div className="ml-16">
                  <h3 className="text-xl font-semibold text-green-300">End Date</h3>
                  <p className="text-richblack-200">
                    {new Date(event.end_date).toLocaleDateString("en-US", {
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
        </motion.div>

        {/* Other Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-yellow-50 mb-6">Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-richblack-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Type</h3>
              <p className="text-richblack-100">{event.type}</p>
            </div>
            <div className="bg-richblack-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Location</h3>
              <p className="text-richblack-100">{event.location}</p>
            </div>
            <div className="bg-richblack-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Salary</h3>
              <p className="text-richblack-100">{event.salary}</p>
            </div>
            <div className="bg-richblack-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Event ID</h3>
              <p className="text-richblack-100">{event.event_id}</p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
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
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EventDetails;