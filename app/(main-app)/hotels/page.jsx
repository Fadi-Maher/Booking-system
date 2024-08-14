"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const HotelsPage = () => {
  const router = useRouter();

  // states
	const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch("/api/getHotels", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-center text-primary">Hotels</h1>
      <ul style={{ listStyleType: "none", padding: 50 }}>
        <div className="d-flex flex-wrap gap-3 justify-content-around">
          {hotels.map((hotel) => (
            <li key={hotel.id} style={{ marginBottom: "1rem" }}>
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={hotel.image} // Assuming image is an array, use the first one
                  className="img-thumbnail"
                  alt={hotel.name}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{hotel.name}</h5>
                  <p className="card-text">{hotel.description}</p>
                  <p className="card-text">Price: ${hotel.price}</p>
                  <div className="d-flex justify-content-between">
                    {/* <button
                      onClick={() => showDetailsOfHotel(hotel)}
                      className="btn btn-primary"
                    >
                      More Details
                    </button> */}
                    <button
                      onClick={() => router.push(`/hotels/${hotel.id}`)}
                      className="btn btn-primary"
                    >
                      More Details
                    </button>
                    <button className="btn btn-primary" onClick={() => router.push(`/hotels/${hotel.id}/reviews`)}>Reviews</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}

export default HotelsPage;