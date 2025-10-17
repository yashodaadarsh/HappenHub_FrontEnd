import React from "react";
import { FaUser, FaBriefcase, FaHeart, FaCheck } from "react-icons/fa";

const RightPanel = ({ currentStep }) => {
  return (
    <div className="flex-1 hidden md:flex flex-col justify-center items-center">
      {currentStep === 1 && (
        <div className="w-full max-w-xl h-96 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl flex items-center justify-center text-gray-200 font-semibold animate-fadeIn border border-blue-500/20">
          <div className="text-center">
            <FaUser className="text-6xl text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Welcome to HappenHub!</h3>
            <p className="text-gray-400">Let's get you started with your account</p>
          </div>
        </div>
      )}
      {currentStep === 2 && (
        <div className="w-full max-w-xl h-96 bg-gradient-to-br from-green-900/20 to-teal-900/20 rounded-xl flex items-center justify-center text-gray-200 font-semibold animate-fadeIn border border-green-500/20">
          <div className="text-center">
            <FaBriefcase className="text-6xl text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Tell us about yourself</h3>
            <p className="text-gray-400">Select your professional interests</p>
          </div>
        </div>
      )}
      {currentStep === 3 && (
        <div className="w-full max-w-xl h-96 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl flex items-center justify-center text-gray-200 font-semibold animate-fadeIn border border-purple-500/20">
          <div className="text-center">
            <FaHeart className="text-6xl text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">What interests you?</h3>
            <p className="text-gray-400">Choose the events you want to explore</p>
          </div>
        </div>
      )}
      {currentStep === 4 && (
        <div className="w-full max-w-xl h-96 bg-gradient-to-br from-yellow-900/20 to-orange-900/20 rounded-xl flex items-center justify-center text-gray-200 font-semibold animate-fadeIn border border-yellow-500/20">
          <div className="text-center">
            <FaCheck className="text-6xl text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Almost there!</h3>
            <p className="text-gray-400">Review your information and create your account</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightPanel;