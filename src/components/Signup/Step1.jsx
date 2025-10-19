import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Using Lucide for consistency

const Step1 = ({ formData, onInputChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Reusable input style
  const inputStyle = "w-full mt-1 bg-[#2C2C44] px-4 py-3 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700 transition-all";
  const labelStyle = "text-sm font-medium text-gray-400";
  const requiredMark = <span className="text-pink-400">*</span>;
  
  return (
    <div className="space-y-5 animate-fadeIn">
      {/* First Name & Last Name */}
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-1">
          <label htmlFor="firstName" className={labelStyle}>
            First Name {requiredMark}
          </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            placeholder="e.g., Jane"
            value={formData.firstName}
            onChange={onInputChange}
            className={inputStyle}
            required
          />
        </div>
        <div className="flex-1">
          <label htmlFor="lastName" className={labelStyle}>
            Last Name {requiredMark}
          </label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="e.g., Doe"
            value={formData.lastName}
            onChange={onInputChange}
            className={inputStyle}
            required
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelStyle}>
          Email Address {requiredMark}
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={onInputChange}
          className={inputStyle}
          required
        />
      </div>

      {/* Password */}
      <div className="relative">
        <label htmlFor="password" className={labelStyle}>
          Password {requiredMark}
        </label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={onInputChange}
          className={`${inputStyle} pr-10`}
          required
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[38px] cursor-pointer text-gray-500 hover:text-gray-300"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <label htmlFor="confirmPassword" className={labelStyle}>
          Confirm Password {requiredMark}
        </label>
        <input
          id="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={onInputChange}
          className={`${inputStyle} pr-10`}
          required
        />
        <span
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-[38px] cursor-pointer text-gray-500 hover:text-gray-300"
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </div>
    </div>
  );
};

export default Step1;