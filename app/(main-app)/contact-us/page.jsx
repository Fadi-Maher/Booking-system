import styles from '../about-us/AboutUs.module.css';

const ContactUsPage = () => {
  return (
    <div>
    <section className={styles.contactInfo}>
      <h2 className={styles.sectionTitle}>Contact Us</h2>
      <p className={styles.sectionText}>
        We'd love to hear from you! If you have any questions, feedback, or need assistance, please don't hesitate to reach out.
      </p>
      <ul className={styles.contactInfoList}>
        <li className={styles.contactInfoItem}><strong className={styles.contactInfoLabel}>Email</strong>: support@reserve-mate.com</li>
        <li className={styles.contactInfoItem}><strong className={styles.contactInfoLabel}>Phone</strong>: +1 (123) 456-7890</li>
        <li className={styles.contactInfoItem}><strong className={styles.contactInfoLabel}>Address</strong>: 1234 Booking St., Suite 100, City, State, ZIP</li>
      </ul>
      <p className={styles.sectionText}>Thank you for choosing Reserve-Mate. We look forward to serving you!</p>
    </section>

    {/* Form Section */}
    <section className={styles.formContainer}>
      <h2 className={styles.sectionTitle}>Get In Touch</h2>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.formGroupLabel}>Name</label>
          <input type="text" id="name" name="name" className={styles.formGroupInput} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formGroupLabel}>Email</label>
          <input type="email" id="email" name="email" className={styles.formGroupInput} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.formGroupLabel}>Message</label>
          <textarea id="message" name="message" className={styles.formGroupTextarea} required></textarea>
        </div>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </section></div>
  )
}

export default ContactUsPage