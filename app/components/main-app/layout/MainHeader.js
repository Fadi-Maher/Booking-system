import React from "react";
import Logout from "@/app/logout/Logout";
import Link from "next/link";
import Search from "./Search";
import Drawer from "../ui/drawer/darwer";

const MainHeader = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary text-light p-3 fixed-top">
        <div className="container-fluid">
<<<<<<< HEAD
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse text-white" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto   item-center  text-light ">
            <li className="nav-item ">
              <Link className="nav-link active text-white font-3  shadow  me-2 " aria-current="page" href="/">Home</Link>
            </li>
           
            <li className="nav-item">
              <Link className="nav-link text-white me-2  shadow " href="/hotels">Hotels</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white  shadow  me-2 " href="/about-us">About Us</Link>
            </li>
    
            <li className="nav-item">
              <Link className="nav-link text-white   shadow me-2 " href="/contact-us">Contact Us</Link>
            </li>
           
          </ul>
          <div className="justify-content-around  d-flex flex-row w-50">
          <form className="d-flex ">
            <Search />
          </form>
            <Logout/>
=======
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse text-white" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto item-center text-light">
              <li className="nav-item">
                <Link className="nav-link active text-white font-3 shadow me-2" aria-current="page" href="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white me-2 shadow" href="/hotels">Hotels</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white shadow me-2" href="/about-us">About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white shadow me-2" href="/">Contact Us</Link>
              </li>
            </ul>
            <div className="justify-content-around d-flex flex-row w-50">
              <form className="d-flex">
                <Search />
              </form>
              {/* <Logout /> */}
            </div>
          </div>
>>>>>>> d55ff9f (handle auth of login & create Drawer & EditNavbAr & addHotels)
        </div>
        <Drawer />
      </nav>
    </div>
  );
}

export default MainHeader;
