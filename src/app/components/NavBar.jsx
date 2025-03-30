// src\app\components\NavBar.jsx

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// import { useUser } from "../contexts/UserContext";

export default function NavBar() {
  // const { user } = useUser();
  const pathname = usePathname();
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  // const changeProfile = () => {
  //   if (user?.IsAdmin) return "/Parametre";
  //   if (user) return "/profil";
  //   return "/connection";
  // };

  // Apply fixed bottom styling when on specific routes (using Tailwind classes)
  const navBarClasses =
    pathname &&
      (pathname.includes("/movies/") ||
        pathname.includes("/profil") ||
        pathname.includes("/Parametre") ||
        pathname.includes("/addvideos") ||
        pathname.includes("/AjoutAdmin") ||
        pathname.includes("/EditVideo/"))
      ? "fixed bottom-0 left-0 right-0 z-50 bg-[hsla(210,89%,7%,1)]"
      : "";

  return (
    <nav className={`navbar ${navBarClasses} md:hidden`}>
      <section className="flex justify-around p-4">
        <div className="nav-icon-container">
          <Link href="/" className="div-icon">
              <Image
                src={`${backendUrl}/assets/icons/home_icon.svg`}
                alt="home icon"
                width={24}
                height={24}
                className="icon"
                />
          </Link>
        </div>
        <div className="nav-icon-container">
          <Link href="/search" className="div-icon">
              <Image
                src={`${backendUrl}/assets/icons/search_icon.svg`}
                alt="search icon"
                width={24}
                height={24}
                className="icon"
                />
          </Link>
        </div>
        {/* <div className="nav-icon-container">
          <Link href={changeProfile()} className="div-icon">
              {user ? (
                <Image
                src={
                  (user.avatar_filename &&
                      `${backendUrl}/assets/images/${user.avatar_filename}`) ||
                    user.avatar_url ||
                    "https://avatars.githubusercontent.com/u/97165289"
                  }
                  alt="avatar"
                  width={24}
                  height={24}
                  className="icon rounded-full"
                  />
              ) : (
                <Image
                src={`${backendUrl}/assets/icons/profile_icon.svg`}
                alt="connexion"
                width={24}
                height={24}
                className="icon"
                />
              )}
          </Link>
        </div> */}
      </section>
    </nav>
  );
}

