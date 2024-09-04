import { NextResponse } from "next/server";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

export async function GET(request, { params }) {
  try {
    const { hotelId, roomId } = params;

    const roomRef = doc(db, `hotels/${hotelId}/rooms/${roomId}`);

    const roomDoc = await getDoc(roomRef);

    if (roomDoc.exists()) {

      const roomData = {
        id: roomDoc.id,
        ...roomDoc.data(),
      };
      return NextResponse.json(roomData);
    } else {
      // If the document does not exist, return an appropriate response
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
