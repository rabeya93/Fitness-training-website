"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../assets/logo.png";
import { usePlan } from "../context/PlanContext";

const links = [
  { name: "Workouts", href: "/" },
  { name: "My Plan", href: "/my-plan" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { planIds, savedIds } = usePlan();

  // A link is active when we are on its page
  // (Workouts also stays active on /workouts/[id] detail pages)
  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/" || pathname.startsWith("/workouts")
      : pathname.startsWith(href);

  return (
    <header className="border-b border-white/5 bg-[#0b0b0d]">
      <div className="navbar mx-auto min-h-22 w-full max-w-7xl px-4 sm:px-6">
        {/* Logo + mobile menu */}
        <div className="navbar-start">
          <div className="dropdown md:hidden">
            <div
              tabIndex={0}
              role="button"
              aria-label="Open navigation menu"
              className="btn btn-ghost btn-square btn-sm mr-1 text-white"
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
              className="menu dropdown-content z-50 mt-3 w-48 rounded-box border border-white/10 bg-[#17181c] p-2 shadow-lg"
            >
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={
                      isActive(link.href)
                        ? "font-semibold text-[#ccff00]"
                        : "text-gray-300"
                    }
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="FitLog logo"
              width={24}
              height={24}
              className="h-6 w-6"
            />
            <span className="font-heading text-lg font-bold tracking-wide text-white">
              FITLOG
            </span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="navbar-center hidden md:flex">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    isActive(link.href)
                      ? "bg-[#ccff00]/10 text-[#ccff00]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Plan + Saved counters */}
        <div className="navbar-end gap-3 text-xs sm:gap-4 sm:text-sm">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-gray-300 sm:gap-2"
          >
            Plan
            <span className="badge badge-sm border-0 bg-[#ccff00] font-bold text-black">
              {planIds.length}
            </span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-1.5 text-gray-300 sm:gap-2"
          >
            Saved
            <span className="badge badge-sm border border-white/30 bg-transparent text-white">
              {savedIds.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
