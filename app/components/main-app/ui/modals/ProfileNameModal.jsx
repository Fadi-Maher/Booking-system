import { db } from "@/app/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProfileNameModal({ modalTitle, currentUser }) {
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const checkUsernameExists = async (username) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const updateName = async (data) => {
    try {
      const usernameExists = await checkUsernameExists(data.newName);
      if (usernameExists) {
        toast.error(
          "Username is already taken. Please choose a different one."
        );
        return;
      }
      const docRef = doc(db, "users", currentUser.uid);
      await updateDoc(docRef, {
        username: data.newName,
      });
      handleClose();
      toast.success("Name updated successfully!");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <button className="btn p-0" onClick={handleShow}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="1rem"
        >
          <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
        </svg>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}:</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(updateName)}>
          <Modal.Body>
            <div>
              <input
                {...register("newName", {
                  required: "Name is required!",
                  minLength: {
                    value: 3,
                    message: "Name must contain 3 or more characters!",
                  },
                })}
                onKeyUp={() => {
                  trigger("newName");
                }}
                defaultValue=""
                type="text"
                className="form-control input-shadow"
              />
              {errors.newName && (
                <small className="text-danger">{errors.newName.message}</small>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="secondary-btn"
              style={{ width: "16%" }}
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="primary-btn"
              style={{ width: "16%" }}
            >
              Update
            </button>
          </Modal.Footer>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default ProfileNameModal;
