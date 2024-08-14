import React from "react";
import AboutUsSection from "../components/main-app/pages/about-us/AboutUsSection";
import HeroHeaderSection from "../components/main-app/pages/home/HeroHeaderSection";
import SliderSection from "../components/main-app/pages/home/SliderSection";

const page = () => {
  return (
    <div>
      <HeroHeaderSection />
      <AboutUsSection />
      <SliderSection />
    </div>
  );
};

export default page;
