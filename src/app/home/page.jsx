// src/app/categories/page.jsx

import HeroSlider from "../components/HeroSlider";
import MovieCarousel from "../components/MovieCarousel";
import movieCarouselResponsiveOptions from "../modules/movieCarouselResponsiveOptions";

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch all films for the hero slider
  const filmsRes = await fetch(`${baseUrl}/api/films`);
  const movies = await filmsRes.json();

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
    <>
      <header>
        <HeroSlider movies={movies} />
      </header>
      <main className="home-page">
        {categoriesWithMovies.map((category) => (
          <section key={category.id} className="movies-display-section">
            <h2 className="sub-heading-category">{category.name}</h2>
            <MovieCarousel
              movies={category.movies}
              responsiveOptions={movieCarouselResponsiveOptions}
            />
          </section>
        ))}
      </main>
    </>
  );
}
