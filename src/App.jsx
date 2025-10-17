import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Global/Footer";
import Preferences from "./pages/Preferences";
import Explore from "./pages/Explore";
import EventDetails from "./pages/EventDetails";
import DashboardPreferences from "./pages/Dashboard/Profile";
import Wishlist from "./pages/Dashboard/Wishlist";

const App = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="profile" element={<DashboardPreferences />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/events/:eventId" element={<EventDetails />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
