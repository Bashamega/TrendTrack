"use client";
import Logo from "@/assets/Logo.svg";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 w-screen sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="container mx-auto flex justify-start items-center">
          <Image src={Logo} alt="Logo" />
          <Link href="/" className="uppercase pl-4">
            Trend Track
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
        <div
          className={`md:flex space-x-4 ${isOpen ? "block" : "hidden"} md:block`}
        >
          <div className="flex space-x-4 items-center mr-6">
            <Link
              href="https://github.com/Bashamega/TrendTrack"
              target="_blank"
              className="flex items-center"
            >
              <FaGithub className="mr-2" /> Github
            </Link>
            <Link
              href="https://github.com/EddieHubCommunity/github-trending-repos"
              className="hover:underline mr-4"
            >
              API
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
