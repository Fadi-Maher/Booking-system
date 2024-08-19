import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Style from "./Modal.module.css";
import { Button } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/firebase"; // Ensure correct import path

const ModalForm = ({ show, close }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");

  if (!show) return null;

  const addHotels = async () => {
    if (!name || !imageUrl || !price) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Add hotel data to Firestore
      await addDoc(collection(db, "hotels"), {
        name,
        price: parseFloat(price), // Ensure price is stored as a number
        imageUrl, // Use the image URL directly
      });

      // Reset form state
      setName("");
      setPrice("");
      setImageUrl("");

      // Close the modal after submission
      close();
    } catch (error) {
      console.error("Error adding hotel: ", error);
    }
  };

  return (
    <div className={`${Style.modal}`}>
      <div className="justify-content-center p-4 w-50 bg-secondary position-fixed">
        <h2 className="text-center text-white">Add New Hotel</h2>
        <Form.Control
          size="md"
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <br />
        <Form.Control
          size="md"
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />
        <br />
        <Form.Control
          size="md"
          type="number"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <br />
        <Button variant="primary" className="btn btn-warning" onClick={close}>
          Close
        </Button>{" "}
        <Button
          variant="primary"
          className="btn btn-success"
          onClick={addHotels}
        >
          Add
        </Button>{" "}
      </div>
    </div>
  );
};

export default ModalForm;
