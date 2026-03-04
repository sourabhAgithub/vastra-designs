import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <section className={styles.homeHero}>
      <p className={styles.homeHeroTag}>Custom Wear Studio</p>
      <h1 className={styles.homeHeroTitle}>Crafted Outfits, Tailored for You</h1>
      <p className={styles.homeHeroSubtitle}>
        Explore handcrafted blouse and churidar styles designed with precision,
        comfort, and festival-ready finishing.
      </p>
      <div className={styles.homeHeroActions}>
        <Link href="/products" className={`${styles.btn} ${styles.btnPrimary}`}>
          View Collection
        </Link>
        <Link href="/about" className={`${styles.btn} ${styles.btnGhost}`}>
          About Us
        </Link>
      </div>
    </section>
  );
}
