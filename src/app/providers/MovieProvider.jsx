// src\app\providers\MovieProvider.jsx

"use client";

import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { MovieContext } from "../contexts/MovieContext";

export function MovieProvider({ children }) {
    const [movies, setMovies] = useState([]);

    const fetchMovies = async () => {
        try {
            const response = await axios.get("/api/films");
            setMovies(response.data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const value = useMemo(() => ({ movies, setMovies, fetchMovies }), [movies]);

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
}

MovieProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
