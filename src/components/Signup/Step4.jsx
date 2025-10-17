import React from "react";

const Step4 = ({ formData }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-semibold text-center mb-6">Review Your Information</h3>

    <div className="bg-richblack-800 p-6 rounded-lg space-y-4">
      <h4 className="text-lg font-semibold text-blue-300">Basic Information</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <p><span className="text-gray-400">Name:</span> {formData.firstName} {formData.lastName}</p>
        <p><span className="text-gray-400">Email:</span> {formData.email}</p>
        <p><span className="text-gray-400">Phone:</span> {formData.phoneNumber || "Not provided"}</p>
        <p><span className="text-gray-400">Address:</span> {formData.address || "Not provided"}</p>
      </div>
    </div>

    <div className="bg-richblack-800 p-6 rounded-lg space-y-4">
      <h4 className="text-lg font-semibold text-green-300">Professional Interests</h4>
      <div className="flex flex-wrap gap-2">
        {formData.interests.length > 0 ? (
          formData.interests.map((interest) => (
            <span key={interest} className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
              {interest}
            </span>
          ))
        ) : (
          <p className="text-gray-400">No interests selected</p>
        )}
      </div>
    </div>

    <div className="bg-richblack-800 p-6 rounded-lg space-y-4">
      <h4 className="text-lg font-semibold text-purple-300">Event Preferences</h4>
      <div className="flex flex-wrap gap-2">
        {formData.preferences.length > 0 ? (
          formData.preferences.map((preference) => (
            <span key={preference} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
              {preference}
            </span>
          ))
        ) : (
          <p className="text-gray-400">No preferences selected</p>
        )}
      </div>
    </div>
  </div>
);

export default Step4;