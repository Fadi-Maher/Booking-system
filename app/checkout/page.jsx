"use client";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";
import { Spinner } from "react-bootstrap"; // Add Bootstrap spinner
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const storedBookingData = localStorage.getItem("bookingData");
    if (storedBookingData) {
      setBookingData(JSON.parse(storedBookingData));
    } else {
      router.push("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: bookingData.roomPrice * 100 }),
    });

    const { clientSecret, sessionId } = await response.json();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    setLoading(false);

    if (result.error) {
      setError(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        await storeBookingDataToFirestore(sessionId);
        localStorage.removeItem("bookingData");
        toast.success("Reservation successful! Redirecting...");
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    }
  };

  const storeBookingDataToFirestore = async (sessionId) => {
    const response = await fetch("/api/store-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...bookingData, sessionId }),
    });

    if (!response.ok) {
      console.error("Failed to store booking data");
    }
  };

  return (
    <div
      className="card shadow-lg p-4"
      style={{ borderRadius: "15px", border: "none" }}
    >
      <h4 className="mb-3 text-center" style={{ color: "#343a40" }}>
        Payment Information
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label className="form-label" style={{ color: "#6c757d" }}>
            Card Details
          </label>
          <div
            className="card-element p-2 border rounded bg-light"
            style={{ borderRadius: "10px" }}
          >
            <CardElement />
          </div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button
          className={`btn mb-4 w-100 mt-4 text-light btn-lg ${styles.btnBg}`}
          type="submit"
          disabled={!stripe || loading}
          style={{
            background: "linear-gradient(90deg, #e9a159, #d28b4c, #b87643)",
            border: "none",
            borderRadius: "10px",
          }}
        >
          {loading ? <Spinner animation="border" size="sm" /> : "Check Out"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

const CheckOut = () => (
  <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="text-center mb-4">
          <h2 className="mb-3" style={{ fontWeight: "bold", color: "#343a40" }}>
            Checkout
          </h2>
          <p className="text-muted">
            Please enter your payment details below to complete your booking.
          </p>
        </div>
        <Elements stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      </div>
    </div>
  </div>
);

export default CheckOut;
