"use client";
import { useState } from "react";
import Image from "next/image";
import logo from '../assets/logo.png'

const links = ["Workouts", "My Plan"];

const Navbar = ({ planCount = 0, savedCount = 0 }) => {
  const [active, setActive] = useState("Workouts");

  return (
    // Full-width bar
    <header className="border-b border-white/5 bg-[#0b0b0d]">
      {/* Same container as <main> so the edges line up */}
      <div className="navbar mx-auto min-h-22 max-w-10xl px-4 sm:px-6 lg:px-8">
        {/* LEFT: hamburger (mobile only) + logo */}
        <div className="navbar-start">
          <div className="dropdown md:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-square btn-sm mr-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu dropdown-content z-10 mt-3 w-44 rounded-box border border-white/10 bg-[#17181c] p-2 shadow"
            >
              {links.map((link) => (
                <li key={link}>
                    <a 
                        onClick={() => setActive(link)}
                        className={active === link ? "text-[#ccff00] font-semibold" : "text-gray-300"}
                        >
                            {link}
                    </a>
                </li>
              ))}
            </ul>
          </div>

          <a className="flex items-center gap-2 text-lg font-bold tracking-wide">
            <Image src={logo} alt="FitLog logo" width={24} height={24} className="h-6 w-6" />
                <p className="text-white">FITLOG</p>
          </a>
        </div>

        {/* CENTER: tabs (tablet and up) */}
        <div className="navbar-center hidden md:flex">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link}>
                <button
                  onClick={() => setActive(link)}
                  className={`rounded-full px-4 py-1.5 text-sm transition ${
                    active === link
                      ? "bg-[#c6ff00]/10 text-[#c6ff00]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: Plan + Saved counters */}
        <div className="navbar-end gap-4 text-sm">
          <span className="flex items-center gap-2 text-gray-300">
            Plan
            <span className="badge badge-sm border-0 bg-[#c6ff00] font-bold text-black">
              {planCount}
            </span>
          </span>
          <span className="flex items-center gap-2 text-gray-500">
            Saved
            <span className="badge badge-sm border-white/10 bg-transparent text-white">
              {savedCount}
            </span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
