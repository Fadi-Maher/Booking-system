import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className="text-light py-2" style={{ backgroundColor: "#222736" }}>
      <div className="container ">
        <div className={styles.footertext}>
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className={styles.ftAabout}>
                <h4>our goal</h4>
                <p>
                  {" "}
                  inspire and reach millions of travelers
                  <br /> across 90 local websites
                </p>
              </div>
            </div>
            <div className="col-lg-3 offset-lg-1 ">
              <div className={styles.ftnewslatter}>
                <h4>New latest</h4>
                <p>Get the latest updates and offers.</p>
              </div>
            </div>
          </div>
          <div>© 2024 Reserve-Mate</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
