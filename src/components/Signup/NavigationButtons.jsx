import React from "react";

const NavigationButtons = ({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
  onSubmit,
  loading,
  authLoading
}) => {
  return (
    <div className="flex justify-between mt-8">
      {currentStep > 1 && (
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-3 bg-richblack-700 hover:bg-richblack-600 text-white rounded-lg transition-colors"
        >
          Previous
        </button>
      )}

      {currentStep < totalSteps ? (
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors ml-auto"
        >
          Next
        </button>
      ) : (
        <form onSubmit={onSubmit} className="ml-auto">
          <button
            type="submit"
            disabled={loading || authLoading}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading || authLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      )}
    </div>
  );
};

export default NavigationButtons;