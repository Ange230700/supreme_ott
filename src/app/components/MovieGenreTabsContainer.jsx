// src\app\components\MovieGenreTabsContainer.jsx

"use client";

import PropTypes from "prop-types";
import { Carousel } from "primereact/carousel";
import MovieGenreTab from "./MovieGenreTab";

export default function MovieGenreTabsContainer({ categories }) {
    const itemTemplate = (category) => <MovieGenreTab category={category} />;

    const responsiveOptions = [
        {
            breakpoint: "1400px",
            numVisible: 5,
            numScroll: 1,
        },
        {
            breakpoint: "1024px",
            numVisible: 4,
            numScroll: 1,
        },
        {
            breakpoint: "768px",
            numVisible: 3,
            numScroll: 1,
        },
    ];

    return (
        <Carousel
            value={categories}
            numVisible={5}
            numScroll={1}
            responsiveOptions={responsiveOptions}
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
