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
  const [numberOfNights, setNumberOfNights] = useState(
    parseInt(searchParams.get("numberOfNights")) || 1
  );
  const [numberOfAdults, setNumberOfAdults] = useState(
    parseInt(searchParams.get("numberOfAdults")) || 1
  );
  const [numberOfChildren, setNumberOfChildren] = useState(
    parseInt(searchParams.get("numberOfChildren")) || 0
  );

  const calculateNumberOfNights = (arrival, departure) => {
    if (arrival && departure) {
      const arrivalDate = new Date(arrival);
      const departureDate = new Date(departure);
      const timeDifference = departureDate - arrivalDate;
      const nightDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      return nightDifference > 0 ? nightDifference : 0;
    }
    return 1;
  };

  useEffect(() => {
    setArrivalDate(searchParams.get("arrivalDate") || "");
    setDepartureDate(searchParams.get("departureDate") || "");
    setNumberOfNights(
      calculateNumberOfNights(
        searchParams.get("arrivalDate"),
        searchParams.get("departureDate")
      )
    );
    setNumberOfAdults(parseInt(searchParams.get("numberOfAdults")) || 1);
    setNumberOfChildren(parseInt(searchParams.get("numberOfChildren")) || 0);
  }, [searchParams]);

  useEffect(() => {
    setNumberOfNights(calculateNumberOfNights(arrivalDate, departureDate));
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

  const handleNumberOfNightsChange = e => {
    const newNumberOfNights = parseInt(e.target.value);
    setNumberOfNights(newNumberOfNights);
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      numberOfNights: newNumberOfNights,
    }));
  };

  const handleNumberOfAdultsChange = e => {
    const newNumberOfAdults = parseInt(e.target.value);
    setNumberOfAdults(newNumberOfAdults);
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      numberOfAdults: newNumberOfAdults,
    }));
  };

  const handleNumberOfChildrenChange = e => {
    const newNumberOfChildren = parseInt(e.target.value);
    setNumberOfChildren(newNumberOfChildren);
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      numberOfChildren: newNumberOfChildren,
    }));
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div>
          <h2 className="mb-4 text-center">Reserve Now</h2>

          {/* Conditionally render labels based on presence of values */}
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

          <div className={styles.formGroup}>
            <label>Number Of Nights: {numberOfNights}</label>
          </div>

          {numberOfAdults || numberOfChildren ? (
            <div className={styles.formGroup}>
              <label>
                Number Of Persons: {numberOfAdults + numberOfChildren}
              </label>
            </div>
          ) : null}

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
            <label>Number Of Adults: </label>
            <input
              type="number"
              min="1"
              value={numberOfAdults}
              onChange={handleNumberOfAdultsChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Number Of Children: </label>
            <input
              type="number"
              min="0"
              value={numberOfChildren}
              onChange={handleNumberOfChildrenChange}
            />
          </div>

          <button
            onClick={onSubmit}
            className="primary-btn"
            style={{ border: "none" }}
          >
            Confirm Reservation
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
