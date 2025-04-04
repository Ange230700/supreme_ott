// src\app\providers\UserProvider.jsx

"use client";

import axios from "axios";
import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "@/app/contexts/UserContext";
import isTokenExpired from "@/app/modules/isTokenExpired";

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    const updateUser = (newUser) => {
        setUser(newUser);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        // Optionally clear any other user-related data here.
    };

    const fetchUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        if (isTokenExpired(token)) {
            logout();
            return;
        }

        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/userByToken`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // Adjust the data structure based on your API response.
            updateUser(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const contextValue = useMemo(
        () => ({
            user,
            updateUser,
            logout,
            fetchUser,
        }),
        [user]
    );

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
