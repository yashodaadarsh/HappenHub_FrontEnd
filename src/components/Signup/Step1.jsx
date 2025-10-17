import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Step1 = ({ formData, onInputChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-center mb-6">Basic Information</h3>
      {/* First Name & Last Name */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col flex-1 gap-2">
          <label htmlFor="firstName" className="text-sm text-gray-200">
            First Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={onInputChange}
            className="w-full bg-transparent px-6 py-5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 border border-richblack-600 transition-all duration-300 transform hover:scale-[1.02]"
            required
          />
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <label htmlFor="lastName" className="text-sm text-gray-200">
            Last Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={onInputChange}
            className="w-full bg-transparent px-6 py-5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 border border-richblack-600 transition-all duration-300 transform hover:scale-[1.02]"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm text-gray-200">
          Email <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={onInputChange}
          className="w-full bg-transparent px-6 py-5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 border border-richblack-600 transition-all duration-300 transform hover:scale-[1.02]"
          required
        />
      </div>

      {/* Phone Number */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phoneNumber" className="text-sm text-gray-200">
          Phone Number
        </label>
        <input
          type="tel"
          name="phoneNumber"
          placeholder="+91 9876543210"
          value={formData.phoneNumber}
          onChange={onInputChange}
          className="w-full bg-transparent px-6 py-5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 border border-richblack-600 transition-all duration-300 transform hover:scale-[1.02]"
        />
      </div>

      {/* Address */}
      <div className="flex flex-col gap-2">
        <label htmlFor="address" className="text-sm text-gray-200">
          Address
        </label>
        <input
          type="text"
          name="address"
          placeholder="Your address"
          value={formData.address}
          onChange={onInputChange}
          className="w-full bg-transparent px-6 py-5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 border border-richblack-600 transition-all duration-300 transform hover:scale-[1.02]"
        />
      </div>

      {/* Password */}
      <div className="relative flex flex-col gap-2">
        <label htmlFor="password" className="text-sm text-gray-200">
          Password <span className="text-red-400">*</span>
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={onInputChange}
          className="w-full bg-transparent px-6 py-5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 border border-richblack-600 pr-14 transition-all duration-300 transform hover:scale-[1.02]"
          required
        />
        <span
          className="absolute text-4xl right-4 bottom-[16px] md:bottom-[14px] cursor-pointer text-gray-400"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>
      </div>

      {/* Confirm Password */}
      <div className="relative flex flex-col gap-2">
        <label htmlFor="confirmPassword" className="text-sm text-gray-200">
          Confirm Password <span className="text-red-400">*</span>
        </label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={onInputChange}
          className="w-full bg-transparent px-6 py-5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 border border-richblack-600 pr-14 transition-all duration-300 transform hover:scale-[1.02]"
          required
        />
        <span
          className="absolute text-4xl right-4 bottom-[16px] md:bottom-[14px] cursor-pointer text-gray-400"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>
      </div>
    </div>
  );
};

export default Step1;