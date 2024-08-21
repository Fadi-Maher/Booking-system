import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./modal.module.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { db } from "@/app/firebase";
import { deleteDoc, doc } from "firebase/firestore";

function ProfileDeleteModal({ modalTitle, currentUser }) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteAccount = async () => {
    try {
      await deleteDoc(doc(db, "users", currentUser.uid));
      await currentUser.delete();

      handleClose();
      toast.success("Account deleted successfully!");
      router.push("/");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <button className={styles.deleteBtn} onClick={handleShow}>
        Delete Account
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}:</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure?</Modal.Body>
        <Modal.Footer>
          <button className={styles.cancelBtn} onClick={handleClose}>
            No
          </button>
          <button
            className={styles.deleteBtn}
            style={{ width: "3.5rem" }}
            type="submit"
            onClick={handleDeleteAccount}
          >
            Yes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfileDeleteModal;
