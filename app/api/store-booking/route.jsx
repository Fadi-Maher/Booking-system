import { NextResponse } from "next/server";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

export async function POST(request, { params }) {
  try {
    const { hotelId, roomId } = params;
    const bookingData = await request.json();
    const { arrivalDate, departureDate } = bookingData;

    const bookingsCollection = collection(
      db,
      `hotels/${hotelId}/rooms/${roomId}/bookings`
    );

    const existingBookingsSnapshot = await getDocs(bookingsCollection);

    const newArrivalDate = new Date(arrivalDate);
    const newDepartureDate = new Date(departureDate);

    const isRoomAvailable = !existingBookingsSnapshot.docs.some(doc => {
      const booking = doc.data();
      const existingArrivalDate = new Date(booking.arrivalDate);
      const existingDepartureDate = new Date(booking.departureDate);

      // Log for debugging
      console.log({
        newArrivalDate,
        newDepartureDate,
        existingArrivalDate,
        existingDepartureDate,
        condition1: newArrivalDate <= existingDepartureDate,
        condition2: newDepartureDate >= existingArrivalDate,
        overlap:
          newArrivalDate <= existingDepartureDate &&
          newDepartureDate >= existingArrivalDate,
      });

      return (
        newArrivalDate <= existingDepartureDate &&
        newDepartureDate >= existingArrivalDate
      );
    });

    if (!isRoomAvailable) {
      return NextResponse.json(
        { message: "Room is not available for the selected dates" },
        { status: 409 }
      );
    }

    await addDoc(bookingsCollection, bookingData);

    return NextResponse.json({ message: "Booking successful" });
  } catch (error) {
    return NextResponse.json({
      message: "Room is not available for the selected dates",
      error: error.message,
    });
  }
}
