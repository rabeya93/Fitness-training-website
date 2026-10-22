import Image from "next/image";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-[#0b0c0e] my-4">
      <div className="mx-auto flex min-h-12 max-w-10xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="FitLog logo"
            width={18}
            height={18}
            className="h-[18px] w-[18px]"
          />
          <span className="font-heading text-xs font-bold tracking-wide text-white">
            FITLOG
          </span>
        </div>

        <p className="text-center text-[12px] text-gray-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
