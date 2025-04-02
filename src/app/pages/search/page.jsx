// src\app\search\page.jsx

"use client";

import { useState } from "react";
import { useMovies } from "@/app/hooks/useMovies";
import MovieCard from "@/app/components/home/movieCarousel/MovieCard";

export default function Search() {
    const [searchValue, setSearchValue] = useState("");
    const { movies } = useMovies();

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <section className="search-page">
            <div className="search-display-section">
                <div className="search-bar-container">
                    <input
                        className="search-bar"
                        type="search"
                        placeholder="Search for a movie"
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="search-result-container">
                    {searchValue.length > 0
                        ? movies
                            .filter((movie) =>
                                movie.title.toLowerCase().includes(searchValue.toLowerCase())
                            )
                            .map((movie) => (
                                <MovieCard key={movie.id} film={movie} />
                            ))
                        : movies.map((movie) => (
                            <MovieCard key={movie.id} film={movie} />
                        ))}
                </div>
            </div>
        </section>
    );
}
