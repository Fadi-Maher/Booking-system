"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useRouter } from 'next/navigation';
 
const SliderSection = () => {
  const router = useRouter();

  useEffect(() => {
    // Ensure the carousel is initialized
    if (typeof window !== "undefined" && window.bootstrap) {
      const carouselElement = document.getElementById('carouselExampleIndicators');
      new window.bootstrap.Carousel(carouselElement);
    }
  }, []);

  const showHotelsClickHandler = () => router.push("/hotels")

  return (
    <div className='container mb-5 d-flex flex-column '>
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <ol className="carousel-indicators">
        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></li>
        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"  className="active"></li>
        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"  className="active"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <Image className="d-block w-100" src="/assets/images/jade-mountain-700x467.jpg" alt="First slide" width={800} height={400} />
        </div>
        <div className="carousel-item">
          <Image className="d-block w-100" src="/assets/images/pexels-jess-vide-5007455.jpg" alt="Second slide" width={800} height={400} />
        </div>
        <div className="carousel-item">
          <Image className="d-block w-100" src="/assets/images/1657133145668.jpeg" alt="Third slide" width={800} height={400} />
        </div>
      </div>
      <Link href="#carouselExampleIndicators" role="button" data-bs-slide="prev" className="carousel-control-prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </Link>
      <Link href="#carouselExampleIndicators" role="button" data-bs-slide="next" className="carousel-control-next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </Link>
    </div>
         <div className='d-flex align-items-center flex-column '>
    
          <p className='w-75 mt-5 text-center' style={{color:"#555"}}>We provide you with a variety of luxurious hotels in different places and with various and 
            different services. We provide you with the room reservations you need in any hotel you choose to make it
             easy for you to spend  comfortable and enjoyable vacations.</p>
            
             
               <button type="button" className="primary-btn mt-1 w-25" onClick={showHotelsClickHandler}>
                   Show Hotels </button>
             
            </div>
    </div>
  );
};

export default SliderSection;
