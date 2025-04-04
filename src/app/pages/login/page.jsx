// src\app\pages\login\page.jsx

"use client";

import { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Toast } from "primereact/toast";
import "primeicons/primeicons.css";
import { useUser } from "@/app/hooks/useUser";
import PasswordInput from "@/app/components/login/PasswordInput";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const { updateUser } = useUser();
  const router = useRouter();
  const toast = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  };

  const isFormInvalid = !user.email || !user.password;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        user
      );
      if (response.status === 200) {
        updateUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.IsAdmin) {
          localStorage.setItem("isAdminMode", false);
        }
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Login successful",
          life: 3000,
        });
        router.push("/");
      }
    } catch (err) {
      console.error("Incorrect email or password", err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Incorrect email or password",
        life: 3000,
      });
    }
  };

  return (
    <div className="login-page">
      <Toast ref={toast} />
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
          <PasswordInput
            name="password"
            value={user.password}
            placeholder="Password"
            onChange={handleInputChange}
            className="input-password"
          />
          <div className="button-container">
            <Button
              type="submit"
              label="Log in"
              className="connection"
              disabled={isFormInvalid}
            />
          </div>
        </div>
        <div className="sign-up-text">
          <p className="no-account">
            You don't have an account?{" "}
            <Button
              type="button"
              label="Sign up here"
              className="sign-up"
              onClick={() => router.push("/pages/signup")}
            />{" "}
            to get access to all the movies.
          </p>
        </div>
      </form>
    </div>
  );
}
