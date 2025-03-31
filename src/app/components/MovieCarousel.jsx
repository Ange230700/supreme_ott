// src/app/components/MovieCarousel.jsx

"use client";

import PropTypes from "prop-types";
import { Carousel } from "primereact/carousel";
import MovieCard from "./MovieCard";
import movieCarouselResponsiveOptions from "../modules/movieCarouselResponsiveOptions";

export default function MovieCarousel({ movies }) {
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
            numScroll={1}
            responsiveOptions={movieCarouselResponsiveOptions}
            itemTemplate={itemTemplate}
            circular
            autoplayInterval={4000}
            className="custom-carousel"
        />
    );
}

MovieCarousel.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
