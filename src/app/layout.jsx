// src\app\layout.jsx

import PropTypes from "prop-types";

import NavBarDesktop from "./components/NavBarDesktop";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./styles/globals.css";
import { MovieProvider } from "./providers/MovieProvider";
import { CategoryProvider } from "./providers/CategoryProvider";
import { UserProvider } from "./providers/UserProvider";

export const metadata = {
  title: "OTT",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body
        style={{ fontFamily: '"Gabarito", sans-serif' }}
        className="antialiased body"
      >
        <div className="navbar-desktop-container">
          <NavBarDesktop />
        </div>
        <UserProvider>
          <CategoryProvider>
            <MovieProvider>
              <main className="main">
                {children}
              </main>
            </MovieProvider>
          </CategoryProvider>
        </UserProvider>
        <Footer />
        <div className="navbar-container">
          <NavBar />
        </div>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
