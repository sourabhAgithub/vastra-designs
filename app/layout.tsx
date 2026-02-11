import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>
        <header
          style={{
            padding: "20px",
            borderBottom: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link href="/">Vastra Designs</Link>

          <nav style={{ display: "flex", gap: "20px" }}>
            <Link href="/products">Collection</Link>
            <Link href="/about">About</Link>
          </nav>
        </header>

        <div style={{ padding: "40px" }}>{children}</div>

        <footer
          style={{
            padding: "20px",
            borderTop: "1px solid #eee",
            marginTop: "40px",
          }}
        >
          © {new Date().getFullYear()} Vastra Designs
        </footer>
      </body>
    </html>
  );
}
