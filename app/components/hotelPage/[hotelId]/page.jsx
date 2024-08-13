"use client";

import React, { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import NavbarComponent from "../../navbar/page";
import { AuthContext } from "@/app/AuthContext";

const Reviews = ({ params }) => {
  const [hotel, setHotel] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const currentUser = useContext(AuthContext);

  useEffect(() => {
    const fetchHotelData = () => {
      setIsLoading(true);
      const docRef = doc(db, "hotels", params.hotelId);
      getDoc(docRef)
        .then((docSnap) => {
          setHotel(docSnap.data());
          setReviews(docSnap.data().reviews);

          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError(err.message);
          setIsLoading(false);
        });
    };
    fetchHotelData();
  }, []);

  return (
    <div>
      <NavbarComponent />

      <div className="d-flex justify-content-center mt-2">
        {error && <p className="text-danger">{error.message}</p>}
      </div>
      {isLoading ? (
        <div className="d-flex justify-content-center mt-2">
          <div className="spinner-border"></div>
        </div>
      ) : (
        <>
          {" "}
          <div className="d-flex justify-content-center mt-3">
            <div className="card" style={{ width: "25rem" }}>
              <img
                src={hotel.image}
                className="card-img-top "
                alt="beautiful hotel"
              />
              <div className="card-body">
                <h4 className="card-title">{hotel.name}</h4>
                {/* <p className="card-text">
              This is a longer card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p> */}
              </div>
            </div>
          </div>
          <div
            className="d-flex flex-column mb-3 mt-3 mx-auto"
            style={{ maxWidth: "40rem" }}
          >
            {currentUser && <h4>Reviews</h4>}
            {currentUser && <h4>{currentUser.displayName}</h4>}

            {reviews.map((client) => (
              <div
                key={client.name}
                className="border-bottom border-dark-subtle mt-3"
              >
                <h5>{client.name}</h5>
                <div className="card-body">
                  {/* <h5 className="card-title">Secondary card title</h5> */}
                  <blockquote>
                    <q className="text-secondary">{client.comment}</q>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Reviews;
