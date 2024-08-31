"use client";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
 

const initialState = {
  name: "",
  image: "",
  price: "",
  description: "",
  details: "",
  location: "",
  Highlights: [],
  images: [],
  reviews: [],
  Amenities: {
    "Cleaning Services": "",
    "Food & Drink": "",
    "Popular Amenities": [],
    Transportation: [],
  },
};

const HotelForm = () => {
  const router = useRouter(); // Initialize the useRouter hook

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
  });

  console.log(errors);

  const formSubmitHandler = async (data) => {
    const { name, image, price, description, details, location } = data;

    if (!name || !image || !price || !description || !location || !details) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "hotels"), {
        name,
        image,
        price: parseFloat(price),
        description,
        details,
        location,
        createdAt: new Date(),
      });

      alert("Hotel added successfully!");

      router.push('/admin/hotels'); // Navigate to the hotels list page

    } catch (error) {
      console.error("Error adding hotel: ", error);
      alert("Error adding hotel. Please try again.");
    }
  };

  return (
    <Form onSubmit={handleSubmit(formSubmitHandler)}>
      {/* Name */}
      <Form.Group className="mb-3">
        <Form.Label>Hotel Name</Form.Label>
        <Controller
          control={control}
          rules={{ required: "This field is required" }}
          name="name"
          render={({ field }) => (
            <Form.Control
              size="md"
              type="text"
              placeholder="Enter hotel name"
              isInvalid={!!errors.name}
              {...field}
            />
          )}
        />
        <Form.Control.Feedback type="invalid">
          {errors?.name?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Description */}
      <Form.Group className="mb-3">
        <Form.Label>Hotel Description</Form.Label>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <Form.Control
              rules={{ required: "This field is required" }}
              as={"textarea"}
              rows={5}
              size="md"
              type="text"
              placeholder="Enter hotel description"
              isInvalid={errors.description}
              {...field}
            />
          )}
        />

        <Form.Control.Feedback type="invalid">
          {errors?.description?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Location */}
      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Controller
          control={control}
          rules={{ required: "This field is required" }}
          name="location"
          render={({ field }) => (
            <Form.Control
              size="md"
              type="text"
              placeholder="Enter hotel location"
              isInvalid={errors.location}
              {...field}
            />
          )}
        />
        <Form.Control.Feedback type="invalid">
          {errors?.location?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Image */}
      <Form.Group className="mb-3">
        <Form.Label>Image</Form.Label>
        <Controller
          control={control}
          rules={{ required: "This field is required" }}
          name="image"
          render={({ field }) => (
            <Form.Control
              size="md"
              type="text"
              placeholder="Image Url"
              isInvalid={errors.image}
              {...field}
            />
          )}
        />
        <Form.Control.Feedback type="invalid">
          {errors?.image?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Price*/}
      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Controller
          control={control}
          rules={{ required: "This field is required" }}
          name="price"
          render={({ field }) => (
            <Form.Control
              size="md"
              type="text"
              placeholder="Enter hotel price"
              isInvalid={errors.price}
              {...field}
            />
          )}
        />
        <Form.Control.Feedback type="invalid">
          {errors?.price?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Details */}
      <Form.Group className="mb-3">
        <Form.Label>Hotel Details</Form.Label>
        <Controller
          control={control}
          rules={{ required: "This field is required" }}
          name="details"
          render={({ field }) => (
            <Form.Control
              size="md"
              type="text"
              placeholder="Enter hotel details"
              isInvalid={errors.details}
              {...field}
            />
          )}
        />
        <Form.Control.Feedback type="invalid">
          {errors?.details?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default HotelForm;
