// src\app\hooks\useMovies.jsx

"use client";

import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";

export function useMovies() {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error("useMovies must be used within a MovieProvider");
    }
    return context;
}
