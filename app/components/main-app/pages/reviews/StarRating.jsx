import React from "react";

function StarRating({ rating, setRating }) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star, index) => {
        return (
          <span
            key={index}
            className="start"
            style={{
              cursor: "pointer",
              color: rating >= star ? "gold" : "gray",
              fontSize: `1.3rem`,
            }}
            onClick={() => {
              setRating(star);
            }}
          >
            {" "}
            ★{" "}
          </span>
        );
      })}
    </div>
  );
}

export default StarRating;
