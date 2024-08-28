"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Handle any post-payment actions like updating booking status
  }, []);

  return (
    <div className="success-page">
      <h1>Payment Successful</h1>
      <p>Thank you for your booking!</p>
      <button onClick={() => router.push("/")} className="primary-btn">
        Go to Home
      </button>
    </div>
  );
};

export default SuccessPage;
