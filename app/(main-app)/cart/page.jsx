"use client";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/AuthContext";
import { Grid } from "react-loader-spinner";
import AuthGuard from "@/app/components/main-app/ui/auth-guard/AuthGuard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReserveCart = () => {
  const { currentUser } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (currentUser) {
      try {
        const response = await fetch("/api/getBookings");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched bookings:", data);

        const userBookings = data.filter(
          (booking) => booking.userId === currentUser.uid
        );
        const enrichedBookings = await Promise.all(
          userBookings.map(async (booking) => {
            try {
              const roomResponse = await fetch(
                `/api/getRoom/${booking.hotelId}/rooms/${booking.roomId}`
              );
              const hotelResponse = await fetch(
                `/api/getHotels/${booking.hotelId}`
              );
              if (!roomResponse.ok || !hotelResponse.ok) {
                throw new Error("Network response was not ok");
              }
              const roomData = await roomResponse.json();
              const hotelData = await hotelResponse.json();

              return {
                ...booking,
                ...roomData,
                hotelName: hotelData.name,
                docId: booking.id,
              };
            } catch (error) {
              console.error("Error fetching room or hotel data:", error);
              return null;
            }
          })
        );

        setBookings(enrichedBookings.filter(Boolean));
        console.log("Enriched bookings:", enrichedBookings);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  const cancelOrder = async (orderId) => {
    console.log("Order ID to delete:", orderId);

    try {
      setLoading(true);

      const res = await fetch("/api/deleteOrder", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: orderId }),
      });

      if (!res.ok) {
        throw new Error(
          `Failed to delete order. Server responded with status ${res.status}`
        );
      }

      const data = await res.json();
      console.log("Order deleted successfully:", data.message);

      await fetchData();
      toast.success("Reservation deleted successfully");
    } catch (err) {
      console.error("Error deleting order:", err.message);
      setError("Failed to delete order: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return <AuthGuard />;
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 vw-100">
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
    );
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-center mt-5">My Reservations</h2>
      <div className="row flex-wrap">
        {bookings.length > 0 ? (
          bookings.map((element, index) => (
            <div
              key={index}
              className="card mb-3 shadow border-0 bg-white rounded vh-80"
              style={{ maxWidth: "540px", marginLeft: "2rem" }}
            >
              <div className="row no-gutters justify-content-center flex-wrap">
                <div className="col-md-4 align-self-center">
                  <img
                    style={{ objectFit: "cover" }}
                    src={element.image || "/default-image.jpg"}
                    className="card-img ml-2"
                    alt="Booking"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{element.hotelName} hotel</h5>
                    <p className="card-text">{element.Title}</p>
                    <p className="card-text">
                      Created at:{" "}
                      <small className="text-muted">{element.createdAt}</small>
                    </p>
                    <p className="card-text">
                      Price:{" "}
                      <small className="text-muted">
                        {element.Price} $ per night
                      </small>
                    </p>
                    <p className="card-text">
                      Size: <small className="text-muted">{element.Size}</small>
                    </p>
                    <p className="card-text">
                      Capacity:{" "}
                      <small className="text-muted">{element.Capacity}</small>
                    </p>
                    <p className="card-text">
                      Bed: <small className="text-muted">{element.Bed}</small>
                    </p>
                    <p className="card-text">
                      Services:{" "}
                      <small className="text-muted">{element.Services}</small>
                    </p>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => cancelOrder(element.docId)}
                    >
                      Cancel Reservation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="vh-100">
            <p className="text-center text-muted mt-5">
              You haven&apos;t made any reservations.
            </p>
          </div>
        )}
        {/* {bookings.map((element, index) => (
          <div
            key={index}
            className="card mb-3 shadow border-0 bg-white rounded vh-80"
            style={{ maxWidth: "540px", marginLeft: "2rem" }}
          >
            <div className="row no-gutters justify-content-center flex-wrap">
              <div className="col-md-4 align-self-center">
                <img
                  style={{ height: "10rem" }}
                  src={element.image || "/default-image.jpg"}
                  className="card-img ml-2"
                  alt="Booking"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{element.hotelName} hotel</h5>
                  <p className="card-text">{element.Title}</p>
                  <p className="card-text">
                    Created at:{" "}
                    <small className="text-muted">{element.createdAt}</small>
                  </p>
                  <p className="card-text">
                    Price:{" "}
                    <small className="text-muted">
                      {element.Price} $ per night
                    </small>
                  </p>
                  <p className="card-text">
                    Size: <small className="text-muted">{element.Size}</small>
                  </p>
                  <p className="card-text">
                    Capacity:{" "}
                    <small className="text-muted">{element.Capacity}</small>
                  </p>
                  <p className="card-text">
                    Bed: <small className="text-muted">{element.Bed}</small>
                  </p>
                  <p className="card-text">
                    Services:{" "}
                    <small className="text-muted">{element.Services}</small>
                  </p>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => cancelOrder(element.docId)}
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))} */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ReserveCart;
