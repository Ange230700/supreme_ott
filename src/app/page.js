// src/app/page.js

import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(new URL("/api/films", baseUrl));
  const films = await res.json();

  return (
    <main className="home-page">
      <h1 className="main-heading">Welcome to OTT Platform</h1>
      <section className="cards-grid">
        {films.map((film) => (
          <Link key={film.id} href={`/movies/${film.id}`} className="card">
            <div className="card-pic-frame">
              <Image
                src={film.cover_url}
                alt={film.title}
                fill
                sizes="100%, 100%"
                className="object-cover"
                priority={true}
              />
            </div>
            <h2 className="card-title">{film.title}</h2>
          </Link>
        ))}
      </section>
    </main>
  );
}
