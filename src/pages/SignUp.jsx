import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// Import Redux actions
import { signupUser, clearError as clearAuthError } from "../redux/slices/auth.slice";
import {
  setCurrentStep,
  updateFormData,
  setError,
  setLoading,
  resetSignup,
} from "../redux/slices/signup.slice";

// Import modular components
import ProgressBar from "../components/Signup/ProgressBar";
import Step1 from "../components/Signup/Step1";
import Step2 from "../components/Signup/Step2";
import Step3 from "../components/Signup/Step3";
import Step4 from "../components/Signup/Step4";
import NavigationButtons from "../components/Signup/NavigationButtons";
import RightPanel from "../components/Signup/RightPanel";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select state from Redux store
  const { authLoading, error: authError, isLoggedIn } = useSelector((state) => state.auth);
  const { currentStep, totalSteps, formData, loading, error: signupError } = useSelector((state) => state.signup);

  // Redirect if already logged in
  React.useEffect(() => {
    if (isLoggedIn) navigate("/dashboard");
  }, [isLoggedIn, navigate]);

  // Cleanup errors and reset form on unmount
  React.useEffect(() => {
    return () => {
      dispatch(clearAuthError());
      dispatch(resetSignup());
    };
  }, [dispatch]);

  // Handlers for form inputs
  const handleInputChange = (e) => {
    dispatch(updateFormData({ [e.target.name]: e.target.value }));
  };

  const handleInterestChange = (interest) => {
    const updated = formData.interests.includes(interest)
      ? formData.interests.filter((i) => i !== interest)
      : [...formData.interests, interest];
    dispatch(updateFormData({ interests: updated }));
  };

  const handlePreferenceChange = (preference) => {
    const updated = formData.preferences.includes(preference)
      ? formData.preferences.filter((p) => p !== preference)
      : [...formData.preferences, preference];
    dispatch(updateFormData({ preferences: updated }));
  };

  // Navigation logic
  const nextStep = () => currentStep < totalSteps && dispatch(setCurrentStep(currentStep + 1));
  const prevStep = () => currentStep > 1 && dispatch(setCurrentStep(currentStep - 1));

  // Final signup submission
  const handleSignup = async () => {
    if (formData.password !== formData.confirmPassword) {
      return dispatch(setError("Passwords do not match."));
    }
    
    dispatch(setLoading(true));
    const result = await dispatch(signupUser(formData));
    
    if (signupUser.fulfilled.match(result)) {
      toast.success("Account created successfully! Welcome aboard.");
      dispatch(resetSignup());
      navigate("/dashboard");
    }
    // Note: The error from signupUser (rejected case) is handled by the auth slice's extraReducer
    dispatch(setLoading(false));
  };

  // Render the component for the current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return <Step1 formData={formData} onInputChange={handleInputChange} />;
      case 2: return <Step2 formData={formData} onInterestChange={handleInterestChange} />;
      case 3: return <Step3 formData={formData} onPreferenceChange={handlePreferenceChange} />;
      case 4: return <Step4 formData={formData} />;
      default: return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#1F1F2E] text-gray-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Toaster position="top-right" />
      <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* Left Side: Form */}
        <div className="w-full max-w-lg mx-auto">
          <div className="text-left mb-8">
            <h2 className="text-4xl font-extrabold text-gray-100">
              Create Your Account
            </h2>
            <p className="text-gray-400 mt-2">
              Join HappenHub to unlock a world of events tailored for you.
            </p>
          </div>

          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

          <div className="mt-8 min-h-[350px]">
            {renderCurrentStep()}
          </div>

          <div className="mt-8">
            <NavigationButtons
              currentStep={currentStep}
              totalSteps={totalSteps}
              onPrev={prevStep}
              onNext={nextStep}
              onSubmit={handleSignup}
              loading={loading || authLoading}
            />
            
            {(authError || signupError) && (
              <div className="text-pink-400 text-sm text-center mt-4">
                {authError || signupError}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Informational Panel */}
        <RightPanel currentStep={currentStep} />
      </div>
    </div>
  );
};

export default SignupPage;