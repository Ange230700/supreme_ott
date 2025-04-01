// src\app\components\home\movieCarousel\MovieCard.jsx

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
        {!isLoaded && (
          <div className="movie-slide-loader-container">
            <Loader size={78} color="#FF529A" className="pi pi-spin" />
          </div>
        )}
        <div className={`picture-container ${blurClass}`}>
          <Image
            src={film.miniature_url}
            alt={film.title}
            fill
            sizes="100%"
            className="object-cover"
            priority={true}
            onLoad={handleImageLoad}
          />
        </div>
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
