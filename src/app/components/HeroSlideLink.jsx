// src\app\components\HeroSlideLink.jsx

"use client";

import Link from "next/link";
import PropTypes from "prop-types";
import HeroSlide from "./home/heroSlider/HeroSlide";

export default function HeroSlideLink({ movie }) {
  return (
    <Link href={`/movies/${movie.id}`} className="hero-slide-link">
      <HeroSlide movie={movie} />
    </Link>
  );
}

HeroSlideLink.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    cover_filename: PropTypes.string,
    cover_url: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
