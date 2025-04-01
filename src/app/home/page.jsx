// src\app\home\page.jsx

"use client";

import { Loader } from "@deemlol/next-icons";
import 'primeicons/primeicons.css';
import HeroSlider from "../components/HeroSlider";
import MovieCarousel from "../components/MovieCarousel";
import { useCategories } from "../hooks/useCategories";
import { useMovies } from "../hooks/useMovies";
import MovieGenreTabsContainer from "../components/MovieGenreTabsContainer";

export default function Home() {
  const { movies } = useMovies();
  const { categories, categoriesWithMovies } = useCategories();

  return (
    <>
      <header className="header">
        <HeroSlider movies={movies} />
      </header>
      <MovieGenreTabsContainer categories={categories} />
      <main className="home-page">
        {categoriesWithMovies.length ? (
          categoriesWithMovies.map((category) => (
            <section key={category.id} className="movies-display-section">
              <h2 className="sub-heading-category">{category.name}</h2>
              <MovieCarousel
                movies={category.movies}
              />
            </section>
          ))
        ) : (
          <div className="flex justify-center items-center h-78">
            <Loader size={78} color="#FF529A" className="pi pi-spin" />
          </div>
        )}
      </main>
    </>
  );
}
