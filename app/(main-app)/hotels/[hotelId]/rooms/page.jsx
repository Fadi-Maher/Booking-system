"use client";

import React, { useEffect, useState } from "react";
//import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./page.module.css" 

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
      <h1 className="text-center  pt-5">Our Rooms</h1>
      <section className={styles.spad}>
      <div className={styles.roomsSection}>
        <div className="container">
          <div className="row">
            {rooms.map((room) => (
              <div className="col-lg-4 col-md-6" key={room.id}>
                <div className={styles.roomitem}>
                  <img src={room.image} alt={room.Title} />
                  <div className={styles.ritext}>
                    <h4>{room.Title}</h4>
                    <h3>{room.Price}$<span>/Pernight</span></h3>
                    <table>
                      <tbody>
                        <tr>
                          <td className={styles.ro}>Size:</td>
                          <td>{room.Size}</td>
                        </tr>
                        <tr>
                          <td className={styles.ro}>Capacity:</td>
                          <td>{room.Capacity}</td>
                        </tr>
                        <tr>
                          <td className={styles.ro}>Bed:</td>
                          <td>{room.Bed}</td>
                        </tr>
                        <tr>
                          <td className={styles.ro}>Services:</td>
                          <td>{room.Services}</td>
                        </tr>
                      </tbody>
                    </table>
                    <a
                      href="#"
                      className={styles.primarybtn}
                      onClick={() => showDetailsOfRoom(room)}
                    >
                      More Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {selectedRoom && (
        <div>
          <h2>{selectedRoom.Title}</h2>
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
