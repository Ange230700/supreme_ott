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

  const imageUrl = movie.cover_url;

  return (
    <div className="hero-slide relative">
      {/* Loader overlay shown until image is loaded */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-gray-200">
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

