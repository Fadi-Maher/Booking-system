import styles from "./AboutUsSection.module.css";
import Image from "next/image";
import Link from "next/link";

const AboutUsSection = () => {
  return (
    <section className={`${styles.aboutsectio} ${styles["fade-in-delay"]}`}>
      <div className={styles.spad}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className={styles.aboutText}>
                <div className={styles.sectionTitle}>
                  <span>About Us</span>
                  <h2> Reserve-Mate</h2>
                </div>
                <p className="fpara">
                  Our site is a leading online accommodation site. We’re
                  passionate about travel. Every day, we inspire and reach
                  millions of visitors.
                </p>
                <p className="spara">
                  So when it comes to booking the perfect hotel, vacation
                  rental, resort, apartment, we’ve got you covered.
                </p>
                <p>
                  <Link href="./about-us" className={styles.aboutBtn}>
                    Read More
                  </Link>
                </p>
              </div>
            </div>

            <div className="col-lg-6 ">
              <div className={styles.aboutpic}>
                <div className="d-flex flex-md-row flex-column gap-2 align-items-center">
                  <div className="col-sm-6 ">
                    <img src="/img/about-1.jpg" alt="About Us 1" />
                  </div>
                  <div className="col-sm-6">
                    <img src="/img/about-2.jpg" alt="About Us 2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
