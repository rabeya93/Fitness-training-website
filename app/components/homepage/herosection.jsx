import Image from "next/image";
import Heroimage from "@/app/assets/banner.png";

const HeroSection = () => {
  return (
    <section className="mx-auto w-full bg-[#0b0c0e] px-5 py-10 sm:px-8 sm:py-12 lg:px-[22px] lg:py-[42px]">
      <div className="relative mx-auto grid min-h-100 w-full items-center gap-8 bg-[#15161b] px-6 py-10 sm:px-10 md:grid-cols-[1.35fr_0.65fr] md:px-12 lg:min-h-[408px] lg:px-[51px] lg:py-12">
        {/* LEFT: Content */}
        <div className="relative z-10">
          <p className="text-[11px] font-bold tracking-[0.16em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="mt-6 max-w-160 font-heading text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.035em] text-white sm:text-5xl lg:text-[60px]">
            Train with intent.Log <br /> every set.
          </h1>

          <p className="mt-5 max-w-[460px] text-sm leading-[1.55] text-[#9ca3af] sm:text-[15px]">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="mt-6 inline-flex min-h-[37px] items-center justify-center rounded-md bg-[#ccff00] px-[22px] py-3 text-[11px] font-bold text-black transition-colors hover:bg-[#b8e600] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ccff00]"
          >
            BROWSE WORKOUTS
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-6-6m6 6l6-6" />
            </svg>
          </a>
        </div>

        {/* RIGHT: Hero Image */}
        <div className="flex items-center justify-center md:justify-end">
          <Image
            src={Heroimage}
            alt="Athlete using a preacher curl machine"
            priority
            className="aspect-square w-60 shrink-0 object-contain sm:w-72 lg:w-[334px]"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
