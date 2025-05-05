import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="w-full bg-[#8a9ad4] py-6 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-center gap-6">
        {/* Left: Swift Lore Image */}
        <div className="w-full md:w-3/5 flex justify-center md:justify-end">
          <img
            src="/images/swift_lore.png"
            alt="Swift Lore"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto object-contain"
          />
        </div>

        {/* Right: Text + Search + Button */}
        <div className="w-full md:w-2/5 flex flex-col items-center md:items-start gap-4 mt-4 md:mt-0 text-center md:text-left">
          <p className="text-white text-base sm:text-lg md:text-base leading-relaxed">
            A fan-crafted, interactive timeline
            <br />
            chronicling the epic life and career of
            <br />
            Taylor Swift. Covering everything from
            <br />
            albums, Easter Eggs, dating history
            <br />
            and more!
          </p>

          <div className="w-full max-w-sm">
            <div className="relative">
              <input
                type="text"
                placeholder="Search and decode the lore!"
                className="w-full rounded-full py-2 pl-10 pr-4 text-sm bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </div>
            </div>
          </div>

          <button
            className="bg-white text-[#8a9ad4] hover:bg-white/90 rounded-full px-6 py-2 font-medium"
            onClick={() => navigate("/posts")}
          >
            View Full Timeline
          </button>
        </div>
      </div>
    </header>
  );
}
