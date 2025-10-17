import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GET_PERSONALIZED_FEED } from "../../api/apis";

export const fetchPersonalizedFeed = createAsyncThunk(
  "recommendation/fetchPersonalizedFeed",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();

      console.log("Fetching personalized feed for email:", auth.user?.email);
      const response = await axios.get(GET_PERSONALIZED_FEED, {
        headers: {
          "X-email": auth.user.email,
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

const initialState = {
  events: [],
  loading: false,
  error: null,
};

export const recommendationSlice = createSlice({
  name: "recommendation",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonalizedFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonalizedFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchPersonalizedFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError , setEvents } = recommendationSlice.actions;

export default recommendationSlice.reducer;