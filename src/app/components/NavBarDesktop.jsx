// src\app\components\NavBarDesktop.jsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { User } from "@deemlol/next-icons";
// import { useUser } from "../contexts/UserContext";
// import ToggleSwitch from "./ToggleSwitch";

export default function NavBarDesktop() {
    // const { user } = useUser();
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;

    // const changeProfile = () => {
    //     if (user?.IsAdmin) return "/Parametre";
    //     if (user) return "/profil";
    //     return "/connection";
    // };

    return (
        <div className="navbar-desktop hidden md:flex items-center justify-between p-4">
            <Image
                className="logo"
                src="/assets/icons/logo.svg"
                alt="logo"
                width={48}
                height={48}
            />
            <div className="links-container flex items-center space-x-4">
                <Link href="/" className="link">
                    <p className="link-text text-lg font-semibold">Home</p>
                </Link>
                <Link href="/search" className="link">
                    <p className="link-text text-lg font-semibold">Research</p>
                </Link>
                {/* {user?.IsAdmin && (
                    <div className="switchContainer flex items-center space-x-2">
                        <h6 className="text-sm">Admin mode:</h6>
                        <ToggleSwitch user={user} />
                    </div>
                )} */}
                <Link href="/" className="link">
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
                    <User size={24} color="#FFFFFF" />
                    {/* )} */}
                </Link>
            </div>
        </div>
    );
}
