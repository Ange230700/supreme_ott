// src/app/categories/page.jsx

import MovieCard from "../components/MovieCard";

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch categories from the API
  const categoriesRes = await fetch(`${baseUrl}/api/categories`);
  const categories = await categoriesRes.json();

  // For each category, fetch the movies that belong to it
  const categoriesWithMovies = await Promise.all(
    categories.map(async (category) => {
      const moviesRes = await fetch(
        `${baseUrl}/api/films/category/${category.id}`
      );
      const movies = await moviesRes.json();
      return { ...category, movies };
    })
  );

  return (
    <main className="home-page">
      <h1 className="main-heading">Welcome!</h1>
      {categoriesWithMovies.map((category) => (
        <section key={category.id} className="movies-display-section">
          <h2 className="sub-heading-category">{category.name}</h2>
          <div className="cards-grid">
            {category.movies.map((movie) => (
              <MovieCard key={movie.id} film={movie} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
