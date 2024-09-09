"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SliderSection = () => {
  useEffect(() => {
    // Ensure the carousel is initialized
    if (typeof window !== "undefined" && window.bootstrap) {
      const carouselElement = document.getElementById(
        "carouselExampleIndicators"
      );
      new window.bootstrap.Carousel(carouselElement);
    }
  }, []);
  const router = useRouter();

  const showHotelsClickHandler = () => router.push("/hotels");

  return (
    <div className="container mb-5 d-flex flex-column">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {/* Slide 1 */}
          <div className="carousel-item active position-relative">
            <div style={{ height: "800px", overflow: "hidden" }}>
              <Image
                className="d-block w-100"
                src="/assets/images/Santorini-Greece.jpg"
                alt="Santorini, Greece"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="carousel-caption position-absolute top-50 start-50 translate-middle text-center">
              <h3 className="text-dark">Greece</h3>
              <h4 className="text-dark bg-transparent">
                &quot;Experience the ancient wonders from the Acropolis to the
                beautiful islands of Santorini and Mykonos.&quot;
              </h4>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item position-relative">
            <div style={{ height: "800px", overflow: "hidden" }}>
              <Image
                className="d-block w-100"
                src="/assets/images/pexels-pixabay-531602.jpg"
                alt="Italy"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="carousel-caption position-absolute top-50 start-50 translate-middle text-center">
              <h3 className="text-white">Italy</h3>
              <h4 className="text-white bg-gradient-warning">
                &quot;Discover the romance of Venice, the grandeur of Rome, and
                the beauty of Tuscany.&quot;
              </h4>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="carousel-item position-relative">
            <div style={{ height: "800px", overflow: "hidden" }}>
              <Image
                className="d-block w-100"
                src="/assets/images/31 Top Landmarks in Egypt - Luxor Temple.jpeg"
                alt="Egypt"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="carousel-caption position-absolute top-50 start-50 translate-middle text-center">
              <h3>Egypt</h3>
              <h4>
                &quot;Unveil the mysteries of Egypt with its majestic pyramids,
                ancient temples, and the Nile River.&quot;
              </h4>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Description Section */}
      <div className="d-flex align-items-center flex-column">
        <p className="w-75 mt-5 text-center" style={{ color: "#555" }}>
          We provide you with a variety of luxurious hotels in different places
          and with various and different services. We provide you with the room
          reservations you need in any hotel you choose to make it easy for you
          to spend comfortable and enjoyable vacations.
        </p>
        <button
          className="primary-btn mt-1 w-25"
          onClick={showHotelsClickHandler}
        >
          Show Hotels
        </button>
      </div>
    </div>
  );
};

export default SliderSection;
