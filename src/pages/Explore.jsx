import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { fetchEvents, setSearchQuery, setFilterType, setCurrentPage, setSortBy } from "../redux/slices/explore.slice";
import ExploreEventCard from "../components/ExploreEventCard"; // <-- Import the new card
import { Search, Filter, ListOrdered, SearchX, ChevronLeft, ChevronRight } from "lucide-react";

const Explore = () => {
  const dispatch = useDispatch();
  const { events, loading, error, currentPage, searchQuery, filterType, sortBy, totalPages } = useSelector((state) => state.explore);

  useEffect(() => {
    // Only dispatch if not loading to prevent race conditions on fast changes
    if (!loading) {
      dispatch(fetchEvents({ page: currentPage, search: searchQuery, filterType, sortBy }));
    }
  }, [dispatch, currentPage, searchQuery, filterType, sortBy]);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
    dispatch(setCurrentPage(0));
  };

  const handleFilterChange = (e) => {
    dispatch(setFilterType(e.target.value));
    dispatch(setCurrentPage(0));
  };

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
    dispatch(setCurrentPage(0));
  };

  const handlePageChange = (page) => {
    if (page < 0 || page >= totalPages) return;
    dispatch(setCurrentPage(page));
  };

  if (loading && events.length === 0) {
    return <div className="min-h-screen flex items-center justify-center bg-[#1F1F2E] text-gray-300">Loading Events...</div>;
  }
  
  return (
    <div className="min-h-screen bg-[#1F1F2E] text-gray-200 px-4 sm:px-6 py-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-gray-100">
          Explore Events
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-center text-gray-400 mb-10 text-lg">
          Find your next opportunity. Search, filter, and sort through all available events.
        </motion.p>

        {/* --- Search and Filter Panel --- */}
        <motion.div layout className="bg-[#2C2C44] border border-white/10 rounded-xl p-4 mb-8 flex flex-wrap items-center justify-between gap-4 sticky top-20 z-20 backdrop-blur-sm">
          <div className="relative flex-grow min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input type="text" placeholder="Search by title, type, or location..." value={searchQuery} onChange={handleSearchChange} className="w-full bg-[#1F1F2E] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <select value={filterType} onChange={handleFilterChange} className="appearance-none w-full bg-[#1F1F2E] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="">All Types</option>
                    <option value="JOB">Job</option>
                    <option value="INTERNSHIP">Internship</option>
                    <option value="HACKATHON">Hackathon</option>
                    <option value="WORKSHOP">Workshop</option>
                </select>
            </div>
            <div className="relative">
                <ListOrdered className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <select value={sortBy} onChange={handleSortChange} className="appearance-none w-full bg-[#1F1F2E] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="">Sort By</option>
                    <option value="start_date">Start Date</option>
                    <option value="salary">Reward</option>
                </select>
            </div>
          </div>
        </motion.div>

        {/* --- Events List --- */}
        <div className="relative">
            <AnimatePresence>
                {loading && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-[#1F1F2E]/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
                        <div className="h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {events.length > 0 ? (
                <motion.div layout className="grid grid-cols-1 gap-6">
                    {events.map((event, index) => (
                        <ExploreEventCard key={event.event_id} event={event} index={index} />
                    ))}
                </motion.div>
            ) : !loading && (
                 <div className="text-center text-gray-500 mt-16 flex flex-col items-center">
                    <SearchX size={64} className="mb-4 text-gray-600" />
                    <p className="text-xl font-semibold text-gray-400">No Events Found</p>
                    <p className="mt-2">Try adjusting your search or filters.</p>
                </div>
            )}
        </div>

        {/* --- Pagination --- */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 space-x-2">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0} className="p-2 rounded-lg bg-[#2C2C44] border border-gray-700 disabled:opacity-50 hover:bg-white/5 transition-colors"><ChevronLeft /></button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => handlePageChange(i)} className={`px-4 py-2 rounded-lg font-semibold transition-colors ${currentPage === i ? 'bg-purple-600 text-white' : 'bg-[#2C2C44] border border-gray-700 hover:bg-white/5'}`}>{i + 1}</button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages - 1} className="p-2 rounded-lg bg-[#2C2C44] border border-gray-700 disabled:opacity-50 hover:bg-white/5 transition-colors"><ChevronRight /></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;