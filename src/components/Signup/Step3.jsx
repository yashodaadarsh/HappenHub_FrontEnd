import React from "react";

const Step3 = ({ formData, onPreferenceChange }) => {
  const preferences = [
    "Internship", "Job", "Hackathon", "Workshop", "Webinar", "Conference",
    "Networking Event", "Career Fair", "Training Program", "Competition"
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-center mb-6">Event Preferences</h3>
      <p className="text-gray-400 text-center mb-6">What types of events are you interested in?</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {preferences.map((preference) => (
          <button
            key={preference}
            type="button"
            onClick={() => onPreferenceChange(preference)}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              formData.preferences.includes(preference)
                ? "border-green-500 bg-green-500/20 text-green-300"
                : "border-richblack-600 bg-richblack-800 text-gray-300 hover:border-gray-500"
            }`}
          >
            {preference}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step3;