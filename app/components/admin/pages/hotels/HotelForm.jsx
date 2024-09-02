"use client";
import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

const initialState = {
  name: "",
  image: "",
  price: "",
  description: "",
  details: "",
  location: "",
  Highlights: [""],
  images: [""],
  reviews: [""],
  Amenities: {
    "Cleaning Services": "",
    "Food & Drink": "",
    "Popular Amenities": [""],
    Transportation: [""],
  },
};

const HotelForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hotelId = searchParams.get("id");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
  });

  const { fields: highlightFields, append: appendHighlight } = useFieldArray({
    control,
    name: "Highlights",
  });

  const { fields: imageFields, append: appendImage } = useFieldArray({
    control,
    name: "images",
  });

  const { fields: reviewFields, append: appendReview } = useFieldArray({
    control,
    name: "reviews",
  });

  const { fields: popularAmenitiesFields, append: appendPopularAmenity } =
    useFieldArray({
      control,
      name: "Amenities.Popular Amenities",
    });

  const { fields: transportationFields, append: appendTransportation } =
    useFieldArray({
      control,
      name: "Amenities.Transportation",
    });

  useEffect(() => {
    if (hotelId) {
      const fetchHotelData = async () => {
        const docRef = doc(db, "hotels", hotelId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          reset(docSnap.data());
        } else {
          console.error("No such document!");
        }
      };
      fetchHotelData();
    }
  }, [hotelId, reset]);

  const formSubmitHandler = async data => {
    try {
      if (hotelId) {
        const docRef = doc(db, "hotels", hotelId);
        await updateDoc(docRef, {
          ...data,
          price: parseFloat(data.price),
          updatedAt: new Date(),
        });
        alert("Hotel updated successfully!");
      } else {
        console.error("No hotel ID provided.");
      }
      router.push("/admin/hotels");
    } catch (error) {
      console.error("Error updating hotel: ", error);
      alert("Error updating hotel. Please try again.");
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
          rules={{ required: "This field is required" }}
          name="description"
          render={({ field }) => (
            <Form.Control
              as="textarea"
              rows={5}
              size="md"
              placeholder="Enter hotel description"
              isInvalid={!!errors.description}
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
              isInvalid={!!errors.location}
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
              isInvalid={!!errors.image}
              {...field}
            />
          )}
        />
        <Form.Control.Feedback type="invalid">
          {errors?.image?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Price */}
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
              isInvalid={!!errors.price}
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
              isInvalid={!!errors.details}
              {...field}
            />
          )}
        />
        <Form.Control.Feedback type="invalid">
          {errors?.details?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Highlights */}
      <Form.Group className="mb-3">
        <Form.Label>Highlights</Form.Label>
        {highlightFields.map((field, index) => (
          <Controller
            key={field.id}
            control={control}
            rules={{ required: "This field is required" }}
            name={`Highlights.${index}`}
            render={({ field }) => (
              <Form.Control
                size="md"
                type="text"
                placeholder="Enter a highlight"
                className="mb-2"
                isInvalid={!!errors.Highlights?.[index]}
                {...field}
              />
            )}
          />
        ))}
        <Button variant="secondary" onClick={() => appendHighlight("")}>
          Add Highlight
        </Button>
        {errors.Highlights && (
          <p className="text-danger">Highlights are required.</p>
        )}
      </Form.Group>

      {/* Images */}
      <Form.Group className="mb-3">
        <Form.Label>Images</Form.Label>
        {imageFields.map((field, index) => (
          <Controller
            key={field.id}
            control={control}
            rules={{ required: "This field is required" }}
            name={`images.${index}`}
            render={({ field }) => (
              <Form.Control
                size="md"
                type="text"
                placeholder="Enter an image URL"
                className="mb-2"
                isInvalid={!!errors.images?.[index]}
                {...field}
              />
            )}
          />
        ))}
        <Button variant="secondary" onClick={() => appendImage("")}>
          Add Image
        </Button>
        {errors.images && <p className="text-danger">Images are required.</p>}
      </Form.Group>

      {/* Reviews */}
      <Form.Group className="mb-3">
        <Form.Label>Reviews</Form.Label>
        {reviewFields.map((field, index) => (
          <Controller
            key={field.id}
            control={control}
            rules={{ required: "This field is required" }}
            name={`reviews.${index}`}
            render={({ field }) => (
              <Form.Control
                size="md"
                type="text"
                placeholder="Enter a review"
                className="mb-2"
                isInvalid={!!errors.reviews?.[index]}
                {...field}
              />
            )}
          />
        ))}
        <Button variant="secondary" onClick={() => appendReview("")}>
          Add Review
        </Button>
        {errors.reviews && <p className="text-danger">Reviews are required.</p>}
      </Form.Group>

      {/* Amenities - Cleaning Services */}
      <Form.Group className="mb-3">
        <Form.Label>Cleaning Services</Form.Label>
        <Controller
          control={control}
          rules={{ required: "This field is required" }}
          name="Amenities.Cleaning Services"
          render={({ field }) => (
            <Form.Control
              size="md"
              type="text"
              placeholder="Enter Cleaning Services"
              isInvalid={!!errors.Amenities?.["Cleaning Services"]}
              {...field}
            />
          )}
        />
        <Form.Control.Feedback type="invalid">
          {errors?.Amenities?.["Cleaning Services"]?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Amenities - Food & Drink */}
      <Form.Group className="mb-3">
        <Form.Label>Food & Drink</Form.Label>
        <Controller
          control={control}
          rules={{ required: "This field is required" }}
          name="Amenities.Food & Drink"
          render={({ field }) => (
            <Form.Control
              size="md"
              type="text"
              placeholder="Enter Food & Drink"
              isInvalid={!!errors.Amenities?.["Food & Drink"]}
              {...field}
            />
          )}
        />
        <Form.Control.Feedback type="invalid">
          {errors?.Amenities?.["Food & Drink"]?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Amenities - Popular Amenities */}
      <Form.Group className="mb-3">
        <Form.Label>Popular Amenities</Form.Label>
        {popularAmenitiesFields.map((field, index) => (
          <Controller
            key={field.id}
            control={control}
            rules={{ required: "This field is required" }}
            name={`Amenities.Popular Amenities.${index}`}
            render={({ field }) => (
              <Form.Control
                size="md"
                type="text"
                placeholder="Enter Popular Amenity"
                className="mb-2"
                isInvalid={!!errors.Amenities?.["Popular Amenities"]?.[index]}
                {...field}
              />
            )}
          />
        ))}
        <Button variant="secondary" onClick={() => appendPopularAmenity("")}>
          Add Popular Amenity
        </Button>
        {errors.Amenities?.["Popular Amenities"] && (
          <p className="text-danger">Popular Amenities are required.</p>
        )}
      </Form.Group>

      {/* Amenities - Transportation */}
      <Form.Group className="mb-3">
        <Form.Label>Transportation</Form.Label>
        {transportationFields.map((field, index) => (
          <Controller
            key={field.id}
            control={control}
            rules={{ required: "This field is required" }}
            name={`Amenities.Transportation.${index}`}
            render={({ field }) => (
              <Form.Control
                size="md"
                type="text"
                placeholder="Enter Transportation option"
                className="mb-2"
                isInvalid={!!errors.Amenities?.["Transportation"]?.[index]}
                {...field}
              />
            )}
          />
        ))}
        <Button variant="secondary" onClick={() => appendTransportation("")}>
          Add Transportation
        </Button>
        {errors.Amenities?.["Transportation"] && (
          <p className="text-danger">Transportation options are required.</p>
        )}
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default HotelForm;
