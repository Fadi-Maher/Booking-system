"use client"

import { Form, Spinner } from "react-bootstrap";
import styles from "./Search.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
	startAt,
	endAt,
	orderBy
} from "firebase/firestore";
import { db } from "@/app/firebase";

const dummyHotels = [
    {id: 1, name: "hotel 1"},
    {id: 2, name: "hotel 2"},
    {id: 3, name: "hotel 3"},
    {id: 4, name: "hotel 4"},
    {id: 5, name: "hotel 5"},
    {id: 6, name: "hotel 6"},
    {id: 7, name: "hotel 7"},
]

const DropDownComponent = ({ hotels, loading }) => {
	const renderHotelsList = () => {
		if (loading) {
			return <Spinner animation="border" variant="dark" />
		}

		if (hotels.length === 0) {
			return <div className="fw-bold text-dark">No hotels available</div>
		}

		return <ul>
			{hotels.map((hotel) => <li key={Math.random()}>
					<Link href={`/hotels/${hotel.id}`}>{hotel.name}</Link>
			</li>)}
		</ul>
	}

	return (<div className={`${styles["dropdown-container"]} ${loading || hotels.length === 0 ? "d-flex justify-content-center align-items-center" : ""}`}>
		{renderHotelsList()}
	</div>)
}

const Search = () => {
	// states
	const [searchKeyword, setSearchKeyword] = useState("");
	const [filteredHotels, setFilteredHotels] = useState([]);
	const [loading, setLoading] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	useEffect(() => {
		// cleanup function
		setLoading(true);
		const debounceFn = setTimeout(() => {
			if (searchKeyword.length > 0) {
				fetchHotels();
			}
		}, 1000)
		
		return () => clearTimeout(debounceFn);
	}, [searchKeyword])

	useEffect(() => {
		if (searchKeyword.length > 0) setDropdownOpen(true)
		else setDropdownOpen(false)
	}, [searchKeyword])

	const fetchHotels = async () => {
    const hotelsRef = collection(db, "hotels");
    const q = query(
			hotelsRef, 
			orderBy("name"), 
			startAt(searchKeyword), 
			startAt(searchKeyword.toLowerCase()), 
			startAt(searchKeyword.toUpperCase()), 
			endAt(searchKeyword + '\uf8ff'),
			endAt(searchKeyword.toLowerCase() + '\uf8ff'),
			endAt(searchKeyword.toUpperCase() + '\uf8ff')
		);
    const querySnapshot = await getDocs(q);
    setFilteredHotels(querySnapshot.docs.map((doc) => {
			return {...doc.data(), id: doc.id}
		}));
		setLoading(false);
  };

  return (
    <div className={styles["input-container"]}>
        <Form.Control type="text" placeholder="Search hotels..." className={styles.input} onChange={(e) => setSearchKeyword(e.target.value)} />
				{dropdownOpen && <DropDownComponent hotels={filteredHotels} loading={loading} />}
    </div>
  )
}

export default Search