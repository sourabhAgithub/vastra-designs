import Link from "next/link";
import styles from "./site-footer.module.css";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Collection" },
  { href: "/about", label: "About" },
  { href: "/order", label: "Order" },
];

export default function SiteFooter() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.siteFooterInner}>
        <div>
          <h3 className={styles.siteFooterTitle}>Vastra Designs</h3>
          <p className={styles.siteFooterCopy}>
            Tailored designs with handcrafted detailing for every celebration.
          </p>
        </div>

        <nav className={styles.siteFooterNav} aria-label="Footer">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.siteFooterLink}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <p className={styles.siteFooterLegal}>
        © {new Date().getFullYear()} Vastra Designs. All rights reserved.
      </p>
    </footer>
  );
}
