import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <section
      style={{ backgroundColor: "#222736" }}
      className="vh-100 d-flex align-items-center"
    >
      <div className="container flex items-center  px-6 py-12 mx-auto">
        <div>
          <p style={{ color: "gray" }}>404 Error</p>
          <h1 style={{ color: "white" }}>We can&apos;t find that page</h1>
          <p className="mt-4" style={{ color: "gray" }}>
            Sorry, the page you are looking for does&apos;t exist or has been
            moved.
          </p>

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
      </div>
    </section>
  );
}

export default NotFound;
