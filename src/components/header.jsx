"use client"

import { useNavigate } from "react-router-dom"

export default function Header() {
  const navigate = useNavigate()
  return (
    <header className="w-full bg-[#8a9ad4] py-4 md:py-6 px-2 sm:px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
        {/* Left: Swift Lore Image */}
        <div className="w-full flex justify-center md:justify-start md:w-3/5 py-2">
          <div className="w-[85%] sm:w-[90%] md:w-full">
            <img src="/images/swift_lore.png" alt="Swift Lore" className="w-full h-auto" style={{ maxWidth: "none" }} />
          </div>
        </div>

        {/* Right: Text + Search + Button */}
        <div className="w-full md:w-2/5 flex flex-col items-center md:items-start gap-5 mt-1 md:mt-0 text-center md:text-left">
          <div className="w-full max-w-md">
            <p className="text-white text-lg sm:text-xl md:text-lg leading-relaxed mb-2">
              A fan-crafted, interactive timeline chronicling the epic life and career of Taylor Swift. Covering
              everything from albums, Easter Eggs, dating history and more!
            </p>
          </div>

          <div className="w-full max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search and decode the lore!"
                className="w-full rounded-full py-3 pl-10 pr-4 text-sm bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
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
            className="bg-white text-[#8a9ad4] hover:bg-white/90 rounded-full px-8 py-3 font-medium text-base"
            onClick={() => navigate("/posts")}
          >
            View Full Timeline
          </button>
        </div>
      </div>
    </header>
  )
}