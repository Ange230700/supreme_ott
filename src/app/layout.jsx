// src\app\layout.jsx

import PropTypes from "prop-types";
import NavBarDesktop from "./components/NavBarDesktop";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./styles/globals.css";

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
        <div className="hidden md:block">
          <NavBarDesktop />
        </div>
        {children}
        <Footer />
        <div className="md:hidden">
          <NavBar />
        </div>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
