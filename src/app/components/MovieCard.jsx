// src/app/components/MovieCard.jsx

"use client";

import { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import { Lock, Loader } from "@deemlol/next-icons";
import "primeicons/primeicons.css";

const MovieCard = ({ film }) => {
  const blurClass = film.IsAvailable ? "" : "filter blur-xs";
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  }

  return (
    <Link href={`/movies/${film.id}`} className="movie-link">
      <div className="movie-slide relative">
        {/* Loader overlay shown until image is loaded */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-30 bg-gray-200">
            <Loader size={78} color="#FF529A" className="pi pi-spin" />
          </div>
        )}
        {/* Wrap the image in its own container and apply the blur there */}
        <div className={`absolute inset-0 ${blurClass}`}>
          <Image
            src={film.miniature_url}
            alt={film.title}
            fill
            sizes="100%"
            className="object-cover"
            priority={true}
            onLoadingComplete={handleImageLoad}
          />
        </div>
        {/* The lock icon container is a sibling with a higher z-index */}
        {!film.IsAvailable && (
          <div className="lock-container">
            <Lock size={60} color="#FF529A" />
          </div>
        )}
      </div>
    </Link>
  );
};

MovieCard.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    miniature_url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    IsAvailable: PropTypes.bool,
  }).isRequired,
};

export default MovieCard;
