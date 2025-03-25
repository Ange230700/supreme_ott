// src/app/components/MovieCard.jsx

import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";

const MovieCard = ({ film }) => {
  return (
    <Link href={`/movies/${film.id}`} className="card">
      <div className="card-pic-frame">
        <Image
          src={film.cover_url}
          alt={film.title}
          fill
          sizes="100%, 100%"
          className="object-cover"
          priority={true}
        />
      </div>
      <h2 className="card-title">{film.title}</h2>
    </Link>
  );
};

MovieCard.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    cover_url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
