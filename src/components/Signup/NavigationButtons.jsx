import React from "react";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

const NavigationButtons = ({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
  onSubmit,
  loading,
}) => {
  // Define consistent button styles for reusability
  const primaryButtonStyle = `
    flex items-center gap-2 px-6 py-3 rounded-lg font-semibold 
    bg-purple-600 text-white hover:bg-purple-700 
    transition-all duration-300 shadow-lg shadow-purple-600/30 
    disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-105
  `;
  
  const secondaryButtonStyle = `
    flex items-center gap-2 px-6 py-3 rounded-lg font-semibold 
    bg-transparent text-gray-300 border border-gray-700 
    hover:bg-white/5 hover:border-gray-500 transition-colors duration-300
  `;

  return (
    <div className="flex items-center justify-between mt-8">
      {/* Previous Button */}
      {/* This div acts as a placeholder to maintain alignment even when the button is hidden */}
      <div>
        {currentStep > 1 && (
          <button
            type="button"
            onClick={onPrev}
            className={secondaryButtonStyle}
          >
            <ChevronLeft size={18} />
            Previous
          </button>
        )}
      </div>

      {/* Next or Submit Button */}
      <div>
        {currentStep < totalSteps ? (
          // "Next" button for intermediate steps
          <button
            type="button"
            onClick={onNext}
            className={primaryButtonStyle}
          >
            Next
            <ChevronRight size={18} />
          </button>
        ) : (
          // "Create Account" button for the final step
          <button
            type="button" // Use type="button" and handle submit via onClick
            onClick={onSubmit}
            disabled={loading}
            className={primaryButtonStyle}
          >
            {loading ? "Creating Account..." : "Create Account"}
            {!loading && <CheckCircle size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default NavigationButtons;