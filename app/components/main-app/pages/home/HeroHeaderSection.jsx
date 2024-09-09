"use client";

import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const HeroHeaderSection = () => {
  // useEffect(() => {
  //   if (typeof window !== "undefined" && window.bootstrap) {
  //     window.bootstrap.Carousel.getInstance(
  //       document.querySelector("#carouselExampleSlidesOnly")
  //     );
  //   }
  // }, []);

  return (
    <div
      id="carouselExampleSlidesOnly"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active position-relative">
          <img
            className="d-block w-100"
            src="/img/hero/hero-1.jpg"
            alt="First slide"
          />
          <div className="carousel-caption d-none d-md-block">
            <h1>Reserve Mate </h1>
            <p>
              At Reserve-Mate, we are dedicated to simplifying the reservation
              process for both businesses and customers. Our platform is
              designed to streamline bookings, making it easier and more
              efficient for everyone involved.
            </p>
          </div>
        </div>
        <div className="carousel-item position-relative">
          <img
            className="d-block w-100"
            src="/img/hero/hero-2.jpg"
            alt="Second slide"
          />
          <div className="carousel-caption d-none d-md-block">
            <h1>Reserve Mate </h1>
            <p>
              At Reserve-Mate, we are dedicated to simplifying the reservation
              process for both businesses and customers. Our platform is
              designed to streamline bookings, making it easier and more
              efficient for everyone involved.
            </p>
          </div>
        </div>
        <div className="carousel-item position-relative">
          <img
            className="d-block w-100"
            src="/img/hero/hero-3.jpg"
            alt="Third slide"
          />
          <div className="carousel-caption d-none d-md-block">
            <h1>Reserve Mate </h1>
            <p>
              At Reserve-Mate, we are dedicated to simplifying the reservation
              process for both businesses and customers. Our platform is
              designed to streamline bookings, making it easier and more
              efficient for everyone involved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroHeaderSection;
