"use client"
import React from "react";
import Logout from "@/app/logout/Logout";
import Link from "next/link";
import Search from "../search/page";

const NavbarComponent = () => {
  return (
    <div>
 <nav className="navbar navbar-expand-lg navbar-light bg-primary text-light p-3">
  <div className="container-fluid">
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse text-white" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto   item-center  text-light ">
        <li className="nav-item ">
          <Link className="nav-link active text-white font-3 border shadow  me-2 " aria-current="page" href="/">Home</Link>
        </li>
       
        <li className="nav-item">
          <Link className="nav-link text-white me-2  shadow border" href="/components/hotelPage">Hotels</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white border shadow  me-2 " href="./components/AboutUsPage">About Us</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white border  shadow me-2 " href="/">Contact Us</Link>
        </li>
       
      </ul>
      <div className="justify-content-around  d-flex flex-row w-50">
      <form className="d-flex ">
        
       <Search   />
        </form>
         <Logout/>
    </div>
    </div>
  </div>
</nav>
    </div>
  );
};

export default NavbarComponent;
