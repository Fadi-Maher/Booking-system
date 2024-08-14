
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation"; 

const RoomsPage = () => {
  const { hotelId } = useParams(); 

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      if (!hotelId) return; 

      try {
        const response = await fetch(`/api/getHotels/${hotelId}/rooms`, {
          method: "GET",
        });

        console.log(response);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
      
        setRooms(data);

       
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hotelId]); 

  const showDetailsOfRoom = (room) => {
    setSelectedRoom(room);
  };

  const closeDetails = () => {
    setSelectedRoom(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-center text-primary">Rooms</h1>
      <ul style={{ listStyleType: "none", padding: 50 }}>
        <div className="d-flex flex-wrap gap-3 justify-content-around">
          {rooms.map((room) => (
            <li key={room.id} style={{ marginBottom: "1rem" }}>
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={room.image} // Assuming image is a string for room
                  className="img-thumbnail"
                  alt={room.name}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{room.name}</h5>
                  <p className="card-text">{room.description}</p>
                  <p className="card-text">Price: ${room.price}</p>
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={() => showDetailsOfRoom(room)}
                      className="btn btn-primary"
                    >
                      More Details
                    </button>
                    <Link href={`/components/roomPage/${room.id}`}>
                      <button className="btn btn-primary">Reviews</button>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </div>
      </ul>

      {selectedRoom && (
        <div>
          <h2>{selectedRoom.name}</h2>
          <p>{selectedRoom.description}</p>
          {/* Add more details or a detailed component */}
          <button onClick={closeDetails} className="btn btn-secondary">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomsPage;
