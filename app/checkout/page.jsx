'use client'
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "../page.module.css";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Call backend to create a payment intent
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 100 }), // replace 100 with your amount logic
    });

    const { clientSecret } = await response.json();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Your Customer's Name", // You can get this from your form
        },
      },
    });

    setLoading(false);

    if (result.error) {
      setError(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        // 
        
      }
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
