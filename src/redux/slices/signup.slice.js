import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 1,
  totalSteps: 4,
  formData: {
    // Step 1: Basic Details
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    address: "",

    // Step 2: Professional Interests
    interests: [],

    // Step 3: Event Preferences
    preferences: [],
  },
  loading: false,
  error: null,
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetSignup: (state) => {
      state.currentStep = 1;
      state.formData = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        address: "",
        interests: [],
        preferences: [],
      };
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setCurrentStep,
  updateFormData,
  setLoading,
  setError,
  clearError,
  resetSignup,
} = signupSlice.actions;

export default signupSlice.reducer;