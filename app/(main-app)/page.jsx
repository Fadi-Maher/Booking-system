import React from "react";
import AboutUsSection from "../components/main-app/pages/about-us/AboutUsSection";
import HeroHeaderSection from "../components/main-app/pages/home/HeroHeaderSection";
import SliderSection from "../components/main-app/pages/home/SliderSection";
import ReservationForm from "../components/main-app/pages/calendar/Calendar";

const HomePage = () => {
  return (
    <div>
      <HeroHeaderSection />
      <ReservationForm />
      <AboutUsSection />
      <SliderSection />
    </div>
  );
};

export default HomePage;
