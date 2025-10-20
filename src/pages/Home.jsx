import React from "react";
import HeroSection from "../components/HomePage/HeroSection";
import WhyHappenHub from "../components/HomePage/WhyHappenHub";
import HowHappenHubWorks from "../components/HomePage/HowHappenHubWorks";
import InteractiveSorter from "../components/HomePage/InteractiveSorter";

const Home = () => {
  return (
    <div className="">
      <HeroSection />
      <InteractiveSorter />
      <HowHappenHubWorks />
      <WhyHappenHub />
    </div>
  );
};

export default Home;
