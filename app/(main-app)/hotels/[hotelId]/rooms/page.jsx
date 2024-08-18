"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./page.module.css" 
import Link from "next/link";
import { Grid } from "react-loader-spinner";
 const RoomsPage = () => {
  const { hotelId } = useParams(); 

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

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



  if (loading) {
    return  <div className="d-flex justify-content-center align-items-center vh-100 vw-100 ">
     <Grid
 
  visible={true}
  height="180"
  width="180"
  color="#0d6efd"
  ariaLabel="grid-loading"
  radius="12.5"
  wrapperStyle={{}}
  wrapperClass="grid-wrapper"
  /> 
  </div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-5">
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
                    <Link  href="#"  className={styles.primarybtn}> Booking Now </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default RoomsPage;
