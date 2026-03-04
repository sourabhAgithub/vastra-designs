import type { ReactNode } from "react";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";
import "./globals.css";
import styles from "./layout.module.css";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className={styles.siteShell}>
          <SiteNav />
          <main className={styles.pageShell}>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
