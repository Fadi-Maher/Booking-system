//app/(main-app)/components/BookingForm/BookingModal
"use client";
import React from "react";
import styles from "./BookingModal.module.css";
import { useSearchParams } from "next/navigation";

const BookingModal = ({
  bookingDetails,
  setBookingDetails,
  onSubmit,
  onCancel,
}) => {
  const searchParams = useSearchParams();
  const arrivalDate = searchParams.get("arrivalDate");
  const departureDate = searchParams.get("departureDate");
  const numberOfPersons = searchParams.get("numberOfPersons");
  const numberOfNights = searchParams.get("numberOfNights");

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div>
          <h2 className=" mb-4 text-center">Book Room</h2>
          <div className={styles.formGroup}>
            <label>Start Date: </label>
            <input
              type="date"
              value={bookingDetails.startDate}
              onChange={e =>
                setBookingDetails({
                  ...bookingDetails,
                  startDate: e.target.value,
                })
              }
            />
          </div>
          <div className={styles.formGroup}>
            <label>End Date:</label>
            <input
              type="date"
              value={bookingDetails.endDate}
              onChange={e =>
                setBookingDetails({
                  ...bookingDetails,
                  endDate: e.target.value,
                })
              }
            />
          </div>

          <button
            onClick={onSubmit}
            className="primary-btn "
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
