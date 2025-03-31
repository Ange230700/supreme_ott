// src\app\components\MovieGenreTabsContainer.jsx

"use client";

import PropTypes from "prop-types";
import { Carousel } from "primereact/carousel";
import MovieGenreTab from "./MovieGenreTab";
import movieGenreTabsResponsiveOptions from "../modules/movieGenreTabsResponsiveOptions";

export default function MovieGenreTabsContainer({ categories }) {
    const itemTemplate = (category) => (
        <div className="movie-genre-tab-container">
            <MovieGenreTab category={category} />
        </div>
    );

    return (
        <Carousel
            value={categories}
            numVisible={8}
            numScroll={1}
            responsiveOptions={movieGenreTabsResponsiveOptions}
            itemTemplate={itemTemplate}
            circular
            className="genre-carousel"
        />
    );
}

MovieGenreTabsContainer.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
};
