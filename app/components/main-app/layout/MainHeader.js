"use client";

// import React from "react";
// import Logout from "@/app/logout/Logout";
// import Link from "next/link";
// import Search from "./Search";
// import Drawer from "../ui/drawer/darwer";

// const MainHeader = () => {
//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg navbar-light bg-primary text-light p-3 fixed-top">
//         <div className="container-fluid">

//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse text-white" id="navbarSupportedContent">
//             <ul className="navbar-nav me-auto item-center text-light">
//               <li className="nav-item">
//                 <Link className="nav-link active text-white font-3 shadow me-2" aria-current="page" href="/">Home</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link text-white me-2 shadow" href="/hotels">Hotels</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link text-white shadow me-2" href="/about-us">About Us</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link text-white shadow me-2" href="/">Contact Us</Link>
//               </li>
//             </ul>
//             <div className="justify-content-around d-flex flex-row w-50">
//               <form className="d-flex">
//                 <Search />
//               </form>

//             </div>
//           </div>

//         </div>
//         <Drawer />
//       </nav>
//     </div>
//   );
// }

// export default MainHeader;

import React, { useContext } from "react";
import Logout from "@/app/logout/Logout";
import Link from "next/link";
import Search from "./Search";
import styles from "./MainHeader.module.css";
import Drawer from "../ui/drawer/darwer";
import { AuthContext } from "@/app/AuthContext";

const MainHeader = () => {
  const { userDetails } = useContext(AuthContext);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.topNav}>
          <div className="container ">
            <div className="row">
              <div className="col-lg-6 d-flex flex-column">
                <Link href="/" style={{ textDecoration: "none" }}>
                  <h3 className={styles.brandName}>Reserve Mate</h3>
                </Link>
                {userDetails && (
                  <h6>
                    Welcome:{" "}
                    <span className="primary-color">
                      {userDetails.username}
                    </span>
                  </h6>
                )}
              </div>

              <div className="col-lg-6 d-flex justify-content-end ">
                <div className="px-3">
                  <Search />
                </div>
                <Drawer />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.menuItem}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className={styles.navMenu}>
                  <nav className={styles.mainmenu}>
                    <ul>
                      <li className={styles.active}>
                        <Link className={styles.link} href="/">
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link className={styles.link} href="/hotels">
                          Hotels
                        </Link>
                      </li>
                      <li>
                        <Link className={styles.link} href="/about-us">
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link className={styles.link} href="/contact-us">
                          Contact Us
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default MainHeader;
