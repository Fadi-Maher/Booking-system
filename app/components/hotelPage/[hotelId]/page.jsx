"use client";

import React, { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import NavbarComponent from "../../navbar/page";
import { AuthContext } from "@/app/AuthContext";
import ReviewModal from "../../modal/ReviewModal";

const Reviews = ({ params }) => {
  const [hotel, setHotel] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { userDetails } = useContext(AuthContext);

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

  useEffect(() => {
    fetchHotelData();
  }, []);

  const handleReviewAdded = () => {
    fetchHotelData();
  };

  return (
    <div>
      <NavbarComponent />
      <span></span>
      <div className="d-flex justify-content-center mt-2">
        {error && <p className="text-danger">{error.message}</p>}
      </div>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center mt-2 vh-100">
          <div
            className="spinner-border text-primary "
            style={{ width: "4rem", height: "4rem" }}
          ></div>
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
              </div>
            </div>
          </div>
          <div
            className="d-flex flex-column mb-3 mt-3 mx-auto"
            style={{ maxWidth: "40rem" }}
          >
            {/* {console.log(reviews.length)} */}
            {reviews.length > 0 ? (
              <div>
                <p
                  className="border-bottom border-dark-subtle mt-3"
                  style={{ color: "#FFB22C" }}
                >
                  {reviews.length} Review(s) Available
                </p>
                {reviews.map((client) => (
                  <div
                    key={client.name}
                    className="border-bottom border-dark-subtle mt-3"
                  >
                    <h5 className="mb-0">{client.name}</h5>
                    <div>
                      {[1, 2, 3, 4, 5].map((star, index) => {
                        return (
                          <span
                            key={index}
                            className="start"
                            style={{
                              cursor: "default",
                              color:
                                `${client.rating}` >= star ? "gold" : "gray",
                              fontSize: `1.3rem`,
                            }}
                          >
                            {" "}
                            ★{" "}
                          </span>
                        );
                      })}
                    </div>
                    <div className="card-body">
                      <blockquote>
                        <q className="text-secondary">{client.comment}</q>
                      </blockquote>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "#FFB22C" }}>No Available Reviews!</p>
            )}
            <div className=" mt-3">
              <ReviewModal
                hotelId={params.hotelId}
                userDetails={userDetails}
                handleReviewAdded={handleReviewAdded}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Reviews;
