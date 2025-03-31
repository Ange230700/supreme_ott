// src/app/components/MovieCard.jsx

import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";

const MovieCard = ({ film }) => {
  const blurClass = film.IsAvailable ? "" : "filter blur-xs";
  return (
    <Link href={`/movies/${film.id}`} className="movie-link">
      <div className={`movie-slide ${blurClass}`}>
        <Image
          src={film.miniature_url}
          alt={film.title}
          fill
          sizes="100%, 100%"
          className="object-cover"
          priority={true}
        />
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
