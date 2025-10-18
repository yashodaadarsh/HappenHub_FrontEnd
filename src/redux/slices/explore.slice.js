import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GET_EVENTS_PAGED, GET_PERSONALIZED_FEED, PING_AUTH, SEARCH_EVENTS, GET_EVENTS_BY_TYPE, RECOMMENDATION_BASE_URL } from "../../api/apis";

// Async thunk for checking authentication
export const checkAuthStatus = createAsyncThunk(
  "explore/checkAuthStatus",
  async (_, { rejectWithValue }) => {
    try {

      console.log("Checking auth status with token:", localStorage.getItem("authToken"));

      const response = await axios.get(PING_AUTH+`${localStorage.getItem("authToken")}`, {
      });

      console.log("Auth status response:", response.data);
      
      return { isLoggedIn: true, email: response.data.email };
    } catch (error) {
      return { isLoggedIn: false };
    }
  }
);

// Async thunk for fetching events with pagination, search, filters, and sorting
export const fetchEvents = createAsyncThunk(
  "explore/fetchEvents",
  async ({ page = 0, size = 12, search = "", filterType = "", sortBy = "" }, { rejectWithValue }) => {
    try {
      // For explore page, use search service
      if (search) {
        const response = await axios.get(`${SEARCH_EVENTS}/${search}`);
        return response.data;
      } else if (filterType) {
        const response = await axios.get(`${GET_EVENTS_BY_TYPE}/${filterType}`);
        return response.data;
      } else {
        let url = GET_EVENTS_PAGED;
        const params = new URLSearchParams();

        if (page !== undefined) params.append('page', page);
        if (size !== undefined) params.append('size', size);
        if (sortBy) params.append('sortBy', sortBy);

        if (params.toString()) url += `?${params.toString()}`;

        const response = await axios.get(url);
        console.log("Fetched events:", response.data);

        return response.data;

      }
    } catch (error) {
      console.error("Error fetching events:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch events");
    }
  }
);

const initialState = {
  events: [],
  loading: false,
  error: null,
  currentPage: 0,
  totalPages: 1,
  searchQuery: "",
  filterType: "",
  sortBy: "",
};

export const exploreSlice = createSlice({
  name: "explore",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilterType: (state, action) => {
      state.filterType = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        // Auth status is now handled in auth slice
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        // Auth status is now handled in auth slice
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        // Auth status is now handled in auth slice
      })
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
        // Assuming we have 10 pages for demo purposes, you can adjust this based on API response
        state.totalPages = 10;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setSearchQuery, setFilterType, setCurrentPage, setSortBy } = exploreSlice.actions;

export default exploreSlice.reducer;