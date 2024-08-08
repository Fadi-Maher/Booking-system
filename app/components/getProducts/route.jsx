
import { NextResponse } from 'next/server';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '@/app/firebase';
export async function GET(request) {
    try {
        const querySnapshot = await getDocs(collection(db, "hotels"));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong' });
    }
}