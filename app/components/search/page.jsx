"use client";
import React, { useEffect, useState } from "react";
import HotelDetails from "../hotelDetails/page"; // Import the HotelDetails component

const Search = () => {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(null);

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

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(query.toLowerCase())
  );

  const showDetailsOfHotel = (hotel) => {
    setSelectedHotel(hotel);
  };

  const closeDetails = () => {
    setSelectedHotel(null);
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search hotels..."
        value={query}
        onChange={handleInputChange}
        className="form-control "
      />

      {query && filteredHotels.length > 0 && (
        <ul className="list-group">
          {filteredHotels.map((hotel) => (
            <li
              key={hotel.id}
              className="list-group-item"
              onClick={() => showDetailsOfHotel(hotel)}
              style={{ cursor: 'pointer' }}
            >
              {hotel.name}
            </li>
          ))}
        </ul>
      )}

      {selectedHotel && (
        <HotelDetails hotel={selectedHotel} onClose={closeDetails} />
      )}
    </div>
    
  );
};

export default Search;
