//Import goes here
import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>🚀 My First Next.js App</h1>
      <p>Built inside CodeSandbox</p>
      <Link href="/about">Go To About</Link>
    </main>
  );
}
