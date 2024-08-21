import { NextResponse } from "next/server";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

export async function POST(request, { params }) {
  try {
    const { hotelId, roomId } = params;
    const bookingData = await request.json();
    const { startDate, endDate } = bookingData;

    const bookingsCollection = collection(db, `hotels/${hotelId}/rooms/${roomId}/bookings`);

 
    const existingBookingsSnapshot = await getDocs(bookingsCollection);


    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);

   
    const isRoomAvailable = !existingBookingsSnapshot.docs.some(doc => {
      const booking = doc.data();
      const existingStartDate = new Date(booking.startDate);
      const existingEndDate = new Date(booking.endDate);

      // Log for debugging
      console.log({
        newStartDate,
        newEndDate,
        existingStartDate,
        existingEndDate,
        condition1: newStartDate <= existingEndDate,
        condition2: newEndDate >= existingStartDate,
        overlap: (newStartDate <= existingEndDate) && (newEndDate >= existingStartDate)
      });

      return (
        newStartDate <= existingEndDate && newEndDate >= existingStartDate
      );
    });

    if (!isRoomAvailable) {
      return NextResponse.json({ message: "Room is not available for the selected dates" }, { status: 500 });
    }


    await addDoc(bookingsCollection, bookingData);

    return NextResponse.json({ message: "Booking successful" });
  } catch (error) {
    return NextResponse.json({ message: "Room is not available for the selected dates", error: error.message });
  }
}
