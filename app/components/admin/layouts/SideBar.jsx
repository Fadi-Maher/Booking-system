"use client";
// import Image from "next/image";
import React from "react";
import styles from "./SideBar.module.css";
import Link from "next/link";
import { BsGraphDown } from "react-icons/bs";
import { FaHotel } from "react-icons/fa6";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathName = usePathname();

  return (
    <div
      className={`d-flex flex-column flex-shrink-0 p-3 text-white bg-dark ${styles.sidebar}`}
      style={{ width: "280px" }}
    >
      <Link
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <svg className="bi me-2" width="40" height="32">
          <use xlinkHref="#bootstrap" />
        </svg>
        <span className="fs-4">Reserve Mate</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link
            href="/admin"
            className={`nav-link d-flex align-items-center ${pathName === "/admin" ? "active" : ""}`}
          >
            <BsGraphDown size={16} className="bi me-2" />
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            href="/admin/hotels"
            className={`nav-link d-flex align-items-center ${pathName === "/admin/hotels" ? "active" : ""}`}
          >
            <FaHotel size={16} className="bi me-2" />
            Hotels
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
