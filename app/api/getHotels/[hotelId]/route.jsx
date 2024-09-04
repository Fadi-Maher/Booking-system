import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

export async function GET(request, { params }) {
  const { hotelId } = params;
  
  try {
    const docRef = doc(db, "hotels", hotelId); // Correct reference to a document
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = {
        id: docSnap.id,
        ...docSnap.data(),
      };
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ message: "Hotel not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
  }
}
