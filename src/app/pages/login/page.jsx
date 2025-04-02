// src\app\pages\login\page.jsx

"use client";

import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "react-feather";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
      toast.error("Incorrect email or password");
      console.error("Incorrect email or password", err);
    }
  };

  return (
    <div className="loginPage">
      <form className="form" onSubmit={handleLogin}>
        <div className="inputs">
          <div className="inputContainer">
            <input
              type="text"
              className="input"
              name="email"
              value={user.email}
              placeholder="Mail address:"
              onChange={handleInputChange}
            />
          </div>
          <div className="inputContainer">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={user.password}
              className="input"
              placeholder="Password:"
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <div className="buttonContainer">
            <button type="submit" className="connexion">
              Log in
            </button>
          </div>
        </div>
        <div className="signUpText">
          <p className="tuNAsPasDeCompte">
            You don't have an account?{" "}
            <Link href="/pages/signup">
              <span className="inscrisToiIci">Sign up here</span>
            </Link>{" "}
            to get access to all the movies.
          </p>
        </div>
      </form>
    </div>
  );
}
