"use client";

import { Form, Spinner } from "react-bootstrap";
import styles from "./Search.module.css";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/app/firebase";
import { Audio } from 'react-loader-spinner'

const DropDownComponent = ({ hotels, loading }) => {
  const renderHotelsList = () => {
    if (loading) {
      <Audio
  height="80"
  width="80"
  radius="9"
  color="green"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>;
    }

    if (hotels.length === 0) {
      return <div className="fw-bold text-dark">No hotels available</div>;
    }

    return (
      <ul>
        {hotels.map((hotel) => (
          <li key={hotel.id}>
            <Link href={`/hotels/${hotel.id}`}>{hotel.name}</Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={`${styles["dropdown-container"]} ${loading || hotels.length === 0 ? "d-flex justify-content-center align-items-center" : ""}`}>
      {renderHotelsList()}
    </div>
  );
};

const Search = () => {
  // states
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const hotelsRef = collection(db, "hotels");
        const q = query(hotelsRef, orderBy("name"));
        const querySnapshot = await getDocs(q);
        const allHotels = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        if (searchKeyword.length > 0) {
          const keywordLower = searchKeyword.toLowerCase();
          const filtered = allHotels.filter(hotel => 
            hotel.name.toLowerCase().includes(keywordLower)
          );
          setFilteredHotels(filtered);
        } else {
          setFilteredHotels(allHotels);
        }
      } catch (error) {
        console.error("Error fetching hotels: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [searchKeyword]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchKeyword.length > 0) {
      setDropdownOpen(true);
    } else {
      setDropdownOpen(false);
    }
  }, [searchKeyword]);

  return (
    <div className={styles["input-container"]} ref={searchRef}>
      <Form.Control
        type="text"
        placeholder="Search hotels..."
        className={styles.input}
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onFocus={() => setDropdownOpen(true)}
      />
      {dropdownOpen && <DropDownComponent hotels={filteredHotels} loading={loading} />}
    </div>
  );
};

export default Search;
