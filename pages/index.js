// pages/index.js

import Link from "next/link";

export default function LandingPage() {
  return (
    <div style={{ padding: "4rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>DocuPrompt</h1>
      <p style={{ fontSize: "1.25rem", marginTop: "1rem" }}>
        Yapay zekâ destekli belge oluşturma aracı.
      </p>
      <Link href="/generate">
        <button style={{ marginTop: "2rem", padding: "1rem 2rem", fontSize: "1rem" }}>
          Hemen Deneyin
        </button>
      </Link>
    </div>
  );
}
