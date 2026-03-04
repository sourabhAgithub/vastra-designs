import Link from "next/link";
import styles from "./page.module.css";

export default function About() {
  return (
    <section className={styles.aboutPage}>
      <header className={styles.heroCard}>
        <p className={styles.eyebrow}>About Vastra Designs</p>
        <h1 className={styles.title}>Handcrafted Styles, Designed for Every Celebration</h1>
        <p className={styles.subtitle}>
          We create custom stitched outfits that combine traditional detailing
          with modern comfort. From bridal blouses to festive sets, every piece
          is tailored with care, fitting, and finishing in mind.
        </p>
      </header>

      <div className={styles.contentGrid}>
        <article className={styles.infoCard}>
          <h2 className={styles.cardTitle}>Who We Are</h2>
          <p className={styles.text}>
            Vastra Designs is a boutique studio focused on personalized women&apos;s
            wear. Our process starts with understanding your event, styling
            preferences, and fit requirements, then translating that into
            detailed handcrafted garments.
          </p>
          <p className={styles.text}>
            We support both ready designs and custom-order requests, with direct
            communication throughout the process for transparency and confidence.
          </p>
        </article>

        <article className={styles.infoCard}>
          <h2 className={styles.cardTitle}>Why Clients Choose Us</h2>
          <ul className={styles.list}>
            <li>Personalized sizing and fit guidance.</li>
            <li>Careful finishing for premium look and comfort.</li>
            <li>Flexible design support for festivals and weddings.</li>
            <li>Clear timeline updates from order to delivery.</li>
          </ul>
        </article>
      </div>

      <section className={styles.contactSection}>
        <h2 className={styles.contactTitle}>Contact Us</h2>
        <p className={styles.contactSubtitle}>
          Reach out for orders, customizations, or fit consultations.
        </p>

        <div className={styles.contactGrid}>
          <a href="tel:+919876543210" className={styles.contactCard}>
            <p className={styles.contactLabel}>Call</p>
            <p className={styles.contactValue}>+91 98765 43210</p>
          </a>

          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noreferrer"
            className={styles.contactCard}
          >
            <p className={styles.contactLabel}>WhatsApp</p>
            <p className={styles.contactValue}>Text us at +91 98765 43210</p>
          </a>

          <a href="mailto:hello@vastradesigns.com" className={styles.contactCard}>
            <p className={styles.contactLabel}>Email</p>
            <p className={styles.contactValue}>hello@vastradesigns.com</p>
          </a>
        </div>
      </section>

      <div className={styles.actionRow}>
        <Link href="/products" className={styles.primaryAction}>
          Explore Collection
        </Link>
        <Link href="/order" className={styles.secondaryAction}>
          Start a Custom Order
        </Link>
      </div>
    </section>
  );
}
