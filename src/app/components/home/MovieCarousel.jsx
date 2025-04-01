// src/app/components/MovieCarousel.jsx

"use client";

import PropTypes from "prop-types";
import { Carousel } from "primereact/carousel";
import movieCarouselResponsiveOptions from "../../modules/movieCarouselResponsiveOptions";
import generateMovieCarouselItemTemplate from "../../modules/generateMovieCarouselItemTemplate";

export default function MovieCarousel({ movies }) {
    return (
        <Carousel
            value={movies}
            numVisible={5}
            numScroll={1}
            responsiveOptions={movieCarouselResponsiveOptions}
            itemTemplate={generateMovieCarouselItemTemplate}
            circular
            autoplayInterval={15000}
            className="custom-carousel"
        />
    );
}

MovieCarousel.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
