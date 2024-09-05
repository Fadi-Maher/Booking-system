//api/getHotels/[hotelId]/rooms/[roomId]/bookings
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

// import { NextResponse } from "next/server";
// import { getDocs, collection, addDoc } from "firebase/firestore";
// import { db } from "@/app/firebase";

// export async function POST(request, { params }) {
//   try {
//     const { hotelId, roomId } = params;
//     const bookingData = await request.json();
//     const { startDate, DepartureDate } = bookingData;

//     // Convert startDate and DepartureDate to Date objects
//     const newStartDate = new Date(startDate);
//     const newDepartureDate = new Date(DepartureDate);
//     const currentDate = new Date();

//     //  dates not empty
//     if (!startDate || !DepartureDate) {
//       return NextResponse.json({ message: "Invalid date: Start date and end date are required." });
//     }

//     // dates are not in the past
//     if (newStartDate < currentDate || newDepartureDate < currentDate) {
//       return NextResponse.json({ message: "Invalid date: Start date and end date must be in the future." });
//     }

//     //end date is after the start date
//     if (newDepartureDate < newStartDate) {
//       return NextResponse.json({ message: "Invalid date: End date must be after the start date." });
//     }

//     const bookingsCollection = collection(db, `hotels/${hotelId}/rooms/${roomId}/bookings`);
//     const existingBookingsSnapshot = await getDocs(bookingsCollection);

//     //if the room is available
//     const isRoomAvailable = !existingBookingsSnapshot.docs.some(doc => {
//       const booking = doc.data();
//       const existingStartDate = new Date(booking.startDate);
//       const existingDepartureDate = new Date(booking.DepartureDate);

//       // console.log({
//       //   newStartDate,
//       //   newDepartureDate,
//       //   existingStartDate,
//       //   existingDepartureDate,
//       //   condition1: newStartDate <= existingDepartureDate,
//       //   condition2: newDepartureDate >= existingStartDate,
//       //   overlap: (newStartDate <= existingDepartureDate) && (newDepartureDate >= existingStartDate)
//       // });

//       return (
//         newStartDate <= existingDepartureDate && newDepartureDate >= existingStartDate
//       );
//     });

//     if (!isRoomAvailable) {
//       return NextResponse.json({ message: "Room is not available for the selected dates" });
//     }

//     await addDoc(bookingsCollection, bookingData);

//     return NextResponse.json({ message: "Booking successful" });
//   } catch (error) {
//     return NextResponse.json({ message: "Failed to book the room", error: error.message });
//   }
// }
