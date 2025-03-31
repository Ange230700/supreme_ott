// src/app/components/MovieCard.jsx

import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";

const MovieCard = ({ film }) => {
  return (
    <Link href={`/movies/${film.id}`} className="movie-link">
      <div className="movie-slide">
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
  }).isRequired,
};

export default MovieCard;
