import React from "react";

const Step2 = ({ formData, onInterestChange }) => {
  const interests = [
    "Technology", "Business", "Mathematics", "Science", "Film", "Sports",
    "Software Development", "Data Science", "Design", "Marketing", "Finance", "Healthcare"
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-center mb-6">Professional Interests</h3>
      <p className="text-gray-400 text-center mb-6">Select all that interest you professionally</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {interests.map((interest) => (
          <button
            key={interest}
            type="button"
            onClick={() => onInterestChange(interest)}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              formData.interests.includes(interest)
                ? "border-blue-500 bg-blue-500/20 text-blue-300"
                : "border-richblack-600 bg-richblack-800 text-gray-300 hover:border-gray-500"
            }`}
          >
            {interest}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step2;