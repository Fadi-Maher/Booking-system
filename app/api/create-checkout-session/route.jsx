import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Replace with your Stripe secret key

export async function POST(request) {
  try {
    const { bookingId } = await request.json();

    // You should retrieve booking details from your database based on the bookingId
    const bookingDetails = { 
      price: 1000, // Replace with the actual price from your booking details in cents
      currency: 'usd', // Replace with the actual currency
    };

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: bookingDetails.price,
      currency: bookingDetails.currency,
      payment_method_types: ['card'],
      metadata: { bookingId }, // Optional: Add metadata like booking ID
    });

    // Return the client_secret to the frontend
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating PaymentIntent:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
