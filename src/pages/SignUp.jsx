import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, clearError } from "../redux/slices/auth.slice";
import {
  setCurrentStep,
  updateFormData,
  setLoading,
  setError,
  clearError as clearSignupError,
  resetSignup,
} from "../redux/slices/signup.slice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

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
  const { authLoading, error, isLoggedIn } = useSelector((state) => state.auth);
  const { currentStep, totalSteps, formData, loading, signupError } = useSelector((state) => state.signup);

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  React.useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearSignupError());
    };
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const handleInterestChange = (interest) => {
    const updatedInterests = formData.interests.includes(interest)
      ? formData.interests.filter((i) => i !== interest)
      : [...formData.interests, interest];
    dispatch(updateFormData({ interests: updatedInterests }));
  };

  const handlePreferenceChange = (preference) => {
    const updatedPreferences = formData.preferences.includes(preference)
      ? formData.preferences.filter((p) => p !== preference)
      : [...formData.preferences, preference];
    dispatch(updateFormData({ preferences: updatedPreferences }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      dispatch(setCurrentStep(currentStep + 1));
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      dispatch(setCurrentStep(currentStep - 1));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      dispatch(setError("Passwords do not match"));
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(null));

    const signupData = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      preferences: formData.preferences.map(pref => pref.toUpperCase()),
      interests: formData.interests.map(interest => interest.toUpperCase()),
    };

    try {
      const result = await dispatch(signupUser(signupData));
      if (signupUser.fulfilled.match(result)) {
        toast.success("Account created successfully! Welcome to HappenHub!");
        dispatch(resetSignup());
        navigate("/dashboard");
      }
    } catch (error) {
      dispatch(setError("Signup failed. Please try again."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleSignup = () => {
    console.log("Google signup clicked");
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} onInputChange={handleInputChange} />;
      case 2:
        return <Step2 formData={formData} onInterestChange={handleInterestChange} />;
      case 3:
        return <Step3 formData={formData} onPreferenceChange={handlePreferenceChange} />;
      case 4:
        return <Step4 formData={formData} />;
      default:
        return <Step1 formData={formData} onInputChange={handleInputChange} />;
    }
  };

  return (
    <div className="w-full mx-auto min-h-screen bg-richblack-900 text-white py-12 px-4 md:px-16">
      <Toaster position="top-right" />
      {/* Unified Heading */}
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white animate-fadeIn">
          Create Your Account
        </h2>
        <p className="text-gray-400 text-sm mt-2 animate-fadeIn delay-200">
          Join us and explore opportunities.
        </p>
      </div>

      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-12 md:gap-16 w-full">
        {/* Left Side: Form */}
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="w-full max-w-xl">
            {renderCurrentStep()}

            <NavigationButtons
              currentStep={currentStep}
              totalSteps={totalSteps}
              onPrev={prevStep}
              onNext={nextStep}
              onSubmit={handleSignup}
              loading={loading}
              authLoading={authLoading}
            />

            {/* Error Display */}
            {(error || signupError) && (
              <div className="text-red-400 text-sm text-center mt-4">
                {error || signupError}
              </div>
            )}
          </div>
        </div>

        <RightPanel currentStep={currentStep} />
      </div>
    </div>
  );
};

export default SignupPage;
