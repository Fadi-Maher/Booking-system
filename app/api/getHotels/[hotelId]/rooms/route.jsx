// app/api/hotels/[hotelId]/rooms/route.js
import { NextResponse } from "next/server";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";

export async function GET(request, { params }) {
  try {
    const { hotelId } = params; 

    
    const roomsSnapshot = await getDocs(collection(db, `hotels/${hotelId}/rooms`));
    
    const roomsData = roomsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(roomsData);
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" });
  }
}
