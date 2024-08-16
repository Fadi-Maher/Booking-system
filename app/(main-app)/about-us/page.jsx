import React from 'react';
import styles from './AboutUs.module.css';
import AboutUsSection from '@/app/components/main-app/pages/about-us/AboutUsSection';
const AboutUsPage = () => {
  <AboutUsSection/>
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Us</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Welcome to Reserve-Mate</h2>
        <p className={styles.sectionText}>
          At Reserve-Mate, we are dedicated to simplifying the reservation process for both businesses and customers. Our platform is designed to streamline bookings, making it easier and more efficient for everyone involved.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Our Mission</h2>
        <p className={styles.sectionText}>
          Our mission is to provide a seamless and user-friendly booking experience. We aim to connect people with the services they need in the most convenient way possible, ensuring a hassle-free experience from start to finish.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What We Do</h2>
        <p className={styles.sectionText}>
          Reserve-Mate offers a comprehensive booking solution for a variety of industries, including:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}><strong className={styles.highlight}>Hospitality</strong>: Easily book hotel rooms, resorts, and vacation rentals.</li>
          <li className={styles.listItem}><strong className={styles.highlight}>Restaurants</strong>: Reserve tables at your favorite dining spots.</li>
          <li className={styles.listItem}><strong className={styles.highlight}>Events</strong>: Secure tickets for concerts, conferences, and other events.</li>
          <li className={styles.listItem}><strong className={styles.highlight}>Services</strong>: Schedule appointments for salons, spas, and other personal services.</li>
        </ul>
        <p className={styles.sectionText}>
          Our platform provides an intuitive interface for both users and service providers, ensuring smooth communication and efficient management of reservations.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Why Choose Reserve-Mate?</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}><strong className={styles.highlight}>User-Friendly Interface</strong>: Our platform is designed with simplicity in mind, making it easy for anyone to navigate and make bookings.</li>
          <li className={styles.listItem}><strong className={styles.highlight}>Reliable</strong>: We prioritize reliability to ensure your bookings are secure and confirmed.</li>
          <li className={styles.listItem}><strong className={styles.highlight}>24/7 Support</strong>: Our dedicated support team is available around the clock to assist you with any questions or issues.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Meet Our Team</h2>
        <p className={styles.sectionText}>
          Our team is composed of passionate professionals who are committed to making Reserve-Mate the best booking platform available. We bring together expertise in technology, customer service, and industry knowledge to deliver a superior experience for our users.
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}><strong className={styles.highlight}>Founder & CEO</strong>: [Name] - With a background in [industry/technology], [Name] founded Reserve-Mate to address the challenges faced by both businesses and customers in the booking process.</li>
          <li className={styles.listItem}><strong className={styles.highlight}>CTO</strong>: [Name] - An expert in software development and system architecture, [Name] leads our technical team to ensure a robust and scalable platform.</li>
          <li className={styles.listItem}><strong className={styles.highlight}>Customer Support Manager</strong>: [Name] - Dedicated to providing exceptional service, [Name] oversees our support team to ensure every customer has a positive experience.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Our Story</h2>
        <p className={styles.sectionText}>
          Reserve-Mate was born out of the need for a more efficient booking solution. [Briefly describe the inspiration behind starting the company and any key milestones or achievements.]
        </p>
      </section>

    </div>
  );
};

export default AboutUsPage;
