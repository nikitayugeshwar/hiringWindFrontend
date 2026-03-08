"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-md py-3" : "bg-black py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo with gradient */}
          <Link href="/" className="group">
            <h1 className="text-2xl sm:text-3xl font-bold font-serif">
              <span className="bg-gradient-to-r from-white via-pink-500 to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Hiring Wind
              </span>
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#how-it-works">How It Works</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#contact">Contact</NavLink>

            <div className="flex items-center space-x-4 ml-4">
              <Link
                href="/student"
                className="px-5 py-2 text-pink-500 border border-pink-500 rounded-lg hover:bg-pink-500 hover:text-white transition-all duration-300"
              >
                Student
              </Link>
              <Link
                href="/company"
                className="px-5 py-2 bg-gradient-to-r from-pink-600 to-pink-400 text-white rounded-lg hover:from-pink-700 hover:to-pink-500 transition-all duration-300 shadow-lg shadow-pink-500/25"
              >
                Company
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-pink-500 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-96 mt-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col space-y-3 py-4 border-t border-pink-500/20">
            <MobileNavLink href="/" onClick={() => setIsOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink href="#features" onClick={() => setIsOpen(false)}>
              Features
            </MobileNavLink>
            <MobileNavLink
              href="#how-it-works"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </MobileNavLink>
            <MobileNavLink href="#about" onClick={() => setIsOpen(false)}>
              About
            </MobileNavLink>
            <MobileNavLink href="#contact" onClick={() => setIsOpen(false)}>
              Contact
            </MobileNavLink>

            <div className="flex flex-col space-y-2 pt-2">
              <Link
                href="/student"
                className="text-center px-4 py-2 text-pink-500 border border-pink-500 rounded-lg hover:bg-pink-500 hover:text-white transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Student Login
              </Link>
              <Link
                href="/company"
                className="text-center px-4 py-2 bg-gradient-to-r from-pink-600 to-pink-400 text-white rounded-lg hover:from-pink-700 hover:to-pink-500 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Company Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }) => (
  <Link
    href={href}
    className="text-gray-300 hover:text-pink-500 transition-colors duration-300 text-sm font-medium"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ href, onClick, children }) => (
  <Link
    href={href}
    onClick={onClick}
    className="text-gray-300 hover:text-pink-500 transition-colors duration-300 block py-2"
  >
    {children}
  </Link>
);

export default Navbar;
