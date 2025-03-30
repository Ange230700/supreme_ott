// src\app\providers\CategoryProvider.jsx

"use client";

import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { CategoryContext } from "../contexts/CategoryContext";

export function CategoryProvider({ children }) {
    const [categories, setCategories] = useState([]);
    const [categoriesWithMovies, setCategoriesWithMovies] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("/api/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchCategoriesWithMovies = async () => {
        try {
            const response = await axios.get("/api/categories");
            const categoriesWithMoviesData = await Promise.all(
                response.data.map(async (category) => {
                    const moviesRes = await axios.get(`/api/films/category/${category.id}`);
                    const movies = await moviesRes.data;
                    return { ...category, movies };
                })
            );
            setCategoriesWithMovies(categoriesWithMoviesData);
        } catch (error) {
            console.error("Error fetching categories with movies:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchCategoriesWithMovies();
    }, []);

    const value = useMemo(
        () => ({
            categories,
            categoriesWithMovies,
            fetchCategories,
            fetchCategoriesWithMovies,
        }),
        [categories, categoriesWithMovies]
    );

    return (
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    );
}

CategoryProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
