"use client";
import { useRouter } from "next/navigation";
import React from "react";

const CancelPage = () => {
  const router = useRouter();

  return (
    <div className="cancel-page">
      <h1>Payment Cancelled</h1>
      <p>Your payment was cancelled. Please try again.</p>
      <button onClick={() => router.push("/")} className="primary-btn">
        Go to Home
      </button>
    </div>
  );
};

export default CancelPage;
