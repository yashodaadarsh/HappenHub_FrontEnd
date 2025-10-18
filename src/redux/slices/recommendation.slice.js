import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GET_PERSONALIZED_FEED } from "../../api/apis";

export const fetchPersonalizedFeed = createAsyncThunk(
  "recommendation/fetchPersonalizedFeed",
  async ({ page = 0, size = 12 }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();

      console.log("Recomandation slcie Fetching personalized feed for email:", auth.user?.email, "page:", page, "size:", size);
      const response = await axios.get(GET_PERSONALIZED_FEED, {
        headers: {
          "X-email": auth.user?.email || auth.userDetails?.email,
        },
        params: {
          page,
          size,
        },
      });

      console.log("Recomandation Personalized feed response :", response);
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
  currentPage: 0,
  totalPages: 1,
  pageSize: 10,
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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
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
        state.events = action.payload.content || action.payload || [];
        // Set total pages from response if available, otherwise default to 1
        state.totalPages = action.payload.totalPages || action.payload.pageable?.pageSize ? Math.ceil((action.payload.totalElements || 0) / (action.payload.pageable?.pageSize || 10)) : 1;
      })
      .addCase(fetchPersonalizedFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setEvents, setCurrentPage, setPageSize } = recommendationSlice.actions;

export default recommendationSlice.reducer;