// src\app\home\page.jsx

"use client";

import HeroSlider from "../components/HeroSlider";
import MovieCarousel from "../components/MovieCarousel";
import movieCarouselResponsiveOptions from "../modules/movieCarouselResponsiveOptions";
import { useCategories } from "../hooks/useCategories";
import { useMovies } from "../hooks/useMovies";

export default function Home() {
  const { movies } = useMovies();
  const { categoriesWithMovies } = useCategories();

  return (
    <>
      <header>
        <HeroSlider movies={movies} />
      </header>
      <main className="home-page">
        {categoriesWithMovies.length ? (
          categoriesWithMovies.map((category) => (
            <section key={category.id} className="movies-display-section">
              <h2 className="sub-heading-category">{category.name}</h2>
              <MovieCarousel
                movies={category.movies}
                responsiveOptions={movieCarouselResponsiveOptions}
              />
            </section>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </main>
    </>
  );
}
