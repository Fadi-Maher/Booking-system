import React from 'react';
import Link from 'next/link';
import styles from "./page.module.css"


const Footer = () => {
  return (
    <footer className="bg-primary text-light py-5 footer">
      <div className="container">
      <div className={styles.footertext}>
        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className={styles.ftAabout}>
            <h4>our goal</h4>
              <p> inspire and reach millions of travelers<br /> across 90 local websites</p>
            </div>
          </div>
          <div className="col-lg-3 offset-lg-1 mb-4">
            <div className={styles.ftcontact}>
              <h4>Contact Us</h4>
              <ul className="list-unstyled">
                <li>34567890</li>
                <li>email.com</li>
                <li> Dahab </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 offset-lg-1 mb-4">
            <div className={styles.ftnewslatter}>
              <h4>New latest</h4>
              <p>Get the latest updates and offers.</p>
              <form action="#" className="d-flex">
                <input type="email" placeholder="Email" className="form-control me-2" />
              </form>
            </div>
          </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
