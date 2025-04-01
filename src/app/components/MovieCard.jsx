// src/app/components/MovieCard.jsx

import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import { Lock } from "@deemlol/next-icons";

const MovieCard = ({ film }) => {
  const blurClass = film.IsAvailable ? "" : "filter blur-xs";
  return (
    <Link href={`/movies/${film.id}`} className="movie-link">
      <div className="movie-slide relative">
        {/* Wrap the image in its own container and apply the blur there */}
        <div className={`absolute inset-0 ${!film.IsAvailable ? "filter blur-xs" : ""}`}>
          <Image
            src={film.miniature_url}
            alt={film.title}
            fill
            sizes="100%"
            className="object-cover"
            priority={true}
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
