// src/app/components/MovieCarousel.jsx

"use client";

import PropTypes from "prop-types";
import { Carousel } from "primereact/carousel";
import MovieCard from "./MovieCard";

export default function MovieCarousel({ movies, responsiveOptions }) {
    // Define the itemTemplate function inside the client component.
    const itemTemplate = (movie) => {
        return (
            <div className="flex justify-center items-center">
                <MovieCard film={movie} />
            </div>
        );
    };

    return (
        <Carousel
            value={movies}
            numVisible={5}
            numScroll={2}
            responsiveOptions={responsiveOptions}
            itemTemplate={itemTemplate}
            circular
            autoplayInterval={4000}
            className="custom-carousel"
        />
    );
}

MovieCarousel.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object).isRequired,
    responsiveOptions: PropTypes.arrayOf(
        PropTypes.shape({
            breakpoint: PropTypes.string.isRequired,
            numVisible: PropTypes.number.isRequired,
            numScroll: PropTypes.number.isRequired,
        })
    ).isRequired,
};
