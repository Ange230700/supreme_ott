// src\app\pages\signup\page.jsx

"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import { useUser } from "@/app/hooks/useUser";
import PasswordInput from "@/app/components/login/PasswordInput";
import RadioGroup from "@/app/components/signup/RadioGroup";

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
                    {emailError && <p className="error-message">{emailError}</p>}
                    <PasswordInput
                        name="password"
                        value={user.password}
                        placeholder="Password"
                        onChange={handleInputChange}
                        className="input-password"
                    />
                    <PasswordInput
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input-password"
                    />
                    <InputText
                        type="date"
                        className="input"
                        name="naissance"
                        value={user.naissance}
                        placeholder="Date of Birth"
                        onChange={handleInputChange}
                        max={new Date().toISOString().split("T")[0]}
                    />
                    <RadioGroup
                        name="civility"
                        options={["Male", "Female"]}
                        selectedValue={user.civility}
                        onChange={handleInputChange}
                    />
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
