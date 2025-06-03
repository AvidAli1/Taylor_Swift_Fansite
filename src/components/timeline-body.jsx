"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useLocation } from 'react-router-dom';

export default function TimelineBody() {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(null)
  const recordsPerPage = 12
  
  // Filter states
  const [sortOrder, setSortOrder] = useState("asc")
  const [filterKeywords, setFilterKeywords] = useState([]) // Changed to array
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [monthDay, setMonthDay] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  
  // Available keywords for dropdown
  const [allKeywords, setAllKeywords] = useState([])
  const [showKeywordDropdown, setShowKeywordDropdown] = useState(false)
  
  // Store pagination history
  const [offsetHistory, setOffsetHistory] = useState([null])
  const [currentOffsetIndex, setCurrentOffsetIndex] = useState(0)

  // Get search query from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const queryFromUrl = urlParams.get('q')
    if (queryFromUrl) {
      setSearchQuery(queryFromUrl)
    }
  }, [location.search])

  const handleCardClick = (postId) => {
    navigate(`/post_details?id=${postId}`);
  };

  // New function to handle tag clicks
  const handleTagClick = (keyword) => {
    if (!filterKeywords.includes(keyword)) {
      setFilterKeywords([...filterKeywords, keyword]);
    }
    resetPagination();
  };

  // Fetch all keywords for dropdown
  const fetchAllKeywords = async () => {
    try {
      const response = await axios.get(
        "https://api.airtable.com/v0/appVhtDyx0VKlGbhy/Taylor%20Swift%20Master%20Tracker",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`,
          },
          params: {
            maxRecords: 1000,
            fields: ['KEYWORDS'],
            view: "Grid view",
          },
        }
      )
      
      const keywordSet = new Set()
      response.data.records.forEach(record => {
        if (record.fields.KEYWORDS) {
          record.fields.KEYWORDS.forEach(keyword => {
            keywordSet.add(keyword)
          })
        }
      })
      
      setAllKeywords(Array.from(keywordSet).sort())
    } catch (error) {
      console.error("Error fetching keywords:", error)
    }
  }

  // Fetch keywords on component mount
  useEffect(() => {
    fetchAllKeywords()
  }, [])

  // Helper function to escape quotes
  const escapeQuotes = (str) => str.replace(/"/g, '\\"').replace(/'/g, "\\'");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      
      try {
        let filterFormula = ""
        
        if (startDate && endDate) {
          filterFormula += `AND(IS_AFTER({DATE}, '${startDate}'), IS_BEFORE({DATE}, '${endDate}'))`
        } else if (startDate) {
          filterFormula += `IS_AFTER({DATE}, '${startDate}')`
        } else if (endDate) {
          filterFormula += `IS_BEFORE({DATE}, '${endDate}')`
        }
        
        if (monthDay) {
          const [month, day] = monthDay.split('/')
          if (filterFormula) {
            filterFormula = `AND(${filterFormula}, AND(MONTH({DATE}) = ${month}, DAY({DATE}) = ${day}))`
          } else {
            filterFormula = `AND(MONTH({DATE}) = ${month}, DAY({DATE}) = ${day})`
          }
        }
        
        // Improved keyword filter (multi-select)
        if (filterKeywords.length > 0) {
          const keywordFilters = filterKeywords.map(keyword => {
            const escapedKeyword = escapeQuotes(keyword);
            return `FIND(LOWER('${escapedKeyword.toLowerCase()}'), LOWER({KEYWORDS})) > 0`;
          }).join(',');
          filterFormula = filterFormula 
            ? `AND(${filterFormula}, OR(${keywordFilters}))` 
            : `OR(${keywordFilters})`;
        }
      
        
        // Improved search functionality
        if (searchQuery.trim()) {
          const escapedQuery = escapeQuotes(searchQuery.trim());
          const searchTerms = escapedQuery.split(/\s+/).filter(term => term.length > 0);
          
          const searchFilters = searchTerms.map(term => {
            const lowerTerm = term.toLowerCase();
            return `OR(
              FIND('${lowerTerm}', LOWER({EVENT})) > 0,
              FIND('${lowerTerm}', LOWER({LOCATION})) > 0,
              FIND('${lowerTerm}', LOWER({CATEGORY})) > 0
            )`;
          }).join(',');

          const searchFilter = `AND(${searchFilters})`;
          filterFormula = filterFormula 
            ? `AND(${filterFormula}, ${searchFilter})` 
            : searchFilter;
        }
        
        const currentOffset = offsetHistory[currentOffsetIndex]
        
        const response = await axios.get(
          "https://api.airtable.com/v0/appVhtDyx0VKlGbhy/Taylor%20Swift%20Master%20Tracker",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`,
            },
            params: {
              maxRecords: 100,
              pageSize: recordsPerPage,
              offset: currentOffset,
              filterByFormula: filterFormula || undefined,
              sort: [{ field: "DATE", direction: sortOrder }],
              view: "Grid view",
            },
          }
        )
        
        const hasMoreRecords = !!response.data.offset
        setHasMore(hasMoreRecords)
        
        if (hasMoreRecords) {
          if (currentOffsetIndex === offsetHistory.length - 1) {
            setOffsetHistory(prev => [...prev, response.data.offset])
          }
        }

        const formattedPosts = response.data.records.map(record => ({
          id: record.id,
          date: record.fields.DATE ? new Date(record.fields.DATE).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
          }) : 'No date',
          category: record.fields.CATEGORY || 'Uncategorized',
          title: record.fields.EVENT || 'Untitled Event',
          location: record.fields.LOCATION || 'Location unknown',
          image: record.fields.IMAGE?.[0]?.url || null,
          year: record.fields.DATE ? new Date(record.fields.DATE).getFullYear() : '',
          keywords: record.fields.KEYWORDS || []
        }))
        
        setPosts(formattedPosts)
        
      } catch (error) {
        console.error("Error fetching records:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [currentOffsetIndex, sortOrder, filterKeywords, startDate, endDate, monthDay, searchQuery])

  // Handle filter changes - reset pagination when filters change
  const handleSortChange = (order) => {
    setSortOrder(order)
    resetPagination()
  }

  const handleKeywordFilter = (keyword) => {
    if (filterKeywords.includes(keyword)) {
      setFilterKeywords(filterKeywords.filter(k => k !== keyword))
    } else {
      setFilterKeywords([...filterKeywords, keyword])
    }
  }

  const handleDateRangeChange = (start, end) => {
    setStartDate(start)
    setEndDate(end)
    resetPagination()
  }

  const handleMonthDayChange = (value) => {
    setMonthDay(value)
    resetPagination()
  }

  // Updated search handlers
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`)
    }
    resetPagination()
  }

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e)
    }
  }

  // Reset pagination when filters change
  const resetPagination = () => {
    setPage(1)
    setCurrentOffsetIndex(0)
    setOffsetHistory([null])
  }

  // Pagination handlers
  const handlePreviousPage = () => {
    if (currentOffsetIndex > 0) {
      setCurrentOffsetIndex(prev => prev - 1)
      setPage(prev => prev - 1)
      window.scrollTo(0, 0)
    }
  }
  
  const handleNextPage = () => {
    if (hasMore) {
      setCurrentOffsetIndex(prev => prev + 1)
      setPage(prev => prev + 1)
      window.scrollTo(0, 0)
    }
  }

  return (
    <div className="bg-[#e6edf7] py-8">
      {/* Ad Placement */}
      <div className="max-w-4xl mx-auto py-8 bg-[#fef2f2] mb-6 text-center text-[#6b7280]">Ad Placement</div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-4 mb-6 flex flex-wrap gap-2 py-8">
        {/* Sort By */}
        <div className="relative">
          <button 
            className="flex items-center justify-between bg-white text-[#6b7db3] border border-[#6b7db3] rounded-full px-4 py-1.5 text-sm min-w-[100px]"
            onClick={() => handleSortChange(sortOrder === "asc" ? "desc" : "asc")}
          >
            <span>Sort By {sortOrder === "asc" ? "Oldest" : "Newest"}</span>
            <span className="ml-2">▼</span>
          </button>
        </div>

        {/* Filter Keywords with Dropdown - Updated for multi-select */}
        <div className="relative">
          <button 
            className="flex items-center justify-between bg-white text-[#6b7db3] border border-[#6b7db3] rounded-full px-4 py-1.5 text-sm min-w-[150px]"
            onClick={() => setShowKeywordDropdown(!showKeywordDropdown)}
          >
            <span>{filterKeywords.length > 0 ? `${filterKeywords.length} selected` : "Filter Key words"}</span>
            <span className="ml-2">▼</span>
          </button>
          
          {showKeywordDropdown && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-[#6b7db3] rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              <div className="p-2">
                <button
                  className="w-full text-left px-3 py-2 text-sm hover:bg-[#e6edf7] rounded"
                  onClick={() => {
                    setFilterKeywords([])
                    setShowKeywordDropdown(false)
                    resetPagination()
                  }}
                >
                  Clear All Filters
                </button>
                {allKeywords.map((keyword, index) => (
                  <div key={index} className="flex items-center px-3 py-2">
                    <input
                      type="checkbox"
                      id={`keyword-${index}`}
                      checked={filterKeywords.includes(keyword)}
                      onChange={() => handleKeywordFilter(keyword)}
                      className="mr-2"
                    />
                    <label htmlFor={`keyword-${index}`} className="text-sm cursor-pointer">
                      {keyword}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Start Date - Input field */}
        <div className="relative">
          <input
            type="text"
            placeholder="Start Date (YYYY-MM-DD)"
            className="bg-white text-[#6b7db3] border border-[#6b7db3] rounded-full px-4 py-1.5 text-sm min-w-[150px]"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value)
              handleDateRangeChange(e.target.value, endDate)
            }}
          />
        </div>

        {/* End Date - Input field */}
        <div className="relative">
          <input
            type="text"
            placeholder="End Date (YYYY-MM-DD)"
            className="bg-white text-[#6b7db3] border border-[#6b7db3] rounded-full px-4 py-1.5 text-sm min-w-[150px]"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value)
              handleDateRangeChange(startDate, e.target.value)
            }}
          />
        </div>

        {/* Month/Day - Input field */}
        <div className="relative">
          <input
            type="text"
            placeholder="Month/Day (MM/DD)"
            className="bg-white text-[#6b7db3] border border-[#6b7db3] rounded-full px-4 py-1.5 text-sm min-w-[150px]"
            value={monthDay}
            onChange={(e) => {
              setMonthDay(e.target.value)
              handleMonthDayChange(e.target.value)
            }}
          />
        </div>

        {/* Search - Updated */}
        <div className="relative flex-grow">
          <form onSubmit={handleSearch} className="relative ml-2">
            <input
              type="text"
              placeholder="Search Any key words or title"
              className="w-full rounded-full py-1.5 pl-10 pr-4 text-sm bg-white border border-[#6b7db3] text-[#6b7db3]"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={handleSearchKeyPress}
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#6b7db3"
              >
              <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
            </svg>
            </div>
          </form>
        </div>

        {/* Clear filter button when tags are selected */}
        {filterKeywords.length > 0 && (
          <div className="relative">
            <button 
              className="flex items-center justify-between bg-[#b91c1c] text-white rounded-full px-4 py-1.5 text-sm"
              onClick={() => {
                setFilterKeywords([]);
                resetPagination();
              }}
            >
              Clear {filterKeywords.length} Filter{filterKeywords.length !== 1 ? 's' : ''}
              <span className="ml-2">×</span>
            </button>
          </div>
        )}
      </div>

      {/* Selected keywords chips */}
      {filterKeywords.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 mb-4 flex flex-wrap gap-2">
          {filterKeywords.map((keyword, index) => (
            <div 
              key={index} 
              className="bg-[#8a9ac7] text-white text-xs px-3 py-1 rounded-full flex items-center cursor-pointer hover:bg-[#6b7db3]"
              onClick={() => {
                setFilterKeywords(filterKeywords.filter(k => k !== keyword));
                resetPagination();
              }}
            >
              {keyword}
              <span className="ml-1 text-xs">×</span>
            </div>
          ))}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="max-w-6xl mx-auto px-4 py-12 text-center text-[#6b7db3]">
          Loading posts...
        </div>
      )}

      {/* Posts Grid */}
      {!loading && (
        <div className="max-w-6xl mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center py-12 text-[#b91c1c]">
              No posts found matching your criteria. Try different filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {posts.map((post) => (
                <div 
                  key={post.id} 
                  className="bg-[#ffe8e8] rounded-xl overflow-hidden border border-[#ffcaca] flex flex-col hover:shadow-lg transition-shadow duration-200 cursor-pointer h-80"
                  onClick={() => handleCardClick(post.id)}
                >
                  <div className="relative pt-1 h-48 flex flex-col">
                    <div className="absolute -top-0.1 left-1/2 transform -translate-x-1/2 bg-white text-[#b91c1c] text-xs font-medium px-2 py-1 rounded-full z-10">
                      {post.date}
                    </div>

                    {/* Image container with consistent size */}
                    <div className="w-[90%] h-40 mx-auto mt-2 rounded-[3%] bg-gray-100 flex items-center justify-center">
                      {post.image ? (
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover object-[center_30%] rounded-[3%] " 
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded-[3%] flex items-center justify-center">
                          <span className="text-gray-400 text-sm">No Image</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-[#b91c1c] font-medium text-base mb-2 line-clamp-2 flex-grow">
                      {post.title}
                    </h3>

                    {/* Clickable tags */}
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {post.keywords?.slice(0, 3).map((keyword, index) => (
                          <span 
                            key={index} 
                            className="bg-[#8a9ac7] text-white text-[10px] px-1.5 py-0.5 rounded-full whitespace-nowrap cursor-pointer hover:bg-[#6b7db3] transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTagClick(keyword);
                            }}
                          >
                            {keyword}
                          </span>
                        ))}
                        {post.keywords?.length > 3 && (
                          <span className="bg-gray-300 text-gray-600 text-[10px] px-1.5 py-0.5 rounded-full whitespace-nowrap">
                            +{post.keywords.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="max-w-6xl mx-auto px-4 my-8 flex justify-center items-center gap-2">
        <span 
          className={`text-sm ${page > 1 ? 'text-[#bb6d6d] cursor-pointer' : 'text-[#bb6d6d]/50'}`}
          onClick={page > 1 ? handlePreviousPage : undefined}
        >
          Previous Page
        </span>
        <button 
          className={`w-8 h-8 flex items-center justify-center rounded-full border border-[#bb6d6d] ${page > 1 ? 'bg-[#e6edf7] text-[#bb6d6d]' : 'bg-[#e6edf7]/50 text-[#bb6d6d]/50'}`}
          onClick={page > 1 ? handlePreviousPage : undefined}
          disabled={page <= 1}
        >
          &lt;
        </button>
        <div className="mx-2 text-[#bb6d6d]">Page {page}</div>
        <button 
          className={`w-8 h-8 flex items-center justify-center rounded-full border border-[#bb6d6d] ${hasMore ? 'bg-[#e6edf7] text-[#bb6d6d]' : 'bg-[#e6edf7]/50 text-[#bb6d6d]/50'}`}
          onClick={hasMore ? handleNextPage : undefined}
          disabled={!hasMore}
        >
          &gt;
        </button>
        <span 
          className={`text-sm ${hasMore ? 'text-[#bb6d6d] cursor-pointer' : 'text-[#bb6d6d]/50'}`}
          onClick={hasMore ? handleNextPage : undefined}
        >
          Next Page
        </span>
      </div>

      {/* View On This Day Button */}
      <div className="max-w-6xl mx-auto px-4 mb-0">
        <button 
         className="w-full bg-[#c25e5e] text-white py-3 rounded-full font-medium"
         onClick={() => navigate("/timeline")}
        >
         View On This Day
        </button>
      </div>
      <br/>
    </div>
  )
}