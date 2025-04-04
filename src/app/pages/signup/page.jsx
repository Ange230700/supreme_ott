// src\app\pages\signup\page.jsx

"use client";

import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "react-feather";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import { useUser } from "@/app/hooks/useUser";

export default function Signup() {
    const router = useRouter();
    const { updateUser, fetchUser } = useUser();

    const [user, setUser] = useState({
        name: "",
        email: "",
        naissance: "",
        civility: "",
        password: "",
        avatarId: "",
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.password !== confirmPassword) return;

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
                user,
                { withCredentials: true }
            );

            if (response.status === 201) {
                updateUser(response.data.newUserWithoutPassword);
                localStorage.setItem("token", response.data.token);
                fetchUser();
                router.push("/");
            }
        } catch (err) {
            if (err.response?.status === 400) {
                setEmailError(err.response.data.message);
            } else {
                console.error("Registration failed", err);
            }
        }
    };

    return (
        <div className="signup-page">
            <form className="form" onSubmit={handleSubmit}>
                <div className="inputs">
                    <InputText
                        type="text"
                        className="input"
                        name="name"
                        value={user.name}
                        placeholder="Name"
                        onChange={handleInputChange}
                    />

                    <InputText
                        type="email"
                        className="input"
                        name="email"
                        value={user.email}
                        placeholder="Email"
                        onChange={handleInputChange}
                    />
                    {emailError && <p className="errorMessage">{emailError}</p>}

                    <div className="input-container p-inputgroup">
                        <InputText
                            type={showPassword ? "text" : "password"}
                            className="input-password"
                            name="password"
                            value={user.password}
                            placeholder="Password"
                            onChange={handleInputChange}
                        />
                        <button
                            type="button"
                            className="show p-inputgroup-addon"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>

                    <div className="input-container p-inputgroup">
                        <InputText
                            type={showConfirmPassword ? "text" : "password"}
                            className="input-password"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="show p-inputgroup-addon"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                        >
                            {showConfirmPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>

                    <InputText
                        type="date"
                        className="input"
                        name="naissance"
                        value={user.naissance}
                        placeholder="Date of Birth"
                        onChange={handleInputChange}
                        max={new Date().toISOString().split("T")[0]}
                    />

                    <div className="input-container civility">
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="civility"
                                value="Madame"
                                checked={user.civility === "Madame"}
                                onChange={handleInputChange}
                            />
                            Madame{" "}
                        </label>
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="civility"
                                value="Monsieur"
                                checked={user.civility === "Monsieur"}
                                onChange={handleInputChange}
                            />
                            Monsieur{" "}
                        </label>
                    </div>

                    <Button
                        type="submit"
                        label="Sign up"
                        className="connection"
                        disabled={
                            !user.name ||
                            !user.email ||
                            !user.password ||
                            user.password.length < 8 ||
                            user.password !== confirmPassword ||
                            !user.naissance
                        }
                    />
                </div>

                <div className="sign-up-text">
                    <p>
                        Already have an account?{" "}
                        <Button
                            type="button"
                            label="Log in here"
                            className="sign-up"
                            onClick={() => router.push("/pages/login")}
                        />
                    </p>
                </div>
            </form>
        </div>
    );
}
