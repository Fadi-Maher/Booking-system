"use client";
import { AuthContext } from "@/app/AuthContext";
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Grid } from "react-loader-spinner";
import styles from "./page.module.css";
import BookingModal from "@/app/components/BookingForm/BookingModal";
import Popup from "@/app/components/BookingForm/Popup";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RoomsPage = () => {
  const { hotelId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    arrivalDate: "",
    departureDate: "",
  });
  const router = useRouter();
  const [availabilityError, setAvailabilityError] = useState("Invalid");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      if (!hotelId) return;

      try {
        const response = await fetch(`/api/getHotels/${hotelId}/rooms`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setRooms(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hotelId]);

  const handleBookingSubmit = () => {
    setAvailabilityError("");

    const newArrivalDate = new Date(bookingDetails.arrivalDate);
    const newDepartureDate = new Date(bookingDetails.departureDate);
    const currentDate = new Date();

    // dates are not empty
    if (!bookingDetails.arrivalDate || !bookingDetails.departureDate) {
      setAvailabilityError(
        "Invalid date: room is not Availabile for this date."
      );
      setPopupType("error");
      setPopupMessage(availabilityError);
      setShowPopup(true);
      return;
    }

    // dates are not in the past
    if (newArrivalDate < currentDate || newDepartureDate < currentDate) {
      setAvailabilityError(
        "Invalid date: Start date and end date must be in the future."
      );
      setPopupType("error");
      setPopupMessage(availabilityError);
      setShowPopup(true);
      return;
    }

    // end date is after the start date
    if (newDepartureDate < newArrivalDate) {
      setAvailabilityError(
        "Invalid date: End date must be after the start date."
      );
      setPopupType("error");
      setPopupMessage(availabilityError);
      setShowPopup(true);
      return;
    }

    // Include userId in bookingDetails
    const bookingData = {
      ...bookingDetails,
      userId: currentUser.uid,
      roomId: selectedRoom,
      hotelId,
      roomPrice: rooms.find((room) => room.id === selectedRoom).Price,
    };

    // Store the booking data temporarily in localStorage or state (depending on your needs)
    localStorage.setItem("bookingData", JSON.stringify(bookingData));

    // Redirect to checkout page
    router.push("/checkout");
  };

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
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-center">Our Rooms</h1>
      <section className={styles.spad}>
        <div className={styles.roomsSection}>
          <div className="container">
            <div className="row">
              {rooms.map((room) => (
                <div className="col-lg-4 col-md-6" key={room.id}>
                  <div className={styles.roomitem}>
                    <img src={room.image} alt={room.Title} />
                    <div className={styles.ritext}>
                      <h4>{room.Title}</h4>
                      <h3>
                        {room.Price}$<span>/Pernight</span>
                      </h3>
                      <table>
                        <tbody>
                          <tr>
                            <td className={styles.ro}>Size:</td>
                            <td>{room.Size}</td>
                          </tr>
                          <tr>
                            <td className={styles.ro}>Capacity:</td>
                            <td>{room.Capacity}</td>
                          </tr>
                          <tr>
                            <td className={styles.ro}>Bed:</td>
                            <td>{room.Bed}</td>
                          </tr>
                          <tr>
                            <td className={styles.ro}>Services:</td>
                            <td>{room.Services}</td>
                          </tr>
                        </tbody>
                      </table>
                      <Link
                        href="#"
                        onClick={() => setSelectedRoom(room.id)}
                        className={styles.primarybtn}
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedRoom && (
        <BookingModal
          bookingDetails={bookingDetails}
          setBookingDetails={setBookingDetails}
          onSubmit={handleBookingSubmit}
          onCancel={() => setSelectedRoom(null)}
        />
      )}

      {showPopup && (
        <Popup
          message={popupMessage}
          type={popupType}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default RoomsPage;
