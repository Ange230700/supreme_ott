// src\app\modules\generateMovieGenreTabsContainerItemTemplate.js

import MovieGenreTab from "../components/MovieGenreTab";

const generateMovieGenreTabsContainerItemTemplate = (category) => (
  <div className="movie-genre-tab-container">
    <MovieGenreTab category={category} />
  </div>
);

export default generateMovieGenreTabsContainerItemTemplate;
