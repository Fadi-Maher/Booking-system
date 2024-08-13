import { db } from "@/app/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";

function ReviewModal({ hotelId, userDetails }) {
  const [show, setShow] = useState(false);

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
      await updateDoc(docRef, {
        reviews: arrayUnion({
          name: userDetails.username,
          comment: data.userReview,
        }),
      });

      handleClose();
    } catch (error) {
      console.log(error.message);
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
          You must be{" "}
          <Link href="/login" className="text-primary">
            Signed in
          </Link>{" "}
          to be able to leave a review.
        </small>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Review:</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(addReview)}>
          <Modal.Body>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Your thoughts:
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
            <Button type="submit" variant="primary">
              Send Review
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default ReviewModal;
