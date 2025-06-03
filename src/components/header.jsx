"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState("")
  
  // Sync search query with URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const queryFromUrl = urlParams.get('q')
    if (queryFromUrl) {
      setSearchQuery(queryFromUrl)
    }
  }, [location.search])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      navigate('/') // Clear search if query is empty
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

  // Clear search and navigate home
  const handleLogoClick = () => {
    setSearchQuery("")
    navigate('/')
  }

  return (
    <header className="w-full bg-[#8a9ad4] py-1 md:py-2 px-2 sm:px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-0 md:gap-8">
        {/* Logo section */}
        <div className="w-full flex justify-center md:justify-start md:w-[55%]">
          <div 
            className="w-full max-w-[500px] md:max-w-[700px] cursor-pointer mb-0 md:mb-0" 
            onClick={handleLogoClick}
          >
            <img 
              src="/images/swift_lore.png" 
              alt="Swift Lore" 
              className="w-full h-auto object-contain min-h-[200px] max-h-[200px] md:min-h-[350px] md:max-h-[350px]"
            />
          </div>
        </div>

        {/* Content section */}
        <div className="w-full md:w-2/5 flex flex-col items-center md:items-start gap-6 md:gap-6 md:mt-2 text-center md:text-left"> 
          <div className="w-72 md:w-full md:max-w-md">
            <p className="text-white text-sm md:text-base leading-tight md:leading-relaxed mb-1 md:mb-2 text-left">
              A fan-crafted, interactive timeline<br className="md:hidden" />
              chronicling the epic life and career of Taylor<br className="md:hidden" />
              Swift. Covering everything from albums,<br className="md:hidden" />
              Easter Eggs, dating history and more!
            </p>
          </div>

          {/* Improved Search */}
          <div className="w-72 md:w-full md:max-w-md">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search events, locations, categories..."
                value={searchQuery}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="w-full rounded-full py-2 md:py-3 pl-8 md:pl-10 pr-3 md:pr-4 text-sm bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                inputMode="search" // Better mobile keyboard
                enterKeyHint="search" // Mobile keyboard action
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
              {/* Clear button when text is present */}
              {searchQuery && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => {
                    setSearchQuery("")
                    navigate('/')
                  }}
                >
                  <svg
                    className="h-4 w-4 md:h-5 md:w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
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