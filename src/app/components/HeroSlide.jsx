// src\app\components\HeroSlide.jsx

"use client";

import Image from "next/image";
import PropTypes from "prop-types";

export default function HeroSlide({ movie }) {
  const imageUrl = movie.cover_filename
    ? `${process.env.NEXT_PUBLIC_API_URL}/assets/images/${movie.cover_filename}`
    : movie.cover_url;

  return (
    <div className="hero-slide">
      <Image
        src={imageUrl}
        alt={movie.title}
        fill
        sizes="100vw"
        className="hero-slide-image"
        priority={true}
      />
    </div>
  );
}

HeroSlide.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    cover_filename: PropTypes.string,
    cover_url: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

