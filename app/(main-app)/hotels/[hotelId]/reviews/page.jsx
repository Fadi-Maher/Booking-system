"use client";

import React, { useContext, useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { AuthContext } from "@/app/AuthContext";
import ReviewModal from "@/app/components/main-app/ui/modals/ReviewModal";
import { Grid } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReviewDetailsPage = ({ params }) => {
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

  const handleDeleteReview = async (reviewName) => {
    try {
      const docRef = doc(db, "hotels", params.hotelId);
      const hotelDoc = await getDoc(docRef);
      const hotelData = hotelDoc.data();
      const updatedReviews = hotelData.reviews.filter(
        (review) => review.name !== reviewName
      );

      toast.success("Review Deleted");
      setTimeout(async () => {
        await updateDoc(docRef, { reviews: updatedReviews });
        fetchHotelData();
      }, 1000);
    } catch (err) {
      console.error("Failed to delete review:", err);
      setError("Failed to delete review.");
    }
  };

  useEffect(() => {
    fetchHotelData();
  }, []);

  const handleReviewAdded = () => {
    fetchHotelData();
  };

  return (
    <div>
      <div className="d-flex justify-content-center mt-2">
        {error && <p className="text-danger">{error.message}</p>}
      </div>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center vh-100 vw-100 ">
          <Grid
            visible={true}
            height="180"
            width="180"
            color="#d6a472"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass="grid-wrapper"
          />
        </div>
      ) : (
        <>
          {" "}
          <div className="d-flex justify-content-center mt-3">
            <div className="card" style={{ width: "25rem" }}>
              <img
                src={hotel.image}
                className="card-img-top"
                alt="beautiful hotel"
              />
              <div className="card-body">
                <h4 className="card-title">{hotel.name}</h4>
              </div>
            </div>
          </div>
          <div
            className="d-flex flex-column mb-3 mt-3 mx-auto p-2 rounded"
            style={{
              maxWidth: "40rem",
              backgroundColor: "#222736",
              color: "white",
            }}
          >
            {reviews?.length > 0 ? (
              <div>
                <p className="border-bottom border-dark-subtle mt-3 text-warning">
                  {reviews.length} Review(s) Available
                </p>
                {reviews.map((client) => (
                  <div
                    key={client.name}
                    className="border-bottom border-dark-subtle mt-3 "
                  >
                    <div className="float-end d-flex gap-2">
                      <small className="text-secondary">{client.date}</small>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        onClick={() => handleDeleteReview(client.name)}
                        style={{
                          display:
                            userDetails?.username === client.name
                              ? "block"
                              : "none",
                          cursor: "pointer",
                        }}
                        width="0.8rem"
                      >
                        <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                      </svg>
                    </div>

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
                        <q>{client.comment}</q>
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
      <ToastContainer />
    </div>
  );
};

export default ReviewDetailsPage;
