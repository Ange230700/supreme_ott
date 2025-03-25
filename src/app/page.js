// src/app/page.js

import MovieCard from "./components/MovieCard";

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(new URL("/api/films", baseUrl));
  const films = await res.json();

  return (
    <main className="home-page">
      <h1 className="main-heading">Welcome to OTT Platform</h1>
      <section className="cards-grid">
        {films.map((film) => (
          <MovieCard key={film.id} film={film} />
        ))}
      </section>
    </main>
  );
}
