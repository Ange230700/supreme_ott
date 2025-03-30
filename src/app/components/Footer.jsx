// src\app\components\Footer.jsx

"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">
        Check out the source code on{" "}
        <Link
          href="https://github.com/Ange230700/supreme_ott"
          className="footer-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
      </p>
    </footer>
  );
}

