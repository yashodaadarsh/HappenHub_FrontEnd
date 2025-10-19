import React from "react";
import { User, Sparkles, LayoutGrid } from "lucide-react"; // Icons for section headers

// A helper component for displaying each piece of information
const InfoRow = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-base font-medium text-gray-100">{value || "Not Provided"}</p>
  </div>
);

const Step4 = ({ formData }) => {
  return (
    <div className="animate-fadeIn">
      <div className="space-y-6 bg-[#2C2C44] p-6 rounded-lg border border-gray-700">
        
        {/* Section 1: Basic Information */}
        <div>
          <h4 className="flex items-center gap-2 text-lg font-semibold text-purple-400 mb-4">
            <User size={20} />
            Basic Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <InfoRow label="Full Name" value={`${formData.firstName} ${formData.lastName}`} />
            <InfoRow label="Email Address" value={formData.email} />
          </div>
        </div>

        <hr className="border-gray-700" />

        {/* Section 2: Professional Interests */}
        <div>
          <h4 className="flex items-center gap-2 text-lg font-semibold text-purple-400 mb-4">
            <Sparkles size={20} />
            Your Interests
          </h4>
          <div className="flex flex-wrap gap-2">
            {formData.interests?.length > 0 ? (
              formData.interests.map((interest) => (
                <span key={interest} className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                  {interest}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">No interests selected.</p>
            )}
          </div>
        </div>
        
        <hr className="border-gray-700" />

        {/* Section 3: Event Preferences */}
        <div>
          <h4 className="flex items-center gap-2 text-lg font-semibold text-purple-400 mb-4">
            <LayoutGrid size={20} />
            Event Preferences
          </h4>
          <div className="flex flex-wrap gap-2">
            {formData.preferences?.length > 0 ? (
              formData.preferences.map((preference) => (
                <span key={preference} className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                  {preference}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">No preferences selected.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;