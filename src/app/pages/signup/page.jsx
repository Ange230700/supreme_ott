// src\app\pages\signup\page.jsx

"use client";

import { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import CustomToast from "@/app/components/CustomToast";
import { useUser } from "@/app/hooks/useUser";
import PasswordInput from "@/app/components/login/PasswordInput";
import RadioGroup from "@/app/components/signup/RadioGroup";

export default function Signup() {
    const router = useRouter();
    const { updateUser, fetchUser } = useUser();
    const toast = useRef(null);

    const [user, setUser] = useState({
        name: "",
        email: "",
        naissance: "",
        civility: "",
        password: "",
        avatar_url: "",
    });
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.password !== confirmPassword) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Passwords do not match",
                life: 3000,
            });
            return;
        }

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
                toast.current.show({
                    severity: "success",
                    summary: "Success",
                    detail: "Registration successful",
                    life: 3000,
                });
                router.push("/");
            }
        } catch (err) {
            const errorDetail =
                err.response?.data.error ||
                "Registration failed, please try again.";
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: errorDetail,
                life: 3000,
            });
            console.error("Registration failed", err);
        }
    };

    const isFormInvalid =
        !user.name ||
        !user.email ||
        !user.password ||
        user.password.length < 8 ||
        user.password !== confirmPassword ||
        !user.naissance ||
        !user.civility ||
        !user.avatar_url;

    return (
        <div className="signup-page">
            <CustomToast ref={toast} />
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
                    <InputText
                        type="text"
                        className="input"
                        name="avatar_url"
                        value={user.avatar_url}
                        placeholder="Avatar URL"
                        onChange={handleInputChange}
                    />
                    <div className="button-container">
                        <Button
                            type="submit"
                            label="Sign up"
                            className="connection"
                            disabled={isFormInvalid}
                        />
                    </div>
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
