'use client'
import React, {useContext, useEffect, useState } from 'react';
// import { AuthContext } from "@/app/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import { AuthContext } from '@/app/AuthContext';
const ReserveCart=()=> {
  const [usersId,setUserId]=useState([]);
  const [userCart,setUserCart]=useState();
  const { currentUser } = useContext(AuthContext);
  async function fetchData(){
   let subCollectionSnapshot=await getDocs( collection(db,'hotels/64gdmnYjEr5yL1P3KZdA/rooms/Guwfl0y7TtPlqitnTBAT/bookings'));
      subCollectionSnapshot.forEach((subDoc) => {
          //  console.log(subDoc.data().userId);
           if(subDoc.data().userId!=undefined&&!usersId.includes(subDoc.data().userId)){ 
            usersId.push(subDoc.data().userId);
          console.log(`${subDoc.data()} ${subDoc.data().userId}`);
          
            
            // if(currentUser.uid===subDoc.data().userId){
            //   console.log('yes');
              
            // }
          }
      });
   
  }
  
    useEffect(()=>{
      fetchData();
      // console.log(currentUser.uid);
  //   usersId.forEach((id)=>{
      
  // //  if(id===currentUser.uid){
  // //   console.log("true");
   
  // //  }
  //   });
    },[])
  return (
    <>div</>
  )
}

export default ReserveCart