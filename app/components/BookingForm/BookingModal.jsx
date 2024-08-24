"use client";

import React from "react";
import styles from "./BookingModal.module.css";

const BookingModal = ({ bookingDetails, setBookingDetails, onSubmit, onCancel }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div>
        <h2 className=" mb-4 text-center">Book Room</h2>
          <div className={styles.formGroup}>
     
            <label >Start Date: </label>
            <input
              type="date"
              value={bookingDetails.startDate}
              onChange={(e) =>
                setBookingDetails({ ...bookingDetails, startDate: e.target.value })
              }
            />
          
          </div>
          <div className={styles.formGroup}>
     
            <label>End Date:</label>
            <input
              type="date"
              value={bookingDetails.endDate}
              onChange={(e) =>
                setBookingDetails({ ...bookingDetails, endDate: e.target.value })
              }
            />
      
          </div>

          <button onClick={onSubmit} className="primary-btn ">
            Confirm Booking
          </button>
          <button onClick={onCancel} className="secondary-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;

