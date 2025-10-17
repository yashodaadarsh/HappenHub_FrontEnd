import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { updateProfile } from "../../redux/slices/auth.slice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, userDetails, authLoading } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [interests, setInterests] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: ''
  });

  const availableInterests = [
    "Technology", "Business", "Mathematics", "Science", "Film", "Sports",
    "Software Development", "Data Science", "Design", "Marketing", "Finance", "Healthcare"
  ];

  const availablePreferences = [
    "Internship", "Job", "Hackathon", "Workshop", "Webinar", "Conference",
    "Networking Event", "Career Fair", "Training Program", "Competition"
  ];

  useEffect(() => {
    // Load user preferences and profile data
    if (userDetails) {
      setInterests(userDetails.interests || []);
      setPreferences(userDetails.preferences || []);
      setProfileData({
        firstName: userDetails.firstName || '',
        lastName: userDetails.lastName || '',
        email: userDetails.email || '',
        phone: userDetails.phoneNumber || '',
        bio: userDetails.address || ''
      });
    }
  }, [userDetails]);

  const handleInterestChange = (interest) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handlePreferenceChange = (preference) => {
    setPreferences(prev =>
      prev.includes(preference)
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    const updateData = {
      ...profileData,
      interests,
      preferences
    };
    dispatch(updateProfile(updateData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data
    if (userDetails) {
      setProfileData({
        firstName: userDetails.firstName || '',
        lastName: userDetails.lastName || '',
        email: userDetails.email || '',
        phone: userDetails.phone || '',
        bio: userDetails.bio || ''
      });
      setInterests(userDetails.interests || []);
      setPreferences(userDetails.preferences || []);
    }
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
            <p className="text-gray-400">View and manage your profile information and preferences</p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>
      </motion.div>

      <div className="space-y-8">
        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-richblack-800 p-6 rounded-lg"
        >
          <h2 className="text-xl font-semibold text-blue-300 mb-4">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) => handleProfileChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 bg-richblack-700 border border-richblack-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-3 py-2 bg-richblack-700 border border-richblack-600 rounded-md text-white">{profileData.firstName || 'Not provided'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) => handleProfileChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 bg-richblack-700 border border-richblack-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-3 py-2 bg-richblack-700 border border-richblack-600 rounded-md text-white">{profileData.lastName || 'Not provided'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  className="w-full px-3 py-2 bg-richblack-700 border border-richblack-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-3 py-2 bg-richblack-700 border border-richblack-600 rounded-md text-white">{profileData.email || 'Not provided'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  className="w-full px-3 py-2 bg-richblack-700 border border-richblack-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-3 py-2 bg-richblack-700 border border-richblack-600 rounded-md text-white">{profileData.phone || 'Not provided'}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleProfileChange('bio', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-richblack-700 border border-richblack-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="px-3 py-2 bg-richblack-700 border border-richblack-600 rounded-md text-white min-h-[80px]">{profileData.bio || 'No bio provided'}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Professional Interests */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-richblack-800 p-6 rounded-lg"
          >
            <h2 className="text-xl font-semibold text-green-300 mb-4">Professional Interests</h2>
            <p className="text-gray-400 mb-6">Select all that interest you professionally</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {availableInterests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleInterestChange(interest)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    interests.includes(interest)
                      ? "border-green-500 bg-green-500/20 text-green-300"
                      : "border-richblack-600 bg-richblack-700 text-gray-300 hover:border-gray-500"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Event Preferences */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-richblack-800 p-6 rounded-lg"
          >
            <h2 className="text-xl font-semibold text-purple-300 mb-4">Event Preferences</h2>
            <p className="text-gray-400 mb-6">What types of events are you interested in?</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {availablePreferences.map((preference) => (
                <button
                  key={preference}
                  onClick={() => handlePreferenceChange(preference)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    preferences.includes(preference)
                      ? "border-purple-500 bg-purple-500/20 text-purple-300"
                      : "border-richblack-600 bg-richblack-700 text-gray-300 hover:border-gray-500"
                  }`}
                >
                  {preference}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Save/Cancel Buttons */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center space-x-4"
          >
            <button
              onClick={handleCancel}
              className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={authLoading}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
            >
              {authLoading ? 'Saving...' : 'Save Profile & Preferences'}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Profile;