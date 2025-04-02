// src\app\movies\[id]\page.jsx

import PropTypes from "prop-types";

export default async function MovieDetails({ params }) {
    const { id } = await params;

    return (
        <div>
            <h1>Movie Detail Page</h1>
            <p>You are viewing movie with ID: {id}</p>
        </div>
    );
}

MovieDetails.propTypes = {
    params: PropTypes.object.isRequired,
};
