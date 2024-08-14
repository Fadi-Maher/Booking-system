"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { Container, Spinner } from "react-bootstrap";

const HotelDetails = () => {
	const { hotelId } = useParams();
	const router = useRouter();

	// states
	const [hotel, setHotel] = useState();
	const [isLoading, setIsLoading] = useState(true);

  	const images = Array.isArray(hotel?.images) ? hotel.images : [];

	const fetchHotelData = () => {
		setIsLoading(true);
		const docRef = doc(db, "hotels", hotelId);
		getDoc(docRef)
		.then((docSnap) => {
			setHotel(docSnap.data());
		})
		.catch((err) => {
			console.log(err);
		}).finally(() => setIsLoading(false));
  	};

	useEffect(() => {
		fetchHotelData();
	}, [])

  return (
    isLoading ? <div className="d-flex justify-content-center align-items-center py-5"><Spinner animation="border" variant="dark" /></div> : 
		<Container className="py-5">
			<div className="modal-container">
				<div className="card" style={{  width: '20%' }}>
					<div className="d-flex gap-3">
						{images.map((img, index) => (
							<img
								key={index}
								src={img}
								className="img-thumbnail"
								alt={`Room ${index + 1}`}
							/>
						))}
					</div>
				</div>
				<h2 className="card-text text-center">{hotel?.details ? hotel?.details : "N/A"}</h2>
				{/*  Link to the Rooms Page */}
				<div className="d-flex justify-content-center">
					<button className="btn btn-primary" onClick={() => router.push(`/hotels/${hotelId}/rooms`)}>View Rooms</button>
				</div>
			</div>
		</Container>
  );
};

export default HotelDetails;
