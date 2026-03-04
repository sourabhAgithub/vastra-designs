"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./site-nav.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Collection" },
  { href: "/about", label: "About" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className={styles.siteHeader}>
      <div className={styles.siteHeaderInner}>
        <Link href="/" className={styles.siteLogo}>
          Vastra Designs
        </Link>

        <nav className={styles.navTabs} aria-label="Primary">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navTab}${isActive ? ` ${styles.navTabActive}` : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
