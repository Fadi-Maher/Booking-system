"use client";

import React, { useContext } from "react";
import Logout from "@/app/logout/Logout";
import Link from "next/link";
import Search from "./Search";
import styles from "./MainHeader.module.css";
import { AuthContext } from "@/app/AuthContext";
import { ToastContainer } from "react-toastify";

const MainHeader = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary p-3">
      <div className="container-fluid ">
        <Link className="navbar-brand " href="/">
          <h3 className={styles.brandName}>Reserve Mate</h3>
        </Link>

        <div
          className="collapse navbar-collapse mb-3"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={styles.link} aria-current="page" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={styles.link} aria-current="page" href="/hotels">
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

        <div className="d-flex w-100 justify-content-end gap-3">
          {/* search */}
          <Search />
          <div className="btn-group dropstart border border-secondary-subtle">
            <button
              type="button"
              className="btn"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                width="0.7rem"
              >
                <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
              </svg>
            </button>

            <ul
              className={`dropdown-menu p-2 ${styles.customDropdown}`}
              style={{ backgroundColor: "#222736" }}
            >
              {currentUser ? (
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
        </div>
      </div>
      <ToastContainer />
    </nav>
  );
};

export default MainHeader;
