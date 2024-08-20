"use client";

import React, { useContext } from "react";
import Logout from "@/app/logout/Logout";
import Link from "next/link";
import Search from "./Search";
import styles from "./MainHeader.module.css";
import { AuthContext } from "@/app/AuthContext";

const MainHeader = () => {
  const { userDetails } = useContext(AuthContext);

  return (
    <div className="position-relative">
      <nav className="navbar navbar-expand-lg bg-body-tertiary p-3 ">
        <div className="container-fluid ">
          <Link className="navbar-brand " href="/">
            <h3 className={styles.brandName}>Reserve Mate</h3>
          </Link>

          {/* burger icon */}
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
          <div
            className="collapse navbar-collapse mb-3"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-lg-0 mt-4 mt-md-0">
              <li className="nav-item">
                <Link className={styles.link} aria-current="page" href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={styles.link}
                  aria-current="page"
                  href="/hotels"
                >
                  Hotels
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={styles.link}
                  aria-current="page"
                  href="/about-us"
                >
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={styles.link}
                  aria-current="page"
                  href="/contact-us"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* dropdown */}
      <div
        className={`btn-group dropdown-menu border border-secondary-subtle position-absolute p-1 ${styles.dropDownPosition} ${styles.dropDownContainer}`}
      >
        <button
          type="button"
          className="btn btn-sm border-0"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {userDetails ? (
            <span className={styles.dropDownbutton}>
              Welcome:{" "}
              <span className="primary-color">{userDetails.username}</span>
            </span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              width="0.7rem"
            >
              <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
            </svg>
          )}
        </button>

        <ul
          className={`dropdown-menu p-2 w-100 ${styles.customDropdown}`}
          style={{ backgroundColor: "#222736" }}
        >
          {userDetails ? (
            <Logout />
          ) : (
            <li>
              <Link className="custom-dropDown-link " href="/login">
                Log In
              </Link>
            </li>
          )}

          <li className="mt-2">
            <Link className="custom-dropDown-link" href="/register">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
      <Search />
    </div>
  );
};

export default MainHeader;
