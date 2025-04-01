// src\app\components\home\HeroSlider.jsx

"use client";

import PropTypes from "prop-types";
import { Carousel } from "primereact/carousel";
import heroSliderResponsiveOptions from "../../modules/heroSliderResponsiveOptions";
import generateHeroSliderItemTemplate from "../../modules/generateHeroSliderItemTemplate";

export default function HeroSlider({ movies }) {
  const availableMovies = movies.filter((movie) => movie.IsAvailable);
  return (
    <Carousel
      value={availableMovies}
      itemTemplate={generateHeroSliderItemTemplate}
      circular
      autoplayInterval={10000}
      responsiveOptions={heroSliderResponsiveOptions}
      className="hero-slider-container"
    />
  );
}

HeroSlider.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      cover_filename: PropTypes.string,
      cover_url: PropTypes.string,
      title: PropTypes.string.isRequired,
      videoUrl: PropTypes.string,
      duration: PropTypes.number.isRequired,
      year: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      IsAvailable: PropTypes.bool.isRequired,
    })
  ).isRequired,
};
