import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  fetchEvents,
  setSearchQuery,
  setFilterType,
  setCurrentPage,
  setSortBy,
} from "../redux/slices/explore.slice";
import EventCard from "../components/EventCard";

const Explore = () => {
  const dispatch = useDispatch();
  const { events, loading, error, currentPage, searchQuery, filterType, sortBy, totalPages } =
    useSelector((state) => state.explore);

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [localFilter, setLocalFilter] = useState(filterType);
  const [localSort, setLocalSort] = useState(sortBy);

  useEffect(() => {
    dispatch(
      fetchEvents({
        type: "explore",
        page: currentPage,
        search: searchQuery,
        filterType: filterType,
        sortBy: sortBy,
      })
    );
  }, [dispatch, currentPage, searchQuery, filterType, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-richblack-900 text-white">
        <div className="text-xl">Loading events...</div>
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

  const handleSearch = () => {
    dispatch(setSearchQuery(localSearch));
    dispatch(setCurrentPage(0));
  };

  const handleFilter = (type) => {
    setLocalFilter(type);
    dispatch(setFilterType(type));
    dispatch(setCurrentPage(0));
  };

  const handleSort = (sort) => {
    setLocalSort(sort);
    dispatch(setSortBy(sort));
    dispatch(setCurrentPage(0));
  };

  const handlePageChange = (page) => {
    if (page < 0) return;
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="min-h-screen bg-richblack-900 text-white px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-200 via-blue-100 to-yellow-50"
      >
        Explore All Events
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center text-richblack-100 mb-12 text-lg"
      >
        Browse through all available events. Sign up to get personalized
        recommendations!
      </motion.p>

      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-center">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search events..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="px-4 py-2 bg-richblack-800 border border-richblack-700 rounded-lg text-white placeholder-richblack-400 focus:outline-none focus:border-blue-400"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Search
            </button>
          </div>

          <div className="flex gap-2">
            <select
              value={localFilter}
              onChange={(e) => handleFilter(e.target.value)}
              className="px-4 py-2 bg-richblack-800 border border-richblack-700 rounded-lg text-white focus:outline-none focus:border-blue-400"
            >
              <option value="">All Types</option>
              <option value="job">Job</option>
              <option value="internship">Internship</option>
              <option value="hackathon">Hackathon</option>
              <option value="workshop">Workshop</option>
            </select>
            <select
              value={localSort}
              onChange={(e) => handleSort(e.target.value)}
              className="px-4 py-2 bg-richblack-800 border border-richblack-700 rounded-lg text-white focus:outline-none focus:border-blue-400"
            >
              <option value="">Sort By</option>
              <option value="date">Start Date</option>
              <option value="salary">Salary</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <EventCard key={event.event_id} event={event} index={index} />
          ))}
        </div>

        {/* Pagination */}
        {events.length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="px-4 py-2 bg-richblack-800 border border-richblack-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-richblack-700 transition-colors"
              >
                Previous
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => {
                const pageNumber = i;
                const isActive = pageNumber === currentPage;
                const isNearCurrent = Math.abs(pageNumber - currentPage) <= 2;
                const isFirstOrLast = pageNumber === 0 || pageNumber === totalPages - 1;

                // Show first page, last page, current page, and pages near current
                if (isFirstOrLast || isNearCurrent) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-richblack-800 border-richblack-700 text-white hover:bg-richblack-700"
                      }`}
                    >
                      {pageNumber + 1}
                    </button>
                  );
                }

                // Show ellipsis for gaps
                if (pageNumber === currentPage - 3 || pageNumber === currentPage + 3) {
                  return (
                    <span key={pageNumber} className="px-2 py-2 text-richblack-400">
                      ...
                    </span>
                  );
                }

                return null;
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="px-4 py-2 bg-richblack-800 border border-richblack-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-richblack-700 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* No Events */}
        {events.length === 0 && (
          <div className="text-center text-richblack-300 mt-12">
            <p className="text-xl">No events found at the moment.</p>
            <p className="mt-2">Check back later for new opportunities!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
