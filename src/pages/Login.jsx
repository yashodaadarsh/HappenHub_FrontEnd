import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react"; // Using Lucide for consistency
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError, fetchProfile } from "../redux/slices/auth.slice"; // Assuming this path is correct
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authLoading, error, isLoggedIn } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    // Clear any previous errors when the component unmounts
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
      toast.success("Login successful! Welcome back.");
      dispatch(fetchProfile());
    }
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log("Google login clicked");
    toast.error("Google login is not implemented yet.");
  };

  return (
    <div className="w-full min-h-screen bg-[#1F1F2E] text-gray-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Toaster position="top-right" />
      <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left Side: Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="text-left mb-8">
            <h2 className="text-4xl font-extrabold text-gray-100">
              Welcome Back!
            </h2>
            <p className="text-gray-400 mt-2">
              Log in to discover what's happening next.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-400">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                onChange={handleInputChange}
                value={formData.email}
                className="w-full mt-2 bg-[#2C2C44] px-4 py-3 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700 transition-all"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-400"
                >
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-purple-400 hover:underline">
                    Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                onChange={handleInputChange}
                value={formData.password}
                className="w-full mt-2 bg-[#2C2C44] px-4 py-3 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700 pr-10 transition-all"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[46px] cursor-pointer text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            
            {error && (
              <div className="text-pink-400 text-sm text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 mt-2 rounded-lg font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300 shadow-lg shadow-purple-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {authLoading ? "Logging In..." : "Log In"}
            </button>

            {/* OR Divider */}
            <div className="flex items-center my-2">
              <hr className="flex-grow border-gray-700" />
              <span className="mx-4 text-gray-500 text-sm">OR</span>
              <hr className="flex-grow border-gray-700" />
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-gray-700 font-semibold text-gray-300 hover:bg-white/5 transition-colors duration-300"
            >
              <FcGoogle size={22} />
              <span>Continue with Google</span>
            </button>
          </form>
        </div>

        {/* Right Side: Image/Graphic */}
        <div className="hidden md:flex justify-center items-center">
          <div className="w-full max-w-md h-[450px] bg-[#2C2C44] rounded-2xl border border-white/10 flex items-center justify-center text-gray-500 font-semibold shadow-2xl shadow-purple-900/20">
            {/* You can place an illustration or image here */}
            Graphic / Illustration
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;