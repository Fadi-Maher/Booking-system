 import Homepage from "./components/homePage/page";
import NavbarComponent from "./components/navbar/page";
import React from "react";
import Hotels from "./components/viewData/page";
import Footer from "./components/footer/page";

const page = () => {
  return <div>
    <NavbarComponent/>
    <Homepage/> 
    <Hotels/>
    <Footer />
    </div> ;

};

export default page;

 