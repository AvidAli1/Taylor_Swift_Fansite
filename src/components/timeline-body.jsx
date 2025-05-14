"use client"

import { useState, useEffect } from "react"
import axios from "axios"

export default function TimelineBody() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(null) // Track API pagination offset
  const recordsPerPage = 12
  
  // Filter states
  const [sortOrder, setSortOrder] = useState("asc") // Default to oldest first
  const [filterKeyword, setFilterKeyword] = useState("")
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [monthDay, setMonthDay] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  
  // Store pagination history for moving back and forth
  const [offsetHistory, setOffsetHistory] = useState([null])
  const [currentOffsetIndex, setCurrentOffsetIndex] = useState(0)

  // Load posts from Airtable API
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      
      try {
        // Build filter formula based on selected filters
        let filterFormula = ""
        
        // Add date range filters if set
        if (startDate && endDate) {
          filterFormula += `AND(IS_AFTER({DATE}, '${startDate}'), IS_BEFORE({DATE}, '${endDate}'))`
        } else if (startDate) {
          filterFormula += `IS_AFTER({DATE}, '${startDate}')`
        } else if (endDate) {
          filterFormula += `IS_BEFORE({DATE}, '${endDate}')`
        }
        
        // Add month/day filter if set
        if (monthDay) {
          const [month, day] = monthDay.split('/')
          if (filterFormula) {
            filterFormula = `AND(${filterFormula}, AND(MONTH({DATE}) = ${month}, DAY({DATE}) = ${day}))`
          } else {
            filterFormula = `AND(MONTH({DATE}) = ${month}, DAY({DATE}) = ${day})`
          }
        }
        
        // Add keyword filter if set
        if (filterKeyword) {
          const keywordFilter = `FIND('${filterKeyword}', LOWER({KEYWORDS}))`
          filterFormula = filterFormula ? `AND(${filterFormula}, ${keywordFilter})` : keywordFilter
        }
        
        // Add search term filter if set
        if (searchTerm) {
          const searchFilter = `OR(FIND('${searchTerm.toLowerCase()}', LOWER({EVENT})), FIND('${searchTerm.toLowerCase()}', LOWER({LOCATION})))`
          filterFormula = filterFormula ? `AND(${filterFormula}, ${searchFilter})` : searchFilter
        }
        
        // Use the current offset from history when navigating
        const currentOffset = offsetHistory[currentOffsetIndex]
        
        // API request with proper pagination
        const response = await axios.get(
          "https://api.airtable.com/v0/appVhtDyx0VKlGbhy/Taylor%20Swift%20Master%20Tracker",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`,
            },
            params: {
              maxRecords: 100, // Higher max to ensure we get enough records
              pageSize: recordsPerPage,
              offset: currentOffset, // Use offset for pagination
              filterByFormula: filterFormula || undefined,
              sort: [{ field: "DATE", direction: sortOrder }],
              view: "Grid view",
            },
          }
        )
        
        // Check if there are more records by checking for offset in response
        const hasMoreRecords = !!response.data.offset
        setHasMore(hasMoreRecords)
        
        // Save the new offset for next page if available
        if (hasMoreRecords) {
          // If we're not at the end of the history yet, don't update it
          if (currentOffsetIndex === offsetHistory.length - 1) {
            setOffsetHistory(prev => [...prev, response.data.offset])
          }
        }

        // Format posts data
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
          image: record.fields.IMAGE?.[0]?.url || "/images/taylor_timeline_default.jpeg",
          year: record.fields.DATE ? new Date(record.fields.DATE).getFullYear() : '',
          keywords: record.fields.KEYWORDS || []
        }))
        
        // Update posts state with new data
        setPosts(formattedPosts)
        
      } catch (error) {
        console.error("Error fetching records:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [currentOffsetIndex, sortOrder, filterKeyword, startDate, endDate, monthDay, searchTerm])

  // Handle filter changes - reset pagination when filters change
  const handleSortChange = (order) => {
    setSortOrder(order)
    resetPagination()
  }

  const handleKeywordFilter = (keyword) => {
    setFilterKeyword(keyword)
    resetPagination()
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

  const handleSearch = (term) => {
    setSearchTerm(term)
    resetPagination()
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

        {/* Filter Key words */}
        <div className="relative">
          <button 
            className="flex items-center justify-between bg-white text-[#6b7db3] border border-[#6b7db3] rounded-full px-4 py-1.5 text-sm min-w-[150px]"
            onClick={() => {
              const keyword = prompt("Enter keyword to filter by:")
              if (keyword) handleKeywordFilter(keyword)
            }}
          >
            <span>{filterKeyword || "Filter Key words"}</span>
            <span className="ml-2">▼</span>
          </button>
        </div>

        {/* Start Date */}
        <div className="relative">
          <button 
            className="flex items-center justify-between bg-white text-[#6b7db3] border border-[#6b7db3] rounded-full px-4 py-1.5 text-sm min-w-[120px]"
            onClick={() => {
              const date = prompt("Enter start date (YYYY-MM-DD):")
              handleDateRangeChange(date, endDate)
            }}
          >
            <span>{startDate || "Start Date"}</span>
            <svg
              className="ml-2 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              >
              <path d="M3 4a1 1 0 011-1h1V2h2v1h8V2h2v1h1a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 4v12h16V8H4zm2 2h2v2H6v-2zm4 0h2v2h-2v-2z" />
            </svg>
          </button>
        </div>

        {/* End Date */}
        <div className="relative">
          <button 
            className="flex items-center justify-between bg-white text-[#6b7db3] border border-[#6b7db3] rounded-full px-4 py-1.5 text-sm min-w-[120px]"
            onClick={() => {
              const date = prompt("Enter end date (YYYY-MM-DD):")
              handleDateRangeChange(startDate, date)
            }}
          >
            <span>{endDate || "End Date"}</span>
            <svg
              className="ml-2 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              >
              <path d="M3 4a1 1 0 011-1h1V2h2v1h8V2h2v1h1a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 4v12h16V8H4zm2 2h2v2H6v-2zm4 0h2v2h-2v-2z" />
            </svg>
          </button>
        </div>

        {/* Month/Day */}
        <div className="relative">
          <button 
            className="flex items-center justify-between bg-white text-[#6b7db3] border border-[#6b7db3] rounded-full px-4 py-1.5 text-sm min-w-[120px]"
            onClick={() => {
              const md = prompt("Enter month/day (MM/DD):")
              handleMonthDayChange(md)
            }}
          >
            <span>{monthDay || "Month/Day"}</span>
            <svg
              className="ml-2 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              >
              <path d="M3 4a1 1 0 011-1h1V2h2v1h8V2h2v1h1a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 4v12h16V8H4zm2 2h2v2H6v-2zm4 0h2v2h-2v-2z" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="relative flex-grow">
          <div className="relative ml-2">
            <input
              type="text"
              placeholder="Search Any key words or title"
              className="w-full rounded-full py-1.5 pl-10 pr-4 text-sm bg-white border border-[#6b7db3] text-[#6b7db3]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(e.target.value)
                }
              }}
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
          </div>
        </div>
      </div>

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
                <div key={post.id} className="bg-[#ffe8e8] rounded-xl overflow-hidden border border-[#ffcaca] flex flex-col">
                  <div className="relative py-1">
                    {/* Date label */}
                    <div className="absolute -top-0.1 left-5 bg-white text-[#b91c1c] text-xs font-medium px-2 py-1 rounded-full z-10">
                      {post.date}
                    </div>

                    {/* Category label */}
                    <div className="absolute -top-0.1 right-4 bg-white text-[#b91c1c] text-xs font-medium px-2 py-1 rounded-full z-10">
                      {post.keywords.length > 0 ? post.keywords[0] : post.category}
                    </div>

                    <img src={post.image} alt={post.title} className="w-[90%] h-40 object-cover object-[center_35%] ml-4 mt-2 rounded-[3%]" />
                  </div>

                  <div className="p-3 flex flex-col flex-grow">
                    <h3 className="text-[#b91c1c] font-medium text-base mb-2">{post.title}</h3>

                    {/* Spacer pushes button to the bottom */}
                    <div className="flex-grow" />

                    <button className="w-full bg-[#fff5f5] text-[#b91c1c] border border-[#ffcaca] rounded-full py-1.5 px-4 text-sm font-medium flex items-center justify-center mt-auto">
                      Read More
                      <span className="ml-1">→</span>
                    </button>
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
        <button className="w-full bg-[#c25e5e] text-white py-3 rounded-full font-medium">View On This Day</button>
      </div>
      <br/>
    </div>
  )
}