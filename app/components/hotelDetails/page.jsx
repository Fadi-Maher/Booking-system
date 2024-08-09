"use client";

import React from "react";

const HotelDetails = ({ hotel, onClose }) => {
  // Ensure images is an array; default to an empty array if not
  const images = Array.isArray(hotel.images) ? hotel.images : [];

  return (
    <div className="modal-container">
      <div className="card" style={{  width: '30%', maxWidth: '400px'  }}>
        <div className="image-gallery d-flex  gap-3">
          {images.map((img, index) => (
            <img
              
              key={index}
              src={img}
              className="img-thumbnail"
              alt={`Room ${index + 1}`}
            />
          ))}
        </div>
       
         
      </div>
      <h2 className="card-text">{hotel.details}</h2>
      <button onClick={onClose} className="close-btn btn btn-primary p-3 m-3  justify-content-center d-flex ">
          Close
        </button>
    </div>
  );
};

export default HotelDetails;
