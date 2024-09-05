"use client";

import React, { useContext } from "react";
import AboutUsSection from "../components/main-app/pages/about-us/AboutUsSection";
import HeroHeaderSection from "../components/main-app/pages/home/HeroHeaderSection";
import SliderSection from "../components/main-app/pages/home/SliderSection";
import ReservationForm from "../components/main-app/pages/calendar/Calendar";
import { AuthContext } from "../AuthContext";

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      <HeroHeaderSection />
      {currentUser && <ReservationForm />}
      <AboutUsSection />
      <SliderSection />
    </div>
  );
};

export default HomePage;
