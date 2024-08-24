"use client";

import React from "react";
import styles from "./Popup.module.css"; 
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; 

const Popup = ({ message, type, onClose }) => {
  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={`${styles.popupContent} ${type === "success" ? styles.success : styles.error}`}>
        <span className={`${styles.icon} ${type === "success" ? styles.successAnimation : styles.errorAnimation}`}>
          {type === "success" ? (
            <FaCheckCircle style={{ color: "#4caf50", fontSize: "40px" }} />
          ) : (
            <FaTimesCircle style={{ color: "#f44336", fontSize: "40px" }} />
          )}
        </span>
        <p>{message}</p>
        <button onClick={onClose} className="primary-btn" style={{ border: "none" }}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
