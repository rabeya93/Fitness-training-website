import { Suspense } from "react";
import HeroSection from "./components/homepage/herosection.jsx";
import LibrarySection from "./components/LibrarySection";

export default function Home() {
  return (
    <div>
      <HeroSection />

      <Suspense
        fallback={
          <section className="bg-[#0b0c0e] px-5 py-12 text-center text-sm text-gray-400 sm:px-8 lg:px-10">
            Loading workout library...
          </section>
        }
      >
        <LibrarySection />
      </Suspense>
    </div>
  );
}
