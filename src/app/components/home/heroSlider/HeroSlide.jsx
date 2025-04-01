// src\app\components\HeroSlide.jsx

"use client";

import { useState } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import { Loader } from "@deemlol/next-icons";

export default function HeroSlide({ movie }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="hero-slide">
      {!isLoaded && (
        <div className="hero-slide-loader-container">
          <Loader size={128} color="#FF529A" className="pi pi-spin" />
        </div>
      )}
      <Image
        src={movie.cover_url}
        alt={movie.title}
        fill
        sizes="100vw"
        className="hero-slide-image"
        priority={true}
        onLoad={handleImageLoad}
      />
    </div>
  );
}

HeroSlide.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    cover_url: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

