import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SIGNUP, LOGIN, PING_AUTH, GET_PROFILE, UPDATE_PROFILE, GET_PERSONALIZED_FEED } from "../../api/apis";

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(SIGNUP, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(LOGIN, credentials);
      console.log("Login response :", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const pingAuth = createAsyncThunk(
  "auth/pingAuth",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`${PING_AUTH}/${auth.token}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Ping failed");
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(GET_PROFILE, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      console.log("Fetched profile  :", response);
      return response.data;
    } catch (error) {
      console.log("Error fetching profile:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.patch(UPDATE_PROFILE, profileData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update profile");
    }
  }
);

const initialState = {
  user: null,
  userDetails: null,
  token: null,
  isLoggedIn: false,
  authLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.userDetails = null;
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
      localStorage.removeItem("authToken");
    },
    clearError: (state) => {
      state.error = null;
    },
    resetAuthState: (state) => {
      state.user = null;
      state.userDetails = null;
      state.token = null;
      state.isLoggedIn = false;
      state.authLoading = false;
      state.error = null;
      localStorage.removeItem("authToken");
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.authLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.authLoading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        localStorage.setItem("authToken", action.payload.token);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.authLoading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.authLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authLoading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        localStorage.setItem("authToken", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.authLoading = false;
        state.error = action.payload;
      })
      .addCase(pingAuth.pending, (state) => {
        state.authLoading = true;
        state.error = null;
      })
      .addCase(pingAuth.fulfilled, (state, action) => {
        state.authLoading = false;
      })
      .addCase(pingAuth.rejected, (state, action) => {
        state.authLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.authLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.authLoading = false;
        state.isLoggedIn = true;
        console.log("Fetched profile payload  :", action.payload);
        state.userDetails = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.authLoading = false;
        state.isLoggedIn = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.authLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.authLoading = false;
        state.userDetails = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.authLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, resetAuthState, setToken } = authSlice.actions;

export const initializeAuth = () => (dispatch) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    // Set token in state and fetch profile
    dispatch({ type: 'auth/setToken', payload: token });
    dispatch(fetchProfile());
  }
};

export const initializeAuthAndFetchFeed = () => (dispatch, getState) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    // Set token in state and fetch profile
    dispatch({ type: 'auth/setToken', payload: token });
    dispatch(fetchProfile()).then(() => {
      // Fetch personalized feed after profile is loaded
      const { recommendation } = getState();
      dispatch(fetchPersonalizedFeed({ page: recommendation.currentPage, size: recommendation.pageSize }));
    });
  }
};

export const fetchPersonalizedFeed = createAsyncThunk(
  "recommendation/fetchPersonalizedFeed",
  async ({ page = 0, size = 10 }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();

      console.log("Fetching personalized feed for email:", auth.user?.email, "page:", page, "size:", size);
      console.log("Auth user object:", auth.user);
      const response = await axios.get(GET_PERSONALIZED_FEED, {
        headers: {
          "X-email": auth.user?.email || auth.userDetails?.email,
        },
        params: {
          page,
          size,
        },
      });

      console.log("Personalized feed response :", response);
      return response.data;
    } catch (error) {
        console.log("Error fetching personalized feed:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch personalized feed");
    }
  }
);

export default authSlice.reducer;
