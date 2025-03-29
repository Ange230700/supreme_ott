// src\app\components\HeroSlider.jsx

"use client";

import PropTypes from "prop-types";
import { Carousel } from "primereact/carousel";
import HeroSlideLink from "./HeroSlideLink";

export default function HeroSlider({ movies }) {
  // Define a template to render each available movie slide.
  const itemTemplate = (movie) => {
    return movie?.IsAvailable ? (
      <HeroSlideLink movie={movie} />
    ) : null;
  };

  // Responsive options for Primereact Carousel.
  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "768px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  return (
    <Carousel
      value={movies}
      itemTemplate={itemTemplate}
      circular
      autoplayInterval={3000}
      responsiveOptions={responsiveOptions}
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
