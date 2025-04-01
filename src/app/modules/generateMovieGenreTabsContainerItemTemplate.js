// src\app\modules\generateMovieGenreTabsContainerItemTemplate.js

import MovieGenreTab from "../components/home/movieGenreTabsContainer/MovieGenreTab";

const generateMovieGenreTabsContainerItemTemplate = (category) => (
  <div className="movie-genre-tab-container">
    <MovieGenreTab category={category} />
  </div>
);

export default generateMovieGenreTabsContainerItemTemplate;
