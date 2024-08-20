"use client";

import React from "react";

const BookingModal = ({ bookingDetails, setBookingDetails, onSubmit, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4 className="text-light">Book Room</h4>
        <div className="form-group input-shadow">
          <label>Start Date:</label>
          <input
            type="date"
            value={bookingDetails.startDate}
            onChange={(e) =>
              setBookingDetails({ ...bookingDetails, startDate: e.target.value })
            }
          />
        </div>
        <div className="form-group input-shadow">
          <label>End Date:</label>
          <input
            type="date"
            value={bookingDetails.endDate}
            onChange={(e) =>
              setBookingDetails({ ...bookingDetails, endDate: e.target.value })
            }
          />
        </div>
        {/* <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={bookingDetails.name}
            onChange={(e) =>
              setBookingDetails({ ...bookingDetails, name: e.target.value })
            }
          />
        </div> */}
    
        <button onClick={onSubmit} className="primary-btn w-25">
          Confirm Booking
        </button>
        <button onClick={onCancel} className="secondary-btn w-25">
          Cancel
        </button>
    </div>
  
    </div>
  );
};

export default BookingModal;
