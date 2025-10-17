import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import exploreReducer from "./slices/explore.slice";
import recommendationReducer from "./slices/recommendation.slice";
import signupReducer from "./slices/signup.slice";
import wishlistReducer from "./slices/wishlist.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    explore: exploreReducer,
    recommendation: recommendationReducer,
    signup: signupReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
