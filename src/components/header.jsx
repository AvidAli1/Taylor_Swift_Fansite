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
    <header className="w-full bg-[#8a9ad4] py-0 md:py-1 px-1.5 sm:px-5 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-0 md:gap-6">
        {/* Logo section */}
        <div className="w-full flex justify-center md:justify-start md:w-[55%]">
          <div 
            className="w-full max-w-[425px] md:max-w-[600px] cursor-pointer mb-0 md:mb-0" 
            onClick={handleLogoClick}
          >
            <img 
              src="/images/swift_lore.png" 
              alt="Swift Lore" 
              className="w-full h-auto object-contain min-h-[170px] max-h-[170px] md:min-h-[300px] md:max-h-[300px]"
            />
          </div>
        </div>

        {/* Content section */}
        <div className="w-full md:w-2/5 flex flex-col items-center md:items-start gap-3 md:gap-5 md:mt-1.5 text-center md:text-left"> 
          <div className="w-64 md:w-full md:max-w-md">
            <p className="text-white text-xs md:text-sm leading-tight md:leading-relaxed text-left 
              -translate-y-5 md:translate-y-0">
              A fan-crafted, interactive timeline<br className="md:hidden" />
              chronicling the epic life and career of Taylor<br className="md:hidden" />
              Swift. Covering everything from albums,<br className="md:hidden" />
              Easter Eggs, dating history and more!
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-64 md:w-full md:max-w-md -translate-y-3 md:translate-y-0">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search events, locations, categories..."
                value={searchQuery}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="w-full rounded-full py-1.5 md:py-2.5 pl-7 md:pl-8 pr-2.5 md:pr-3 text-xs bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                inputMode="search"
                enterKeyHint="search"
                autoCapitalize="none" // Prevent mobile auto-capitalization
                autoCorrect="off"
                spellCheck="false"
              />
              <button 
                type="submit"
                className="absolute inset-y-0 left-1.5 md:left-2.5 flex items-center pointer-events-auto hover:text-gray-600 transition-colors"
              >
                <svg
                  className="h-3.5 w-3.5 md:h-4 md:w-4 text-gray-400"
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
                  className="absolute inset-y-0 right-2.5 flex items-center"
                  onClick={() => {
                    setSearchQuery("")
                    navigate('/')
                  }}
                >
                  <svg
                    className="h-3.5 w-3.5 md:h-4 md:w-4 text-gray-500"
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
            className="bg-[#b66b6b] text-white hover:bg-[#a55e5e] rounded-full px-3.5 md:px-6 py-1.5 md:py-2.5 font-semibold text-xs w-40 md:w-auto mb-1.5 -translate-y-1.5 md:translate-y-0"
            onClick={() => navigate("/posts")}
          >
            View Full Timeline
          </button>
        </div>
      </div>
    </header>
  )
}