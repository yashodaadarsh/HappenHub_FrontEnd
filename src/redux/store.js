import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import exploreReducer from "./slices/explore.slice";
import signupReducer from "./slices/signup.slice";
import wishlistReducer from "./slices/wishlist.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    explore: exploreReducer,
    signup: signupReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
