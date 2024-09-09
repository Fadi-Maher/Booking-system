"use client"; // Ensure this component is treated as a Client Component

import styles from "../about-us/AboutUs.module.css";

const ContactUsPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    // Add form submission logic here
    alert("Form submitted!");
  };

  return (
    <div className="container">
      {/* Contact Info Section */}
      <section className={styles.contactInfo}>
        <h2 className={styles.sectionTitle}>Contact Us</h2>
        <p className={styles.sectionText}>
          We&apos;d love to hear from you! If you have any questions, feedback,
          or need assistance, please don&apos;t hesitate to reach out.
        </p>
        <ul className={styles.contactInfoList}>
          <li className={styles.contactInfoItem}>
            <strong className={styles.contactInfoLabel}>Email:</strong>{" "}
            olivermichel88@gmail.com
          </li>
          <li className={styles.contactInfoItem}>
            <strong className={styles.contactInfoLabel}>Phone:</strong> +20 100
            221 7494
          </li>
          <li className={styles.contactInfoItem}>
            <strong className={styles.contactInfoLabel}>Address:</strong> 1234
            Booking St., Suite 100, City, State, ZIP
          </li>
        </ul>
        <p className={styles.sectionText}>
          Thank you for choosing Reserve-Mate. We look forward to serving you!
        </p>
      </section>

      {/* Form Section */}
      <section className={styles.formContainer}>
        <h2 className={styles.sectionTitle}>Get In Touch</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formGroupLabel}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.formGroupInput}
              required
              aria-label="Name"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formGroupLabel}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.formGroupInput}
              required
              aria-label="Email"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.formGroupLabel}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className={styles.formGroupTextarea}
              required
              aria-label="Message"
            ></textarea>
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default ContactUsPage;
