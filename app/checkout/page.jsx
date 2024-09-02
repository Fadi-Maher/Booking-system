//app/checkout/page.jsx

'use client';
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    // Retrieve booking data from local storage
    const storedBookingData = localStorage.getItem('bookingData');
    if (storedBookingData) {
      setBookingData(JSON.parse(storedBookingData));
    } else {
      router.push('/'); // Redirect to home if no booking data
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create a payment intent on the server
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: bookingData.roomPrice * 100 }), // amount in cents
    });

    const { clientSecret, sessionId } = await response.json();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        // billing_details: {
        //   name: currentUser.displayName, // Retrieve name from user context or booking data
        // },
      },
    });

    setLoading(false);

    if (result.error) {
      setError(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        // Store booking data to Firestore
        await storeBookingDataToFirestore(sessionId);
        // Clear local storage after successful booking
        localStorage.removeItem('bookingData');
        router.push('/'); // Redirect to a confirmation page
      }
    }
  };

  const storeBookingDataToFirestore = async (sessionId) => {
    const response = await fetch('/api/store-booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...bookingData, sessionId }),
    });

    if (!response.ok) {
      console.error('Failed to store booking data');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div>{error}</div>}
      <button
        className={`btn mb-4 w-100 mt-4 text-light btn-lg ${styles.btnBg}`}
        type="submit"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : "Check Out"}
      </button>
    </form>
  );
};

const CheckOut = () => (
  <div className="container mt-4">
    <h2>Checkout</h2>
    <Elements stripe={stripePromise}>
      <CheckOutForm />
    </Elements>
  </div>
);

export default CheckOut;
