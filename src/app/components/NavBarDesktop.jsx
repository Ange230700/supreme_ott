// src\app\components\NavBarDesktop.jsx

"use client";

import Link from "next/link";
import Image from "next/image";
// import { useUser } from "../contexts/UserContext";
// import ToggleSwitch from "./ToggleSwitch";

export default function NavBarDesktop() {
    // const { user } = useUser();
    // const backendUrl = process.env.NEXT_PUBLIC_API_URL;

    // const changeProfile = () => {
    //     if (user?.IsAdmin) return "/Parametre";
    //     if (user) return "/profil";
    //     return "/connection";
    // };

    return (
        <nav className="navbar-desktop">
            <Link href="/" className="logo-container">
                <Image
                    className="logo"
                    src="/assets/icons/logo.svg"
                    alt="logo"
                    fill
                    priority={true}
                    style={{ objectFit: "contain" }}
                />
            </Link>
            <div className="links-container">
                <Link href="/search" className="link">
                    <p className="link-text">Search</p>
                </Link>
                {/* {user?.IsAdmin && (
                    <div className="switchContainer flex items-center space-x-2">
                        <h6 className="text-sm">Administrator mode:</h6>
                        <ToggleSwitch user={user} />
                    </div>
                )} */}
                <Link href="/login" className="link">
                    {/* {user ? (
                        <Image
                            className="icon rounded-full"
                            src={
                                (user.avatar_filename &&
                                    `${backendUrl}/assets/images/${user.avatar_filename}`) ||
                                user.avatar_url ||
                                "https://avatars.githubusercontent.com/u/97165289"
                            }
                            alt="avatar"
                            width={32}
                            height={32}
                        />
                    ) : ( */}
                    {/* <Image
                        className="icon"
                        src={`${backendUrl}/assets/icons/profile_icon.svg`}
                        alt="connexion"
                        width={32}
                        height={32}
                    /> */}
                    <p className="link-text">Login</p>
                    {/* )} */}
                </Link>
            </div>
        </nav>
    );
}
