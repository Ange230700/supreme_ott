// src\app\home\page.jsx

"use client";

import { Loader } from "@deemlol/next-icons";
import 'primeicons/primeicons.css';

import HeroSlider from "../../components/home/HeroSlider";
import MovieCarousel from "../../components/home/MovieCarousel";
import { useCategories } from "../../hooks/useCategories";
import { useMovies } from "../../hooks/useMovies";
import MovieGenreTabsContainer from "../../components/home/MovieGenreTabsContainer";

export default function Home() {
  const { movies } = useMovies();
  const { categories, categoriesWithMovies } = useCategories();
  const movieCarouselLoaderHeight = 78;
  const movieCarouselLoaderContainerClassName = `h-96`;
  return (
    <>
      <header className="header">
        {movies.length ? <HeroSlider movies={movies} /> : (
          <div className="hero-slider-loader-container">
            <Loader size={128} color="#FF529A" className="pi pi-spin" />
          </div>
        )}
      </header>
      <MovieGenreTabsContainer categories={categories} />
      <section className="home-page">
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
          <div className={`movie-carousel-loader-container ${movieCarouselLoaderContainerClassName}`}>
            <Loader size={movieCarouselLoaderHeight} color="#FF529A" className="pi pi-spin" />
          </div>
        )}
      </section>
    </>
  );
}
