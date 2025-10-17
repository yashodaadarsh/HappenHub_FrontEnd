import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../redux/slices/auth.slice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authLoading, error, isLoggedIn } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  React.useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(result)) {
      navigate("/dashboard");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div className="w-full mx-auto min-h-screen bg-richblack-900 text-white py-12 px-4 md:px-16">
      {/* Unified Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white animate-fadeIn">
          Welcome Back!
        </h2>
        <p className="text-gray-400 text-sm mt-2 animate-fadeIn delay-200">
          Access your dashboard seamlessly.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-12 md:gap-16 w-full">
        {/* Left Side: Form */}
        <div className="flex-1 flex flex-col justify-center items-center">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-xl flex flex-col gap-6" // increased max-width
          >
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm text-gray-200">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                onChange={handleInputChange}
                value={formData.email}
                className="w-full bg-transparent px-6 py-5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 border border-richblack-600 transition-all duration-300 transform hover:scale-[1.02]"
                required
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
                onChange={handleInputChange}
                value={formData.password}
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-5 rounded-lg font-semibold text-richblack-900 transition-all duration-300 transform hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(to right, #fffad1, #fff6c2)",
              }}
            >
              {authLoading ? "Logging In..." : "Log In"}
            </button>

            {error && (
              <div className="text-red-400 text-sm text-center mt-2">
                {error}
              </div>
            )}

            {/* OR Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-600" />
              <span className="mx-3 text-gray-400 text-sm">OR</span>
              <hr className="flex-grow border-gray-600" />
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-5 rounded-lg border border-gray-600 font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:bg-gradient-to-r hover:from-gray-300 hover:to-yellow-200 hover:text-richblack-900 cursor-pointer"
            >
              <FcGoogle size={26} />
              <span>Log In with Google</span>
            </button>
          </form>
        </div>

        {/* Right Side: Image */}
        <div className="flex-1 hidden md:flex flex-col justify-center items-center">
          <div className="w-full max-w-xl h-96 bg-gray-700 rounded-xl flex items-center justify-center text-gray-200 font-semibold animate-fadeIn">
            Image Placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
