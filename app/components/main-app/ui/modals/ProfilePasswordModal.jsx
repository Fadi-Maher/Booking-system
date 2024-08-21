import { updatePassword } from "firebase/auth";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import styles from "./modal.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProfilePasswordModal({ modalTitle, currentUser }) {
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdatePassword = async (data) => {
    try {
      updatePassword(currentUser, data.newPassword);
      handleClose();
      toast.success("Password updated successfully!");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <button className={styles.updatePassBtn} onClick={handleShow}>
        Update Password
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}:</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(handleUpdatePassword)}>
          <Modal.Body>
            <div>
              <input
                {...register("newPassword", {
                  required: "You must specify a password!",
                  pattern: {
                    value:
                      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                    message:
                      "Password must contain at least one number, one special character and one uppercase character!",
                  },
                  minLength: {
                    value: 8,
                    message: "Password must be more than 8 characters!",
                  },
                  maxLength: {
                    value: 17,
                    message: "Password must be less than 17 characters!",
                  },
                })}
                onKeyUp={() => {
                  trigger("newPassword");
                }}
                type="password"
                className="form-control input-shadow"
              />
              {errors.newPassword && (
                <small className="text-danger">
                  {errors.newPassword.message}
                </small>
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
    </>
  );
}

export default ProfilePasswordModal;
