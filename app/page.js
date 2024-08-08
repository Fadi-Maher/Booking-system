 import Homepage from "./components/homePage/page";
import NavbarComponent from "./components/navbar/page";
import React from "react";
import Hotels from "./components/viewData/page";

const page = () => {
  return <div>
    <NavbarComponent/>
    <Homepage/> 
    <Hotels/>
    </div> ;

};

export default page;

 