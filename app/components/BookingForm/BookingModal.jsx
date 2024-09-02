"use client";
import React, { useState, useEffect } from "react";
import styles from "./BookingModal.module.css";
import { useSearchParams } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const BookingModal = ({
  bookingDetails,
  setBookingDetails,
  onSubmit,
  onCancel,
}) => {
  const searchParams = useSearchParams();

  const [arrivalDate, setArrivalDate] = useState(
    searchParams.get("arrivalDate")
      ? new Date(moment(searchParams.get("arrivalDate"), "DD-MM-YYYY").toDate())
      : null
  );
  const [departureDate, setDepartureDate] = useState(
    searchParams.get("departureDate")
      ? new Date(
          moment(searchParams.get("departureDate"), "DD-MM-YYYY").toDate()
        )
      : null
  );
  const [numberOfPersons, setNumberOfPersons] = useState(
    parseInt(searchParams.get("numberOfPersons")) || 1
  );
  const [numberOfChildren, setNumberOfChildren] = useState(
    parseInt(searchParams.get("numberOfChildren")) || 0
  );
  const [numberOfNights, setNumberOfNights] = useState(
    parseInt(searchParams.get("numberOfNights")) || 1
  );

  // Update the total number of persons dynamically
  useEffect(() => {
    const totalPersons = numberOfPersons + numberOfChildren;
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      numberOfPersons: totalPersons,
    }));
  }, [numberOfPersons, numberOfChildren]);

  const calculateNights = (arrival, departure) => {
    if (arrival && departure) {
      const timeDiff = departure.getTime() - arrival.getTime();
      const daysDiff = timeDiff / (1000 * 3600 * 24);
      return daysDiff > 0 ? daysDiff : 1;
    }
    return 1;
  };

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

  const handleArrivalDateChange = date => {
    setArrivalDate(date);
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      arrivalDate: moment(date).format("DD-MM-YYYY"),
    }));
    if (departureDate && date && departureDate <= date) {
      setDepartureDate(null);
    } else {
      setNumberOfNights(calculateNights(date, departureDate));
    }
  };

  const handleDepartureDateChange = date => {
    setDepartureDate(date);
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      departureDate: moment(date).format("DD-MM-YYYY"),
    }));
    setNumberOfNights(calculateNights(arrivalDate, date));
  };

  const handleNumberOfPersonsChange = event => {
    const value = Math.max(1, Number(event.target.value));
    setNumberOfPersons(value);
  };

  const handleNumberOfChildrenChange = event => {
    const value = Math.max(0, Number(event.target.value));
    setNumberOfChildren(value);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div>
          <h2 className="mb-4 text-center">Book Room</h2>

          {/* Labels Section */}
          <div className={styles.labelsSection}>
            {arrivalDate && (
              <p className={styles.label}>
                Arrival Date: {moment(arrivalDate).format("DD-MM-YYYY")}
              </p>
            )}
            {departureDate && (
              <p className={styles.label}>
                Departure Date: {moment(departureDate).format("DD-MM-YYYY")}
              </p>
            )}
            <p className={styles.label}>Number Of Nights: {numberOfNights}</p>
            <p className={styles.label}>Number Of Adults: {numberOfPersons}</p>
            {numberOfChildren > 0 && (
              <p className={styles.label}>
                Number Of Children: {numberOfChildren}
              </p>
            )}
            <p className={styles.label}>
              Total Number Of Persons: {numberOfPersons + numberOfChildren}
            </p>
          </div>

          {/* Input Fields Section */}
          <div className={styles.formGroup}>
            <label>Arrival Date:</label>
            <DatePicker
              selected={arrivalDate}
              onChange={handleArrivalDateChange}
              className="form-control"
              placeholderText="Select Arrival Date"
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Departure Date:</label>
            <DatePicker
              selected={departureDate}
              onChange={handleDepartureDateChange}
              className="form-control"
              placeholderText="Select Departure Date"
              dateFormat="dd/MM/yyyy"
              minDate={arrivalDate || new Date()}
              disabled={!arrivalDate}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Number Of Nights:</label>
            <input
              type="number"
              value={numberOfNights}
              readOnly
              style={{ backgroundColor: "#e4ba90", color: "white" }}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Number Of Adults:</label>
            <input
              type="number"
              value={numberOfPersons}
              onChange={handleNumberOfPersonsChange}
              min="1"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Number Of Children:</label>
            <input
              type="number"
              value={numberOfChildren}
              onChange={handleNumberOfChildrenChange}
              min="0"
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
