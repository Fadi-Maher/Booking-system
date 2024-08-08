"use client";
import React from 'react'
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";


const Logout = () => { 
    const router = useRouter()  
    async function signOutUser() {
      try {
        await signOut(auth);
        router.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <div >
    <button onClick={() => signOutUser()} className="btn btn-outline-warning text-white" type="submit">Logout</button>
    </div>
  )
}

export default Logout