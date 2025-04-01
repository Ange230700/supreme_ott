// src\app\modules\generateMovieCarouselItemTemplate.js

import MovieCard from "../components/MovieCard";

const generateMovieCarouselItemTemplate = (movie) => (
  <div className="movie-card-container">
    <MovieCard film={movie} />
  </div>
);

export default generateMovieCarouselItemTemplate;