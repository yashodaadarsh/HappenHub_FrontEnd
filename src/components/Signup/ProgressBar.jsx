import React from "react";
import { FaUser, FaBriefcase, FaHeart, FaCheck } from "react-icons/fa";

const ProgressBar = ({ currentStep, totalSteps }) => {
  const steps = [
    { icon: FaUser, label: "Details" },
    { icon: FaBriefcase, label: "Interests" },
    { icon: FaHeart, label: "Preferences" },
    { icon: FaCheck, label: "Review" },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-4">
        {steps.map((step, i) => {
          const IconComponent = step.icon;
          const isCompleted = i + 1 < currentStep;
          const isCurrent = i + 1 === currentStep;
          const isUpcoming = i + 1 > currentStep;

          return (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold transition-all duration-300 ${
                    isCompleted
                      ? "bg-green-600 text-white shadow-lg shadow-green-500/30"
                      : isCurrent
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                      : "bg-richblack-700 text-gray-400"
                  }`}
                >
                  <IconComponent />
                </div>
                <span className={`text-xs mt-2 transition-all duration-300 ${
                  isCompleted
                    ? "text-green-400 font-semibold"
                    : isCurrent
                    ? "text-blue-400 font-semibold"
                    : "text-gray-400"
                }`}>
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className="w-full bg-richblack-700 rounded-full h-1">
                    <div
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i + 1 < currentStep ? "bg-green-600" : "bg-blue-600"
                      }`}
                      style={{
                        width: i + 1 < currentStep ? "100%" : i + 1 === currentStep - 1 ? "50%" : "0%"
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;