import React from "react";
import HeroSection from "../components/HomePage/HeroSection";
import WhyHappenHub from "../components/HomePage/WhyHappenHub";
import HowHappenHubWorks from "../components/HomePage/HowHappenHubWorks";

const Home = () => {
  return (
    <div className="">
      <HeroSection />
      <HowHappenHubWorks />
      <WhyHappenHub />
    </div>
  );
};

export default Home;
