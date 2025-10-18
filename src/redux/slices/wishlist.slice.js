import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, GET_WISHLIST_EVENTS } from "../../api/apis";

// Async thunk for adding event to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ eventId, userEmail }, { rejectWithValue }) => {
    try {
      const response = await axios.post(ADD_TO_WISHLIST(eventId), {}, {
        headers: { "X-email": userEmail },
      });
      console.log(response)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add to wishlist");
    }
  }
);

// Async thunk for removing event from wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async ({ eventId, userEmail }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(REMOVE_FROM_WISHLIST(eventId), {}, {
        headers: { "X-email": userEmail },
      });
      console.log("Wishlist remove response : "  , response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to remove from wishlist");
    }
  }
);

// Async thunk for fetching wishlist events
export const fetchWishlistEvents = createAsyncThunk(
  "wishlist/fetchWishlistEvents",
  async (userEmail, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const email = userEmail || auth.user?.email || auth.userDetails?.email;

      if (!email) {
        return rejectWithValue("No user email available");
      }

      const response = await axios.get(GET_WISHLIST_EVENTS, {
        headers: { "X-email": email },
      });

      console.log("wishlest response : "  , response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch wishlist");
    }
  }
);

const initialState = {
  wishlistEvents: [],
  loading: false,
  error: null,
  wishlistEventIds: [], // For quick lookup of wishlisted events - changed to array for serializability
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearWishlist: (state) => {
      state.wishlistEvents = [];
      state.wishlistEventIds = [];
      state.error = null;
    },
    initializeWishlist: (state, action) => {
      // Initialize wishlist state from localStorage or server data
      state.wishlistEventIds = action.payload || [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        // Add the event ID to the wishlist array if not already present
        const eventId = action.meta.arg.eventId;
        if (!state.wishlistEventIds.includes(eventId)) {
          state.wishlistEventIds.push(eventId);
        }
        // Show success toast
        // Note: Toast is handled in the component, not here
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove from wishlist
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the event ID from the wishlist array
        const eventId = action.meta.arg.eventId;
        state.wishlistEventIds = state.wishlistEventIds.filter(id => id !== eventId);
        // Also remove from the full events list
        state.wishlistEvents = state.wishlistEvents.filter(event => event.event_id !== eventId);
        // Show success toast
        // Note: Toast is handled in the component, not here
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch wishlist events
      .addCase(fetchWishlistEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlistEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistEvents = action.payload || [];
        // Update the array of wishlisted event IDs for quick lookup
        state.wishlistEventIds = (action.payload || []).map(event => event.event_id);
      })
      .addCase(fetchWishlistEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearWishlist, initializeWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;