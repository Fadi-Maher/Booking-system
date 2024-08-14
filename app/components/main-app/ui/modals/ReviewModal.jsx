import { db } from "@/app/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import StarRating from "@/app/components/main-app/pages/reviews/StarRating";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ReviewModal({ hotelId, userDetails, handleReviewAdded }) {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addReview = async (data) => {
    try {
      const docRef = doc(db, "hotels", hotelId);
      const hotelSnapshot = await getDoc(docRef);
      const existingReviews = hotelSnapshot.data().reviews;

      const existingReviewIndex = existingReviews.findIndex(
        (review) => review.name === userDetails.username
      );

      if (existingReviewIndex !== -1) {
        existingReviews[existingReviewIndex] = {
          ...existingReviews[existingReviewIndex],
          comment: data.userReview,
          rating: rating,
        };
      } else {
        existingReviews.push({
          name: userDetails.username,
          comment: data.userReview,
          rating: rating,
        });
      }

      await updateDoc(docRef, {
        reviews: existingReviews,
      });

      handleReviewAdded();
      handleClose();
      toast.success("Review Submitted Successfully!");
    } catch (error) {
      console.log(error.message);
      toast.error("Something Went Wrong While Submitting Your Review");
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        disabled={userDetails ? false : true}
      >
        Leave a Review
      </Button>
      {!userDetails && (
        <small className="text-danger mb-4 mt-n2">
          {" "}
          You must be{" "}
          <Link href="/login" className="text-primary">
            Signed in
          </Link>{" "}
          to be able to leave a review.
        </small>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <div>
            <span>Your Rating:</span>
            <StarRating rating={rating} setRating={setRating} />
            {rating === 0 && (
              <small className="text-danger mb-4 mt-n2">
                Rating us is required!
              </small>
            )}
          </div>
        </Modal.Header>
        <form onSubmit={handleSubmit(addReview)}>
          <Modal.Body>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Your Thoughts:
              </label>
              <textarea
                {...register("userReview", {
                  required: "This field is required!",
                  minLength: {
                    value: 10,
                    message:
                      "You must provide a review of 10 characters at least.",
                  },
                  maxLength: {
                    value: 100,
                    message: "Maximum number of characters is reached.",
                  },
                })}
                onKeyUp={() => {
                  trigger("userReview");
                }}
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
              {errors.userReview && (
                <small className="text-danger mb-4 mt-n2">
                  {errors.userReview.message}
                </small>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={rating === 0 ? true : false}
            >
              Send Review
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default ReviewModal;
