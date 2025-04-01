// src\app\components\home\movieGenreTabsContainer\MovieGenreTab.jsx

"use client";

import PropTypes from "prop-types";
import Link from "next/link";

export default function MovieGenreTab({ category }) {
    return (
        <Link href={`/category/${category.id}`} className="movie-genre">
            {category.name}
        </Link>
    );
}

MovieGenreTab.propTypes = {
    category: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};
