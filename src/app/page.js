// src/app/page.js

import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(new URL("/api/films", baseUrl));
  const films = await res.json();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to OTT Platform</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {films.map((film) => (
          <Link
            key={film.id}
            href={`/movies/${film.id}`}
            className="block border p-4 hover:shadow-lg"
          >
            <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80">
              <Image
                src={film.cover_url}
                alt={film.title}
                fill
                className="object-cover"
                priority={true}
              />
            </div>
            <h2 className="mt-2 text-xl">{film.title}</h2>
          </Link>
        ))}
      </section>
    </main>
  );
}
