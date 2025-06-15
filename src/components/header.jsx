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
    const trimmedQuery = searchQuery.trim()
    
    if (!trimmedQuery) {
      navigate('/')
      return
    }

    // Force first letter uppercase (e.g., "travis" → "Travis")
    const formattedQuery = 
      trimmedQuery.charAt(0).toUpperCase() + trimmedQuery.slice(1)
    
    navigate(`/?q=${encodeURIComponent(formattedQuery)}`)
  }

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e)
    }
  }

  const handleLogoClick = () => {
    setSearchQuery("")
    navigate('/')
  }

  return (
   <header className="w-full bg-[#8a9ad4] py-0 md:py-0.5 px-1 sm:px-3 md:px-5 relative overflow-visible z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-0 md:gap-4">
          
          {/* Logo section - Bigger mobile logo */}
          <div className="w-full flex justify-center md:justify-start md:w-[55%] relative z-20 overflow-visible">
            <div
              className="w-full max-w-[600px] md:max-w-[900px] cursor-pointer mb-0 md:mb-0 -mt-4 md:-mt-10 transform tranlate-y-0 md:translate-y-5" 
              onClick={handleLogoClick}
            >
              <img 
                src="/images/swift_lore.png" 
                alt="Swift Lore" 
                className="w-full h-auto object-contain min-h-[250px] max-h-[250px] md:min-h-[260px] md:max-h-[260px]"
              />
            </div>
          </div>
 
        {/* Content section - Better mobile layout */}
        <div className="w-full md:w-2/5 flex flex-col items-center md:items-start gap-2 md:gap-3.5 md:mt-1 text-center md:text-left transform -translate-y-5 md:translate-y-0"> 
          <div className="w-64 md:w-full md:max-w-xs">
            <p className="text-white text-[10px] md:text-xs leading-tight md:leading-relaxed text-justfiy 
              -translate-y-3.5 md:translate-y-0">
              A fan-crafted, interactive timeline chronicling the epic life and career of Taylor Swift.
              Explore everything from album releases and Easter Eggs to dating history and iconic moments. 
              Dive into the lore!
            </p>
          </div>

          {/* Search Bar - Longer on mobile */}
          <div className="w-64 md:w-full md:max-w-xs -translate-y-2 md:translate-y-0">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search events, locations, categories..."
                value={searchQuery}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="w-full rounded-full py-1 md:py-1.5 pl-5 md:pl-6 pr-2 md:pr-2.5 text-[10px] md:text-xs bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                inputMode="search"
                enterKeyHint="search"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
              />
              <button 
                type="submit"
                className="absolute inset-y-0 left-1 md:left-1.5 flex items-center pointer-events-auto hover:text-gray-600 transition-colors"
              >
                <svg
                  className="h-2.5 w-2.5 md:h-3 md:w-3 text-gray-400"
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
              {searchQuery && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-1.5 flex items-center"
                  onClick={() => {
                    setSearchQuery("")
                    navigate('/')
                  }}
                >
                  <svg
                    className="h-2.5 w-2.5 md:h-3 md:w-3 text-gray-500"
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
            className="bg-[#b66b6b] text-white hover:bg-[#a55e5e] rounded-full px-2.5 md:px-4 py-1 md:py-1.5 font-semibold text-[10px] md:text-xs w-32 md:w-auto mb-1 -translate-y-1 md:translate-y-0"
            onClick={() => navigate("/posts")}
          >
            View Full Timeline
          </button>
        </div>
      </div>
    </header>
  )
}