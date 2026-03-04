import Link from "next/link";
import { products } from "../lib/products";
import styles from "./page.module.css";

export default function Products() {
  return (
    <section className={styles.collectionPage}>
      <header className={styles.collectionHeader}>
        <p className={styles.collectionEyebrow}>Vastra Signature Pieces</p>
        <h1 className={styles.collectionTitle}>Our Collections</h1>
        <p className={styles.collectionSubtitle}>
          Browse handcrafted silhouettes built for comfort, movement, and
          celebration-ready finishing.
        </p>
        <div className={styles.collectionMeta}>
          <span className={styles.metaPill}>{products.length} designs available</span>
          <Link href="/order" className={styles.customCta}>
            Looking for a custom design? Start an order
          </Link>
        </div>
      </header>

      <div className={styles.productGrid}>
        {products.map((product) => (
          <article key={product.id} className={styles.productCard}>
            <div className={styles.imageWrap}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
                loading="lazy"
              />
            </div>

            <div className={styles.cardContent}>
              <div className={styles.cardTop}>
                <h2 className={styles.productName}>{product.name}</h2>
                <p className={styles.productPrice}>
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
              </div>

              <p className={styles.productDescription}>{product.description}</p>

              <div className={styles.cardActions}>
                <Link href={`/products/${product.id}`} className={styles.primaryAction}>
                  View Details
                </Link>
                <Link
                  href={`/order?product=${product.id}`}
                  className={styles.secondaryAction}
                >
                  Quick Order
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
