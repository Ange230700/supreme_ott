// src\app\components\HeroSlider.jsx

"use client";

import PropTypes from "prop-types";
import { Carousel } from "primereact/carousel";
import HeroSlideLink from "./HeroSlideLink";
import heroSliderResponsiveOptions from "../modules/heroSliderResponsiveOptions";

export default function HeroSlider({ movies }) {
  // Filter out only available movies
  const availableMovies = movies.filter((movie) => movie.IsAvailable);

  // Define a template to render each movie slide.
  const itemTemplate = (movie) => <HeroSlideLink movie={movie} />;

  return (
    <Carousel
      value={availableMovies}
      itemTemplate={itemTemplate}
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
