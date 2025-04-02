// src\app\category\[id]\page.jsx

import PropTypes from "prop-types";

export default async function CategoryDetails({ params }) {
    const { id } = await params;

    return (
        <div>
            <h1>Category Detail Page</h1>
            <p>You are viewing category with ID: {id}</p>
        </div>
    );
}

CategoryDetails.propTypes = {
    params: PropTypes.object.isRequired,
};
