"use client";

import React from "react";
import Link from "next/link";

const HotelDetails = ({ hotel, onClose }) => {
   const images = Array.isArray(hotel.images) ? hotel.images : [];

  return (
    <div className="modal-container">
      <div className="card" style={{  width: '20%' }}>
        <div className="  d-flex  gap-3">
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
         {/*  Link to the Rooms Page */}
      <Link href={`/components/hotelPage/${hotel.id}/rooms`}>
        <button className="btn btn-primary">View Rooms</button>
      </Link>
    </div>
  );
};

export default HotelDetails;
