"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Header() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e)
    }
  }

  return (
    <header className="w-full bg-[#8a9ad4] py-1 md:py-2 px-2 sm:px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-0 md:gap-8"> {/* Changed gap to 0 for mobile */}
        {/* Left: Swift Lore Image with tighter spacing */}
        <div className="w-full flex justify-center md:justify-start md:w-[55%]">
          <div className="w-full max-w-[500px] md:max-w-[700px] cursor-pointer mb-0 md:mb-0" onClick={() => navigate('/')}>
            <img 
              src="/images/swift_lore.png" 
              alt="Swift Lore" 
              className="w-full h-auto object-contain min-h-[200px] max-h-[200px] md:min-h-[350px] md:max-h-[350px]"
            />
          </div>
        </div>

        {/* Right: Text + Search + Button */}
        <div className="w-full md:w-2/5 flex flex-col items-center md:items-start gap-6 md:gap-6 md:mt-2 text-center md:text-left"> 
          <div className="w-72 md:w-full md:max-w-md">
            <p className="text-white text-sm md:text-base leading-tight md:leading-relaxed mb-1 md:mb-2 text-left">
              A fan-crafted, interactive timeline<br className="md:hidden" />
              chronicling the epic life and career of Taylor<br className="md:hidden" />
              Swift. Covering everything from albums,<br className="md:hidden" />
              Easter Eggs, dating history and more!
            </p>
          </div>

          <div className="w-72 md:w-full md:max-w-md">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search and decode the lore!"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="w-full rounded-full py-2 md:py-3 pl-8 md:pl-10 pr-3 md:pr-4 text-sm bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button 
                type="submit"
                className="absolute inset-y-0 left-2 md:left-3 flex items-center pointer-events-auto hover:text-gray-600 transition-colors"
              >
                <svg
                  className="h-4 w-4 md:h-5 md:w-5 text-gray-400"
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
              </button>
            </form>
          </div>

          <button
            className="bg-[#b66b6b] text-white hover:bg-[#a55e5e] rounded-full px-4 md:px-7 py-2 md:py-3 font-semibold text-sm w-48 md:w-auto mb-2"
            onClick={() => navigate("/posts")}
          >
            View Full Timeline
          </button>
        </div>
      </div>
    </header>
  )
}