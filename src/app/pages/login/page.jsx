// src\app\pages\login\page.jsx

"use client";

import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "react-feather";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import "primeicons/primeicons.css";
import { useUser } from "@/app/hooks/useUser";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { updateUser } = useUser();
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        user
      );
      if (response.status === 200) {
        updateUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.IsAdmin) {
          localStorage.setItem("isAdminMode", false);
        }
        router.push("/");
      }
    } catch (err) {
      console.error("Incorrect email or password", err);
    }
  };

  return (
    <div className="login-page">
      <form className="form" onSubmit={handleLogin}>
        <div className="inputs">
          <InputText
            type="email"
            className="input"
            name="email"
            value={user.email}
            placeholder="Email"
            onChange={handleInputChange}
          />
          <div className="input-container p-inputgroup">
            <InputText
              type={showPassword ? "text" : "password"}
              name="password"
              value={user.password}
              className="input-password"
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
          <div className="buttonContainer">
            <button type="submit" className="connection">
              Log in
            </button>
          </div>
        </div>
        <div className="sign-up-text">
          <p className="no-account">
            You don't have an account?{" "}
            <Button label="Sign up here" className="sign-up" onClick={() => router.push("/pages/signup")} />{" "}
            to get access to all the movies.
          </p>
        </div>
      </form>
    </div>
  );
}
