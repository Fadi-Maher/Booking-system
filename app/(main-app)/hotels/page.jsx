"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const HotelsPage = () => {
  const router = useRouter();

  // states
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
 
    const isAuthenticated = !!localStorage.getItem('authToken');  
    if (!isAuthenticated) {
      router.push('/login');  
      return;
    }

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
        setFadeIn(true);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [router]);

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const truncateText = (text, lines = 3) => {
    if (typeof text !== 'string') {
      return '';
    }
    const textLines = text.split(' ');
    if (textLines.length <= lines) {
      return text;
    }
    return textLines.slice(0, lines).join(' ') + '...';
  };

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
          {hotels.map((hotel) => {
            const truncatedText = truncateText(hotel.description, 20); // Changed from 3 to 20 words
            const isTruncated = hotel.description.split(' ').length > 20;

            return (
              <li key={hotel.id} style={{ marginBottom: "1rem" }}>
                <div 
                  className={`card fade-in`}  
                  style={{ width: "18rem", border: "1px solid #ccc", borderRadius: "8px" }}
                >
                  <img
                    src={hotel.image}
                    className="card-img-top"
                    alt={hotel.name}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{hotel.name}</h5>
                    <div style={{ 
                      maxHeight: expanded[hotel.id] ? 'none' : '4.5em', 
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <p className="card-text" style={{ margin: 0 }}>
                        {expanded[hotel.id] ? hotel.description : truncatedText}
                      </p>
                    </div>
                    {isTruncated && (
                      <button onClick={() => toggleReadMore(hotel.id)} className="btn btn-link p-0">
                        {expanded[hotel.id] ? "See less" : "Read more"}
                      </button>
                    )}
                    <div className="d-flex justify-content-between mt-2">
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
            );
          })}
        </div>
      </ul>
    </div>
  );
};

export default HotelsPage;
