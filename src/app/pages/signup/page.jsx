// src\app\auth\signup\page.jsx

"use client";

import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "react-feather";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/hooks/useUser";

export default function Signup() {
    const { updateUser, fetchUser } = useUser();
    const router = useRouter();

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

    const toggleModal = () => {
        setShowModal((prev) => !prev);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let civilityValue = value;
        if (name === "civility") {
            civilityValue = value === "Monsieur";
        }
        setUser((prevData) => ({
            ...prevData,
            [name]: civilityValue,
        }));
    };

    const handleEmailChange = (e) => {
        setEmailError("");
        handleInputChange(e);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !user.name ||
            !user.email ||
            !user.password ||
            !user.avatarId ||
            !user.naissance
        ) {
            console.error("All fields are required");
            return;
        }
        try {
            const token = localStorage.getItem("token");
            const result = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
                user,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            if (result.status === 201) {
                const authentication = result.data;
                updateUser(authentication.newUserWithoutPassword);
                localStorage.setItem("token", authentication.token);
                fetchUser();
                toggleModal();
                setTimeout(() => {
                    router.push("/");
                }, 3000);
            } else {
                console.error("Error during registration", result);
            }
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setEmailError(err.response.data.message);
            } else {
                console.error("Error during registration:", err);
            }
        }
    };

    return (
        <main className="signUpPageMockupGuest">
            <section className="searchDisplaySection">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="signUpWrapper">
                        <div className="inputs">
                            <div className="inputContainer">
                                <input
                                    type="text"
                                    name="name"
                                    className="input"
                                    value={user.name}
                                    onChange={handleInputChange}
                                    placeholder="Name"
                                />
                            </div>
                            <div className="inputContainer">
                                <input
                                    type="email"
                                    name="email"
                                    className={`input ${user.email && !emailRegex.test(user.email) ? "errorEmail" : ""
                                        }`}
                                    value={user.email}
                                    onChange={handleEmailChange}
                                    placeholder="Mail address"
                                />
                                {emailError && <p className="errorMessage">{emailError}</p>}
                            </div>
                            <div className="inputContainer">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className={`input ${user.password && user.password.length < 8 ? "errorPassword" : ""
                                        }`}
                                    minLength="8"
                                    value={user.password}
                                    onChange={handleInputChange}
                                    placeholder="Password"
                                />
                                <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                                {user.password && user.password.length < 8 && (
                                    <p className="errorMessage">8 characters at least</p>
                                )}
                            </div>
                            <div className="inputContainer">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className={`input ${confirmPassword && user.password !== confirmPassword ? "errorPassword" : ""
                                        }`}
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    placeholder="Password Confirmation"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                >
                                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>
                        <div className="additionalInformation">
                            <h4 className="orientation">Gender :</h4>
                            <div className="orientationContainer">
                                <div className="orientationOption">
                                    <label className="orientationText">
                                        Female {" "}
                                        <input
                                            name="civility"
                                            type="radio"
                                            value="Madame"
                                            className="radioButton"
                                            onChange={handleInputChange}
                                            checked={user.civility === "Madame"}
                                        />
                                    </label>
                                </div>
                                <div className="orientationOption">
                                    <label className="orientationText">
                                        Male {" "}
                                        <input
                                            name="civility"
                                            type="radio"
                                            className="radioButton"
                                            onChange={handleInputChange}
                                            value="Monsieur"
                                            checked={user.civility === "Monsieur"}
                                        />
                                    </label>
                                </div>
                            </div>
                            <h4 className="birthday">Date of birth :</h4>
                            <div className="orientationContainer">
                                <input
                                    className="inputDate"
                                    type="date"
                                    max={new Date().toISOString().split("T")[0]}
                                    name="naissance"
                                    value={user.naissance}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="buttonContainer">
                            <button
                                className="signUpButton"
                                type="submit"
                                disabled={
                                    !user.name ||
                                    !user.email ||
                                    !user.password ||
                                    !user.naissance ||
                                    user.password.length < 8 ||
                                    user.password !== confirmPassword
                                }
                            >
                                <p className="inscription">Sign up</p>
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    );
}
