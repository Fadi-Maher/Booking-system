"use client";
import React, { useState, useEffect } from "react";
import styles from "./BookingModal.module.css";
import { useSearchParams } from "next/navigation";

const BookingModal = ({
  bookingDetails,
  setBookingDetails,
  onSubmit,
  onCancel,
}) => {
  const searchParams = useSearchParams();
  const [arrivalDate, setArrivalDate] = useState(
    searchParams.get("arrivalDate") || ""
  );
  const [departureDate, setDepartureDate] = useState(
    searchParams.get("departureDate") || ""
  );
  const [numberOfPersons, setNumberOfPersons] = useState(
    parseInt(searchParams.get("numberOfPersons")) || 1
  );
  const [numberOfNights, setNumberOfNights] = useState(
    parseInt(searchParams.get("numberOfNights")) || 1
  );

  // Function to calculate the difference in days
  const calculateNights = (arrival, departure) => {
    const arrivalDateObj = new Date(arrival);
    const departureDateObj = new Date(departure);
    const timeDiff = departureDateObj - arrivalDateObj;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff > 0 ? daysDiff : 1;
  };

  // Update number of nights whenever dates change
  useEffect(() => {
    if (arrivalDate && departureDate) {
      const calculatedNights = calculateNights(arrivalDate, departureDate);
      setNumberOfNights(calculatedNights);
      setBookingDetails(prevDetails => ({
        ...prevDetails,
        numberOfNights: calculatedNights,
      }));
    }
  }, [arrivalDate, departureDate]);

  const handleArrivalDateChange = e => {
    const newArrivalDate = e.target.value;
    setArrivalDate(newArrivalDate);
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      arrivalDate: newArrivalDate,
    }));
  };

  const handleDepartureDateChange = e => {
    const newDepartureDate = e.target.value;
    setDepartureDate(newDepartureDate);
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      departureDate: newDepartureDate,
    }));
  };

  const handleNumberOfPersonsChange = e => {
    const newNumberOfPersons = parseInt(e.target.value);
    setNumberOfPersons(newNumberOfPersons);
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      numberOfPersons: newNumberOfPersons,
    }));
  };

  const handleNumberOfNightsChange = e => {
    const newNumberOfNights = parseInt(e.target.value);
    setNumberOfNights(newNumberOfNights);
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      numberOfNights: newNumberOfNights,
    }));
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div>
          <h2 className="mb-4 text-center">Book Room</h2>

          {arrivalDate && (
            <div className={styles.formGroup}>
              <label>Arrival Date: {arrivalDate}</label>
            </div>
          )}

          {departureDate && (
            <div className={styles.formGroup}>
              <label>Departure Date: {departureDate}</label>
            </div>
          )}

          {numberOfNights && (
            <div className={styles.formGroup}>
              <label>Number Of Nights: {numberOfNights}</label>
            </div>
          )}

          {numberOfPersons && (
            <div className={styles.formGroup}>
              <label>Number Of Persons: {numberOfPersons}</label>
            </div>
          )}

          <div className={styles.formGroup}>
            <label>Arrival Date: </label>
            <input
              type="date"
              value={arrivalDate}
              onChange={handleArrivalDateChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Departure Date: </label>
            <input
              type="date"
              value={departureDate}
              onChange={handleDepartureDateChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Number Of Nights: </label>
            <input
              type="number"
              min="1"
              value={numberOfNights}
              onChange={handleNumberOfNightsChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Number Of Persons: </label>
            <input
              type="number"
              min="1"
              value={numberOfPersons}
              onChange={handleNumberOfPersonsChange}
            />
          </div>

          <button
            onClick={onSubmit}
            className="primary-btn"
            style={{ border: "none" }}
          >
            Confirm Booking
          </button>
          <button
            onClick={onCancel}
            className="secondary-btn"
            style={{ border: "none" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
