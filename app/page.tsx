//Import goes here
import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Vastra Designs</h1>
      <p>Get Your Custom Designed Dresses</p>
      <Link href="/about">Go To About</Link>
    </main>
  );
}
