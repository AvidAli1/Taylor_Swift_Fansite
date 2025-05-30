"use client"

import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"
import { Button } from "./ui/Button"

export default function SearchResults() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Handle read more functionality
  const handleReadMore = (postId) => {
    navigate(`/post_details?id=${postId}`)
  }

  // Fetch search results from Airtable
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setResults([])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const response = await axios.get(
          "https://api.airtable.com/v0/appVhtDyx0VKlGbhy/Taylor%20Swift%20Master%20Tracker",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`,
            },
            params: {
              maxRecords: 50,
              filterByFormula: `SEARCH("${query}", {EVENT})`,
              sort: [{ field: "DATE", direction: "desc" }],
            },
          }
        )

        setResults(response.data.records || [])
      } catch (error) {
        console.error("Error fetching search results:", error)
        setError("Failed to fetch search results. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [query])

  // Clear search function
  const clearSearch = () => {
    navigate('/')
  }

  if (loading) {
    return (
      <section className="w-full bg-[#e8ecf7] py-8 px-4 md:px-12 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8a9ad4] mx-auto mb-4"></div>
          <p className="text-[#8e3e3e] text-lg">Searching the Swift Lore...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full bg-[#e8ecf7] py-4 md:py-8 px-2 md:px-12 min-h-[60vh]">
      <div className="container mx-auto">
        {/* Search Results Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="relative w-full mb-4 px-2 md:px-6">
            <div className="relative w-full px-4 py-6 bg-[#e8eef9] rounded-lg">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-serif text-[#8e3e3e]">
                  <span className="block">SEARCH RESULTS</span>
                  <span className="text-sm sm:text-lg md:text-2xl lg:text-3xl block mt-2">
                    for "{query}"
                  </span>
                </h2>
              </div>

              {/* Decorative Stars */}
              <div className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2">
                <img
                  src="/images/star.png"
                  alt="Star"
                  className="w-[40px] h-[40px] md:w-[80px] md:h-[80px] lg:w-[120px] lg:h-[120px]"
                />
              </div>
              <div className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2">
                <img
                  src="/images/star.png"
                  alt="Star"
                  className="w-[40px] h-[40px] md:w-[80px] md:h-[80px] lg:w-[120px] lg:h-[120px]"
                />
              </div>
            </div>
          </div>

          {/* Results count and clear button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <p className="text-[#8e3e3e] text-lg font-medium">
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </p>
            <Button
              variant="outline"
              className="rounded-full px-6 py-2 text-sm border-[#8e3e3e] text-[#8e3e3e] hover:bg-[#8e3e3e] hover:text-white"
              onClick={clearSearch}
            >
              Back to Timeline
            </Button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <Button
              variant="secondary"
              className="rounded-full px-6 py-2"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        )}

        {/* No Results State */}
        {!loading && !error && results.length === 0 && query.trim() && (
          <div className="text-center py-12">
            <div className="mb-6">
              <img
                src="/images/star.png"
                alt="No results"
                className="w-16 h-16 mx-auto opacity-50 mb-4"
              />
              <h3 className="text-2xl font-serif text-[#8e3e3e] mb-2">No Results Found</h3>
              <p className="text-[#8a9ad4] text-lg">
                No events match your search for "{query}"
              </p>
            </div>
            <Button
              variant="secondary"
              className="rounded-full px-8 py-3"
              onClick={clearSearch}
            >
              Back to Timeline
            </Button>
          </div>
        )}

        {/* Search Results Grid */}
        {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 mb-10">
            {results.map((record, index) => (
            <div key={record.id || index} className="bg-[#fce0e0] rounded-[18px] shadow-md p-3 md:p-4 hover:shadow-lg transition-shadow duration-200">
                
                {/* Year Badge */}
                <div className="bg-[#8a9ad4] rounded-full px-3 py-1 text-sm text-white font-semibold inline-block mb-3">
                {record?.fields?.DATE
                    ? new Date(record.fields.DATE).getFullYear()
                    : "Unknown Year"}
                </div>

                {/* Image */}
                <div className="w-full h-[130px] relative rounded-lg overflow-hidden mb-3">
                {record?.fields?.IMAGE?.[0]?.url ? (
                    <img
                    src={record.fields.IMAGE[0].url}
                    alt="Taylor Swift Event"
                    className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
                    />
                ) : (
                    <div className="absolute inset-0 w-full h-full" />
                )}
                </div>

                {/* Event Title */}
                <h3 className="text-[#8e3e3e] font-medium text-sm md:text-base mb-2 line-clamp-2 min-h-[40px]">
                {record?.fields?.EVENT || 'Event description unavailable'}
                </h3>

                {/* Date */}
                {record?.fields?.DATE && (
                <p className="text-[#8a9ad4] text-sm mb-2 font-medium">
                    {new Date(record.fields.DATE).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                    })}
                </p>
                )}

                {/* Keywords */}
                {record?.fields?.KEYWORDS && record.fields.KEYWORDS.length > 0 && (
                <div className="mb-2">
                    <div className="flex flex-wrap gap-1 mb-1">
                    {record.fields.KEYWORDS.slice(0, 2).map((keyword, keyIndex) => (
                        <span
                        key={keyIndex}
                        className="bg-[#e8eef9] text-[#6B78B4] text-xs px-2 py-1 rounded-full"
                        >
                        {keyword}
                        </span>
                    ))}
                    {record.fields.KEYWORDS.length > 2 && (
                        <span className="text-[#8a9ad4] text-xs px-1 py-0.5">
                        +{record.fields.KEYWORDS.length - 2}
                        </span>
                    )}
                    </div>
                </div>
                )}

                {/* Category/Album */}
                {(record?.fields?.CATEGORY || record?.fields?.ALBUM) && (
                <p className="text-[#8a9ad4] text-sm mb-2 font-medium truncate">
                    {record.fields.CATEGORY || record.fields.ALBUM}
                </p>
                )}

                {/* Read More Button */}
                <Button
                variant="outline"
                className="w-full text-sm border-[#8e3e3e] text-[#8e3e3e] hover:bg-[#8e3e3e] hover:text-white rounded-full py-1.5"
                onClick={() => handleReadMore(record.id)}
                >
                Read More →
                </Button>
            </div>
            ))}
        </div>
        )}


        {/* Load More Button (if you want to implement pagination later) */}
        {results.length >= 50 && (
          <div className="text-center">
            <p className="text-[#8a9ad4] text-sm mb-4">
              Showing first 50 results. Refine your search for more specific results.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}