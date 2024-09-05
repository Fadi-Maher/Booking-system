"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { Container, Spinner } from "react-bootstrap";
import Link from "next/link";
import styles from "../../../page.module.css";
import { Grid } from "react-loader-spinner";

const HotelDetails = () => {
  const { hotelId } = useParams();
  const router = useRouter();

  // states
  const [hotel, setHotel] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const images = Array.isArray(hotel?.images) ? hotel.images : [];

  const fetchHotelData = () => {
    setIsLoading(true);
    const docRef = doc(db, "hotels", hotelId);
    getDoc(docRef)
      .then(docSnap => {
        setHotel(docSnap.data());
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchHotelData();
  }, []);

  return isLoading ? (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100 ">
      <Grid
        visible={true}
        height="180"
        width="180"
        color="#dfa974"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
      />
    </div>
  ) : (
    <div style={{ paddingTop: "70px" }}>
      <div className="card">
        <div className="card-body">
          <h3>{hotel?.name}</h3>
          <div className="m-2">{hotel?.location}</div>
          <div className="d-flex flex-row flex-wrap  ">
            {hotel.image == null ? (
              <div className=" rounded mx-auto w-50">
                <img
                  src={hotel.image}
                  alt="hotel image"
                  className="img-thumbnail "
                />
              </div>
            ) : (
              images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className="img-thumbnail w-25 "
                  alt={`Room ${index + 1}`}
                />
              ))
            )}
          </div>
          <div>
            <div className="d-flex flex-row flex-wrap justify-content-between  mb-4  mt-4 ">
              <div>
                <span className="m-2 ">
                  {hotel?.reviews == null ? 0 : hotel.reviews.length}
                </span>
                <span className="text-muted ">reviews</span>
              </div>

              <button
                className={`btn text-light btn-lg `}
                style={{ backgroundColor: "#d6a472" }}
                type="submit"
                onClick={() => {
                  router.push(`/hotels/${hotelId}/rooms`);
                }}
              >
                Rooms
              </button>
            </div>
          </div>
        </div>
        <div className="card container shadow p-3 mb-5 bg-white  border-0">
          <h4 className="mt-4 mb-2"> ✨ Facilities</h4>
          <div className="d-flex flex-column flex-wrap justify-content-evenly">
            <h6>Highlights</h6>
            {hotel?.Highlights?.map((highlight, index) => (
              <div className="card-body" key={index}>
                🔸{highlight}
              </div>
            )) ?? []}
            <h6>Cleaning Services</h6>
            <div className="card-body">
              🔸 {hotel?.Amenities ? hotel.Amenities["Cleaning Services"] : ""}
            </div>
            <h6>Food & Drink</h6>
            <div className="card-body">
              {hotel?.Amenities?.["Food & Drink"] ?? ""}
              🔸
            </div>

            <h6>Transportation</h6>
            {Array.isArray(hotel?.Amenities?.["Transportation"]) ? (
              hotel.Amenities["Transportation"].map((amen, index) => (
                <div className="card-body" key={index}>
                  🔸{amen}
                </div>
              ))
            ) : (
              <div>No Transportation amenities available</div>
            )}
          </div>
        </div>
        <div className="card container border-0">
          <div className="card-body">
            <h4 className="mt-4 mb-2">Popular Amenities</h4>
            <div className="d-flex flex-row flex-wrap justify-content-evenly">
              {Array.isArray(hotel?.Amenities?.["Popular Amenities"]) ? (
                hotel.Amenities["Popular Amenities"].map((highlight, index) => (
                  <div
                    className="card shadow p-3 mb-5 bg-white  border-0"
                    key={index}
                  >
                    <div className="card-body">{highlight}</div>
                  </div>
                ))
              ) : (
                <div>No Popular Amenities available</div>
              )}
            </div>
            <div className="mt-4 ">{hotel?.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
