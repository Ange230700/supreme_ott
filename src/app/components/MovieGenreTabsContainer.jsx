// src\app\components\MovieGenreTabsContainer.jsx

"use client";

import PropTypes from "prop-types";
import { Carousel } from "primereact/carousel";
import movieGenreTabsResponsiveOptions from "../modules/movieGenreTabsResponsiveOptions";
import generateMovieGenreTabsContainerItemTemplate from "../modules/generateMovieGenreTabsContainerItemTemplate";

export default function MovieGenreTabsContainer({ categories }) {
    return (
        <Carousel
            value={categories}
            numVisible={13}
            numScroll={1}
            responsiveOptions={movieGenreTabsResponsiveOptions}
            itemTemplate={generateMovieGenreTabsContainerItemTemplate}
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
