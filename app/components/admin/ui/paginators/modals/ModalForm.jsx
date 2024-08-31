"use client";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

const ModalForm = props => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const addHotels = async () => {
    if (!name || !image || !price || !description || !location) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "hotels"), {
        name,
        description,
        location,
        price: parseFloat(price),
        image,
      });

      setName("");
      setPrice("");
      setImage("");
      setDescription("");
      setLocation("");

      props.close();
    } catch (error) {
      console.error("Error adding hotel: ", error);
    }
  };

  return (
    <div>
      <Modal show={props.show} onHide={props.close} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Hotel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="hotelName">
              <Form.Label>Hotel Name</Form.Label>
              <Form.Control
                size="md"
                type="text"
                placeholder="Enter hotel name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="hotelName">
              <Form.Label>Hotel Name</Form.Label>
              <Form.Control
                size="md"
                type="text"
                placeholder="Enter hotel name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="hotelName">
              <Form.Label>Description</Form.Label>
              <Form.Control
                size="md"
                type="text"
                placeholder="Enter hotel description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="hotelName">
              <Form.Label>Location</Form.Label>
              <Form.Control
                size="md"
                type="text"
                placeholder="Enter hotel location"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="hotelImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                size="md"
                type="text"
                placeholder="Enter image URL"
                value={image}
                onChange={e => setImage(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="hotelPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                size="md"
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            Close
          </Button>
          <Button variant="primary" onClick={addHotels}>
            Add Hotel
          </Button>
        </Modal.Footer>
      </Modal>
     </div>
  );
};

export default ModalForm;
