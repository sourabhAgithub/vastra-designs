//Import goes here
import Link from "next/link";

export default function About() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>About Page</h1>
      <p>This page is rendered using the App Router.</p>
      <Link href="/">Go Back Home</Link>
    </main>
  );
}
