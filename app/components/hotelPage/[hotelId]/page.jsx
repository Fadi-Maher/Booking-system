import React from "react";

const Reviews = ({ params }) => {
  return (
    <div>
      <h1>Reviews</h1>
      <h3>Hotel ID: {params.hotelId}</h3>
    </div>
  );
};

export default Reviews;
