"use client";
import React, { useEffect, useState } from 'react';
import { getStorage, ref } from "firebase/storage";
// import { storage } from '@/app/firebase';
const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const storage = getStorage();
  // const imagesRef = ref(storage, 'hotels');
  // const spaceRef = ref(storage, '/hotels/pexels-rickyrecap-1802255.jpg');



  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('/components/getProducts', {
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
        <h1 className='text-center '>Rooms</h1>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
        <div className='d-flex flex-wrap gap-3 justify-content-around'>
          {hotels.map((hotel) => (
            <li key={hotel.id} style={{ marginBottom: '1rem' }}>
              <div className="card " style={{ width: '18rem'  }}>
                <img src={hotel.image} className="card-img-top " alt={hotel.name} style={{ objectFit: 'cover', height: '200px' }} 
 />
                <div className="card-body">
                  <h5 className="card-title">{hotel.name}</h5>
                  <p className="card-text">{hotel.description}</p>
                  <p className="card-text">Price: ${hotel.price}</p>
                  <a href="#" className="btn btn-primary">Book Now</a>
                </div>
                </div>
            </li>
          ))}
      </div>
        </ul>
          </div>
    );
    
};

export default Hotels;
