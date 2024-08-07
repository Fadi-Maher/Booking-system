"use client"
import React, { useEffect, useState } from 'react';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('/app/components/getProducts/page.jsx', {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
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
      <h1>hotels</h1>
      <ul>
        {hotels.map((hotel) => (
          <li key={hotel.id}>
            <h2>{hotel.name}</h2>
            <img src={hotel.image} alt='img1'/>
            <p>{hotel.description}</p>
            <p>Price: ${hotel.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hotels;