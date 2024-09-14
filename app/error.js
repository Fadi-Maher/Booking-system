"use client";
import Link from "next/link";
import React from "react";

function Error() {
  return (
    <section
      style={{ backgroundColor: "#222736", color: "white" }}
      className="vh-100 d-flex align-items-center"
    >
      <div className="container flex items-center px-6 py-12 mx-auto">
        <div>
          <h1 className="mt-3 mb-4">Oops, Something went wrong!</h1>
        </div>
        <div>
          <Link style={{ textDecoration: "none" }} href="/">
            {" "}
            <button
              className="px-4 py-2"
              style={{ backgroundColor: "#dfa974" }}
            >
              Take me home
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Error;
