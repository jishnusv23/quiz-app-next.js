"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";
import { FaBars } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";
import { useTheme } from "../ui/theme-provider";
import { Player } from "@lottiefiles/react-lottie-player";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <nav className="flex bg-background  border-gray-200  justify-between lg:px-40 py-3 shadow-md fixed w-full z-50">
      <div
        className={`flex items-center cursor-pointer ${
          theme === "light"
            ? "bg-gradient-to-r from-pink-700 to-blue-500 bg-clip-text text-transparent"
            : "bg-gradient-to-r from-pink-600 to-blue-500 bg-clip-text text-transparent"
        }`}
      >
        <span className="font-extrabold text-3xl leading-none">ALGO</span>
    

        <span className="font-extrabold text-3xl leading-none">ARENA</span>
      </div>

      <div className="flex items-center gap-5">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 font-semibold text-sm cursor-pointer">
          <Link
            href="/"
            className="hover:text-violet-200  text-primary  transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/quiz"
            className="hover:text-violet-200 text-primary transition-colors duration-200"
          >
            Quiz
          </Link>
          <Link
            href="/contact"
            className="hover:text-violet-200 text-primary transition-colors duration-200"
          >
            Contact Us
          </Link>
          <Link
            href="/login"
            className="hover:text-violet-200 text-primary transition-colors duration-200"
          >
            Login
          </Link>
          <ModeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center gap-6">
          <ModeToggle />
          <button
            onClick={toggleMenu}
            className="text-xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <FaBars />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 lg:hidden">
            <div className="flex flex-col p-4 gap-4">
              <Link
                href="/"
                className="hover:text-violet-200 text-primary transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/quiz"
                className="hover:text-violet-200 text-primary transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Quiz
              </Link>
              <Link
                href="/contact"
                className="hover:text-violet-200 text-blue-600 transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                href="/login"
                className="hover:text-violet-200 text-blue-600 transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
