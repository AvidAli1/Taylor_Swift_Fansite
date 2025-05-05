"use client";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="relative w-full bg-[#8a9ac7] py-6 sm:py-8 md:py-10 lg:py-12 overflow-hidden">
      {/* Right decorative swirl - hidden on small screens, smaller on medium screens */}
      <div className="absolute right-0 top-20 md:top-0 h-full w-1/5 sm:w-1/4 pointer-events-none">
        <img
          src="/images/decor_2.png"
          alt=""
          className="h-full w-full object-contain object-right"
          aria-hidden="true"
        />
      </div>

      {/* Content - responsive padding and width */}
      <div className="relative z-10 flex flex-col items-start justify-center text-start px-4 sm:px-6 md:px-10 lg:ml-32 max-w-full sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%]">
        <h1 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white font-medium mb-2 pr-4 sm:pr-0">
          Taylor performs at the Philadelphia 76ers NBA game
        </h1>
        <h3 className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl text-white font-medium mb-4">
          Apr-05-2022
        </h3>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto">
          <button
            onClick={() => navigate("/posts")}
            className="inline-flex items-center justify-center w-[290px] sm:w-[240px] rounded-full border border-white/70 bg-transparent px-4 sm:px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Back to Timeline
          </button>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center w-[290px] sm:w-[240px] rounded-full border border-white/70 bg-transparent px-4 sm:px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Return to Home
          </button>
        </div>
      </div>
    </header>
  );
}
