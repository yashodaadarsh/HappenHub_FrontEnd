import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { updateProfile } from "../../redux/slices/auth.slice";
import { Check, Edit, X } from "lucide-react";
import toast from "react-hot-toast";

const Profile = () => {
  const dispatch = useDispatch();
  const { userDetails, authLoading } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({ firstName: '', lastName: '', email: '', phone: '', bio: '' });
  const [interests, setInterests] = useState([]);
  const [preferences, setPreferences] = useState([]);

  const availableInterests = [ "Technology", "Software", "AI & ML", "Web Dev", "Design", "Startups", "Marketing", "Business", "Gaming", "Science", "Finance", "Health" ];
  const availablePreferences = [ "Hackathon", "Workshop", "Webinar", "Competition", "Internship", "Job Fair", "Networking", "Conference" ];

  const resetState = () => {
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
  };

  useEffect(resetState, [userDetails]);

  const handleInterestChange = (interest) => setInterests(prev => prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]);
  const handlePreferenceChange = (preference) => setPreferences(prev => prev.includes(preference) ? prev.filter(p => p !== preference) : [...prev, preference]);
  const handleProfileChange = (e) => setProfileData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = () => {
    const updatedData = { ...profileData, interests, preferences };
    dispatch(updateProfile(updatedData)).then((result) => {
        if(updateProfile.fulfilled.match(result)) {
            toast.success("Profile updated successfully!");
        }
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    resetState();
    setIsEditing(false);
  };

  const inputStyle = "w-full bg-[#2C2C44] px-4 py-3 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700 transition-all";
  const displayStyle = "w-full bg-[#2C2C44] px-4 py-3 rounded-lg text-gray-300 border border-gray-700 min-h-[52px]";
  const labelStyle = "block text-sm font-medium text-gray-400 mb-1";

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">My Profile</h1>
          <p className="text-gray-400">Manage your profile and event preferences.</p>
        </div>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-5 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors">
            <Edit size={16} /> Edit Profile
          </button>
        )}
      </div>

      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#2C2C44] border border-white/10 p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-purple-400 mb-6">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelStyle}>First Name</label>
              {isEditing ? <input name="firstName" value={profileData.firstName} onChange={handleProfileChange} className={inputStyle} /> : <p className={displayStyle}>{profileData.firstName}</p>}
            </div>
            <div>
              <label className={labelStyle}>Last Name</label>
              {isEditing ? <input name="lastName" value={profileData.lastName} onChange={handleProfileChange} className={inputStyle} /> : <p className={displayStyle}>{profileData.lastName}</p>}
            </div>
            <div>
              <label className={labelStyle}>Email</label>
              <p className={`${displayStyle} cursor-not-allowed bg-gray-800/50`}>{profileData.email}</p>
            </div>
            <div>
              <label className={labelStyle}>Phone</label>
              {isEditing ? <input name="phone" value={profileData.phone} onChange={handleProfileChange} className={inputStyle} /> : <p className={displayStyle}>{profileData.phone || 'Not provided'}</p>}
            </div>
            <div className="md:col-span-2">
              <label className={labelStyle}>Address / Bio</label>
              {isEditing ? <textarea name="bio" value={profileData.bio} onChange={handleProfileChange} rows={3} className={inputStyle} /> : <p className={`${displayStyle} min-h-[80px]`}>{profileData.bio || 'Not provided'}</p>}
            </div>
          </div>
        </motion.div>
        
        {isEditing && (
          <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#2C2C44] border border-white/10 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-purple-400 mb-4">Your Interests</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {availableInterests.map(item => <button key={item} onClick={() => handleInterestChange(item)} className={`relative flex items-center justify-center p-3 h-16 rounded-lg border font-semibold text-center transition-all ${interests.includes(item) ? 'bg-purple-600/30 border-purple-500 text-white' : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-purple-500'}`}>{item}{interests.includes(item) && <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500"><Check size={10} /></span>}</button>)}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#2C2C44] border border-white/10 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-purple-400 mb-4">Event Preferences</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {availablePreferences.map(item => <button key={item} onClick={() => handlePreferenceChange(item)} className={`relative flex items-center justify-center p-3 h-16 rounded-lg border font-semibold text-center transition-all ${preferences.includes(item) ? 'bg-purple-600/30 border-purple-500 text-white' : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-purple-500'}`}>{item}{preferences.includes(item) && <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500"><Check size={10} /></span>}</button>)}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end space-x-4 mt-6">
              <button onClick={handleCancel} className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-transparent text-gray-300 border border-gray-700 hover:bg-white/5">
                <X size={18} /> Cancel
              </button>
              <button onClick={handleSave} disabled={authLoading} className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-60">
                {authLoading ? 'Saving...' : <><Check size={18} /> Save Changes</>}
              </button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;