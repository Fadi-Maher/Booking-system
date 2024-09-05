// app/api/store-booking/route.js

import { NextResponse } from 'next/server';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';

export async function POST(request) {
  try {
    const bookingData = await request.json();
    const { hotelId, roomId, userId, sessionId, roomPrice } = bookingData;

    const bookingRef = collection(db, `hotels/${hotelId}/rooms/${roomId}/bookings`);
    const paymentRef = collection(db, 'payments');

    await addDoc(bookingRef, {
      ...bookingData,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    });

    await addDoc(paymentRef, {
      roomId,
      hotelId,
      userId,
      sessionId,
      roomPrice,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: 'Booking stored successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
