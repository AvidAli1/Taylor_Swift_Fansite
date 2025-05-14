"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/Button"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

import "./timeline.css"

export default function Timeline() {
  const navigate = useNavigate()
  const [showScrollHint, setShowScrollHint] = useState(true)

  const [records, setRecords] = useState([]);
  
  // for next and previous day buttons
  const [currentMonth, setCurrentMonth] = useState(5);
  const [currentDay, setCurrentDay] = useState(31);
  
  const handleNextDay = () => {
    const currentDate = new Date(2020, currentMonth - 1, currentDay); // Dummy year
    currentDate.setDate(currentDate.getDate() + 1);
    setCurrentMonth(currentDate.getMonth() + 1); // Months are 0-based
    setCurrentDay(currentDate.getDate());
  };

  const handlePreviousDay = () => {
    const currentDate = new Date(2020, currentMonth - 1, currentDay); // Dummy year
    currentDate.setDate(currentDate.getDate() - 1);
    setCurrentMonth(currentDate.getMonth() + 1);
    setCurrentDay(currentDate.getDate());
  };

  // Fetch records from Airtable API
  useEffect(() => {
    const fetchRecordsByDate = async (month, day) => {
      const fetchByDate = async () => {
        const response = await axios.get(
          "https://api.airtable.com/v0/appVhtDyx0VKlGbhy/Taylor%20Swift%20Master%20Tracker",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`,
            },
            params: {
              maxRecords: 6, // You can increase this if you need more than 6 records
              filterByFormula: `AND(MONTH(DATE) = ${month}, DAY(DATE) = ${day})`,
              sort: [{ field: "DATE", direction: "asc" }],
            },
          }
        );
        return response.data.records || [];
      };

      try {
        const fetched = await fetchByDate();
        setRecords(fetched); // ✅ Store in state
        console.log("Fetched records:", fetched);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    // Fetch records for April 20th (Month = 4, Day = 20)
    if(currentMonth && currentDay) {
    fetchRecordsByDate(currentMonth, currentDay);
    }
  }, [currentMonth, currentDay]);

  // Handle scroll event to hide the scroll hint
  useEffect(() => {
    const timelineElement = document.querySelector(".mobile-timeline-container")

    const handleScroll = () => {
      if (timelineElement && timelineElement.scrollTop > 0) {
        setShowScrollHint(false)
      }
    }

    timelineElement?.addEventListener("scroll", handleScroll)

    return () => {
      timelineElement?.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section className="w-full bg-[#e8ecf7] py-4 md:py-8 px-2 md:px-12 flex-grow">
      <div className="container mx-auto h-full flex flex-col">
        {/* On This Day Section */}
        <div className="text-center mb-4 md:mb-8">
          <div className="relative w-full mb-2 md:mb-4 px-2 md:px-6">
            <div className="relative w-full px-2 md:px-4 py-3 md:py-6 bg-[#e8eef9]">
              {/* Container for the text in the center */}
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-8xl font-serif text-[#8e3e3e] text-center">
                  <span className="block">ON THIS DAY</span>
                  <span className="text-sm sm:text-xl md:text-3xl lg:text-5xl block mt-1">in Taylor Swift History</span>
                </h2>
              </div>

              {/* Left Star - Absolutely positioned */}
              <div className="absolute left-1 sm:left-2 md:left-4 lg:left-8 top-1/2 transform -translate-y-1/2">
                <img
                  src="/images/star.png"
                  alt="Star"
                  className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] md:w-[100px] md:h-[100px] lg:w-[150px] lg:h-[150px]"
                />
              </div>

              {/* Right Star - Absolutely positioned */}
              <div className="absolute right-1 sm:right-2 md:right-4 lg:right-8 top-1/2 transform -translate-y-1/2">
                <img
                  src="/images/star.png"
                  alt="Star"
                  className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] md:w-[100px] md:h-[100px] lg:w-[150px] lg:h-[150px]"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-4 my-2 md:my-4">
            <Button
              variant="secondary"
              className="rounded-full px-2 sm:px-4 md:px-6 text-xs sm:text-sm flex items-center gap-1 md:gap-2 mr-3"
              onClick={handlePreviousDay}
            >
              <ChevronLeft size={12} className="md:size-16" />
              <span className="hidden sm:inline">Previous Day</span>
              <span className="sm:hidden mr-2">Prev</span>
            </Button>

            <div className="bg-white rounded-full px-4 sm:px-6 md:px-8 py-1 md:py-2 min-w-[120px] sm:min-w-[160px] md:min-w-[200px] border border-[#b66b6b]">
              <span className="text-[#8e3e3e] text-sm md:text-base font-medium">
                {records.length > 0 && records[0].fields?.DATE? 
                  new Date(records[0].fields.DATE).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                    })
                  : "Loading..."}
              </span>
            </div>

            <Button
              variant="secondary"
              className="rounded-full px-2 sm:px-4 md:px-6 text-xs sm:text-sm flex items-center gap-1 md:gap-2 ml-3"
              onClick={handleNextDay}
            >
              <span className="hidden sm:inline">Next Day</span>
              <span className="sm:hidden ml-2">Next</span>
              <ChevronRight size={12} className="md:size-16" />
            </Button>
          </div>
        </div>

        {/* Timeline Section - Mobile vs Desktop layouts */}
        <div className="relative mt-6 md:mt-12 mb-4 md:mb-8 flex-grow overflow-hidden">
          {/* Mobile Timeline (Single Column) */}
          <div className="md:hidden h-[60vh] overflow-y-auto relative mobile-timeline-container">
            <div className="relative flex justify-center">
              {/* Center line */}
              <div className="relative w-[2px] flex flex-col items-center bg-[#e8ecf7]">
                <div className="h-[2000px] w-[3px] bg-[#8a9ad4]"></div>

                {/* Circles on the line */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[0px] w-5 h-5 rounded-full bg-[#6B78B4]"></div>
                {/*  
                  <div className="absolute left-1/2 -translate-x-1/2 top-[200px] w-5 h-5 rounded-full bg-[#FEE6E3] border-2 border-[#6B78B4]"></div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-[400px] w-5 h-5 rounded-full bg-[#FEE6E3] border-2 border-[#6B78B4]"></div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-[600px] w-5 h-5 rounded-full bg-[#FEE6E3] border-2 border-[#6B78B4]"></div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-[800px] w-5 h-5 rounded-full bg-[#FEE6E3] border-2 border-[#6B78B4]"></div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-[1000px] w-5 h-5 rounded-full bg-[#FEE6E3] border-2 border-[#6B78B4]"></div>
                */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[1200px] w-5 h-5 rounded-full bg-[#6B78B4]"></div>
              </div>

              {/* Mobile Timeline Items - All on right side */}
              <div className="absolute left-[20px] w-[calc(100%-30px)] space-y-[50px] pb-4">
                {records.map((record, index) => (
                  <div key={index} className="relative mt-[50px]" style={{ marginTop: index === 0 ? "20px" : "" }}>
                    <div className="bg-[#fce0e0] rounded-[10px] shadow-md p-4">
                      <div className="bg-[#fce0e0] rounded-lg px-2 py-1 text-xs text-[#8a9ad4] font-medium inline-block mb-2">
                        {record?.fields?.DATE
                          ? new Date(record.fields.DATE).getFullYear()
                          : "Loading..."}
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="w-full h-[160px] relative rounded-lg overflow-hidden">
                          <img
                            src={record?.fields?.IMAGE?.[0]?.url || '/images/taylor_timeline_default.jpeg'}
                            alt="Taylor Swift"
                            className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
                          />
                        </div>
                        <h3 className="text-[#8e3e3e] font-medium text-sm">
                          {record?.fields?.EVENT || 'Event description unavailable'}
                        </h3>
                        <Button
                          variant="outline"
                          className="self-start text-xs border-[#8e3e3e] text-[#8e3e3e] hover:bg-[#8e3e3e] hover:text-white rounded-full px-4 py-1"
                          onClick={() => navigate("/posts_details")}
                        >
                          Read More →
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Scroll hint and button - Only show if showScrollHint is true */}
            {showScrollHint && (
              <div className="scroll-hint bottom-0">
                <div className="scroll-blur"></div>
                <span className="scroll-text">Scroll down</span>
              </div>
            )}
          </div>

          {/* Desktop Timeline (Two Columns) */}
          <div className="hidden md:block h-[60vh] overflow-y-auto pr-4 timeline-scroll">
            <div className="relative flex justify-center">
              {/* Center line */}
              <div className="relative w-[2px] flex flex-col items-center">
                <div className="h-[1620px] w-[5px] bg-[#8a9ad4]"></div>

                {/* Circles on the line */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[0px] w-8 h-8 rounded-full bg-[#6B78B4]"></div>
                <div className="absolute left-1/2 -translate-x-1/2 top-[268px] w-8 h-8 rounded-full bg-[#FEE6E3] border-4 border-[#6B78B4]"></div>
                <div className="absolute left-1/2 -translate-x-1/2 top-[528px] w-8 h-8 rounded-full bg-[#FEE6E3] border-4 border-[#6B78B4]"></div>
                <div className="absolute left-1/2 -translate-x-1/2 top-[790px] w-8 h-8 rounded-full bg-[#FEE6E3] border-4 border-[#6B78B4]"></div>
                <div className="absolute left-1/2 -translate-x-1/2 top-[1105px] w-8 h-8 rounded-full bg-[#FEE6E3] border-4 border-[#6B78B4]"></div>
                <div className="absolute left-1/2 -translate-x-1/2 top-[1340px] w-8 h-8 rounded-full bg-[#FEE6E3] border-4 border-[#6B78B4]"></div>
                <div className="absolute left-1/2 -translate-x-1/2 top-[1620px] w-8 h-8 rounded-full bg-[#6B78B4]"></div>
              </div>

              {/* Left side content */}
              <div className="absolute left-0 w-[calc(50%-15px)] space-y-[152px] origin-top-right lg:scale-[0.75] md:scale-[0.65] py-64 px-2">
                <div className="relative mt-[120px]">
                  <div className="relative">
                    <img src="/images/leftSide_rectangle.png" alt="Left Rectangle" className="w-full h-auto" />
                    <div className="absolute inset-0 p-2 sm:p-4 md:p-6 lg:p-8 flex flex-col overflow-hidden mt-4">
                      <div className="bg-white rounded-full px-2 py-1 text-xs sm:text-sm md:text-base text-[#8a9ad4] font-semibold inline-block mb-1 sm:mb-2 w-fit">
                        {records[1] && records[1].fields && records[1]?.fields?.DATE
                          ? new Date(records[1].fields.DATE).getFullYear()
                          : "Loading..."}
                      </div>
                      <div className="flex flex-col gap-1 flex-grow overflow-hidden">
                        <div className="w-full h-0 pb-[35%] relative rounded-lg overflow-hidden">
                          <img
                            src={records[1]?.fields?.IMAGE?.[0]?.url || '/images/taylor_timeline_default.jpeg'}
                            alt="Taylor Swift"
                            className="absolute inset-0 w-[90%] h-full object-cover object-[center_35%]"
                          />
                        </div>
                        <h3 className="text-[#8e3e3e] font-medium text-xs sm:text-sm line-clamp-2 mt-1">
                          {records[1]?.fields?.EVENT || 'Event description unavailable'}
                        </h3>
                        <div className="flex flex-col mt-1 space-y-1">
                          <Button
                            variant="outline"
                            className="self-start text-xs border-[#8e3e3e] text-[#8e3e3e] hover:bg-[#8e3e3e] hover:text-white rounded-full px-3 py-1"
                            onClick={() => navigate("/posts_details")}
                          >
                            Read More →
                          </Button>
                          <div className="text-blue-600 font-semibold text-xs sm:text-sm line-clamp-1">
                            {records[1]?.fields?.KEYWORDS?.join(", ")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative py-24">
                  <div className="relative">
                    <img src="/images/leftSide_rectangle.png" alt="Left Rectangle" className="w-full h-auto" />
                    <div className="absolute inset-0 p-2 sm:p-4 md:p-6 lg:p-8 flex flex-col overflow-hidden mt-4">
                      <div className="bg-white rounded-full px-2 py-1 text-xs sm:text-sm md:text-base text-[#8a9ad4] font-semibold inline-block mb-1 sm:mb-2 w-fit">
                        {records[3] && records[3].fields && records[3].fields?.DATE
                         ? new Date(records[3]?.fields?.DATE).getFullYear()
                         : "Loading..."}
                      </div>
                      <div className="flex flex-col gap-1 flex-grow overflow-hidden">
                        <div className="w-full h-0 pb-[35%] relative rounded-lg overflow-hidden">
                          <img
                            src={records[3]?.fields?.IMAGE?.[0]?.url || '/images/taylor_timeline_default.jpeg'}
                            alt="Taylor Swift"
                            className="absolute inset-0 w-[90%] h-full object-cover object-[center_35%]"
                          />
                        </div>
                        <h3 className="text-[#8e3e3e] font-medium text-xs sm:text-sm line-clamp-2 mt-1">
                          {records[3]?.fields?.EVENT || 'Event description unavailable'}
                        </h3>
                        <div className="flex flex-col mt-1 space-y-1">
                          <Button
                            variant="outline"
                            className="self-start text-xs border-[#8e3e3e] text-[#8e3e3e] hover:bg-[#8e3e3e] hover:text-white rounded-full px-3 py-1"
                            onClick={() => navigate("/posts_details")}
                          >
                            Read More →
                          </Button>
                          <div className="text-blue-600 font-semibold text-xs sm:text-sm line-clamp-1">
                            {records[3]?.fields?.KEYWORDS?.join(", ")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative py-12">
                  <div className="relative">
                    <img src="/images/leftSide_rectangle.png" alt="Left Rectangle" className="w-full h-auto" />
                    <div className="absolute inset-0 p-2 sm:p-4 md:p-6 lg:p-8 flex flex-col overflow-hidden mt-4">
                      <div className="bg-white rounded-full px-2 py-1 text-xs sm:text-sm md:text-base text-[#8a9ad4] font-semibold inline-block mb-1 sm:mb-2 w-fit">
                       {records[5] && records[5].fields && records[5].fields?.DATE
                         ? new Date(records[5]?.fields?.DATE).getFullYear()
                         : "Loading..."}
                      </div>
                      <div className="flex flex-col gap-1 flex-grow overflow-hidden">
                        <div className="w-full h-0 pb-[35%] relative rounded-lg overflow-hidden">
                          <img
                            src={records[5]?.fields?.IMAGE?.[0]?.url || '/images/taylor_timeline_default.jpeg'}
                            alt="Taylor Swift"
                            className="absolute inset-0 w-[90%] h-full object-cover object-[center_35%]"
                          />
                        </div>
                        <h3 className="text-[#8e3e3e] font-medium text-xs sm:text-sm line-clamp-2 mt-1">
                          {records[5]?.fields?.EVENT || 'Event description unavailable'}
                        </h3>
                        <div className="flex flex-col mt-1 space-y-1">
                          <Button
                            variant="outline"
                            className="self-start text-xs border-[#8e3e3e] text-[#8e3e3e] hover:bg-[#8e3e3e] hover:text-white rounded-full px-3 py-1"
                            onClick={() => navigate("/posts_details")}
                          >
                            Read More →
                          </Button>
                          <div className="text-blue-600 font-semibold text-xs sm:text-sm line-clamp-1">
                            {records[5]?.fields?.KEYWORDS?.join(", ")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side content */}
              <div className="absolute right-[-3px] w-[calc(50%-15px)] space-y-[76px] origin-top-left lg:scale-[0.75] md:scale-[0.65]">
                <div className="relative mt-[12px]">
                  <div className="relative">
                    <img src="/images/rightSide_Rectangle.png" alt="Right Rectangle" className="w-full h-auto" />
                    <div className="absolute inset-0 p-2 sm:p-4 md:p-6 lg:p-8 flex flex-col overflow-hidden mt-4 transform translate-x-12">
                      <div className="bg-white rounded-full px-2 py-1 text-xs sm:text-sm md:text-base text-[#8a9ad4] font-semibold inline-block mb-1 sm:mb-2 w-fit">
                        {records[0] && records[0].fields && records[0].fields?.DATE
                         ? new Date(records[0]?.fields?.DATE).getFullYear()
                         : "Loading..."}
                      </div>
                      <div className="flex flex-col gap-1 flex-grow overflow-hidden">
                        <div className="w-full h-0 pb-[35%] relative rounded-lg overflow-hidden">
                          <img
                            src={records[0]?.fields?.IMAGE?.[0]?.url || '/images/taylor_timeline_default.jpeg'}
                            alt="Taylor Swift"
                            className="absolute inset-0 w-[90%] h-full object-cover object-[center_35%]"
                          />
                        </div>
                        <h3 className="text-[#8e3e3e] font-medium text-xs sm:text-sm line-clamp-2 mt-1">
                          {records[0]?.fields?.EVENT || 'Event description unavailable'}
                        </h3>
                        <div className="flex flex-col mt-1 space-y-1">
                          <Button
                            variant="outline"
                            className="self-start text-xs border-[#8e3e3e] text-[#8e3e3e] hover:bg-[#8e3e3e] hover:text-white rounded-full px-3 py-1"
                            onClick={() => navigate("/posts_details")}
                          >
                            Read More →
                          </Button>
                          <div className="text-blue-600 font-semibold text-xs sm:text-sm line-clamp-1">
                            {records[0]?.fields?.KEYWORDS?.join(", ")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative py-44">
                  <div className="relative">
                    <img src="/images/rightSide_Rectangle.png" alt="Right Rectangle" className="w-full h-auto" />
                    <div className="absolute inset-0 p-2 sm:p-4 md:p-6 lg:p-8 flex flex-col overflow-hidden mt-4 transform translate-x-12">
                      <div className="bg-white rounded-full px-2 py-1 text-xs sm:text-sm md:text-base text-[#8a9ad4] font-semibold inline-block mb-1 sm:mb-2 w-fit">
                        {records[2] && records[2].fields && records[2].fields?.DATE
                         ? new Date(records[2]?.fields?.DATE).getFullYear()
                         : "Loading..."}
                      </div>
                      <div className="flex flex-col gap-1 flex-grow overflow-hidden">
                        <div className="w-full h-0 pb-[35%] relative rounded-lg overflow-hidden">
                          <img
                            src={records[2]?.fields?.IMAGE?.[0]?.url || '/images/taylor_timeline_default.jpeg'}
                            alt="Taylor Swift"
                            className="absolute inset-0 w-[90%] h-full object-cover object-[center_35%]"
                          />
                        </div>
                        <h3 className="text-[#8e3e3e] font-medium text-xs sm:text-sm line-clamp-2 mt-1">
                          {records[2]?.fields?.EVENT || 'Event description unavailable'}
                        </h3>
                        <div className="flex flex-col mt-1 space-y-1">
                          <Button
                            variant="outline"
                            className="self-start text-xs border-[#8e3e3e] text-[#8e3e3e] hover:bg-[#8e3e3e] hover:text-white rounded-full px-3 py-1"
                            onClick={() => navigate("/posts_details")}
                          >
                            Read More →
                          </Button>
                          <div className="text-blue-600 font-semibold text-xs sm:text-sm line-clamp-1">
                            {records[2]?.fields?.KEYWORDS?.join(", ")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative py-16">
                  <div className="relative">
                    <img src="/images/rightSide_Rectangle.png" alt="Right Rectangle" className="w-full h-auto" />
                    <div className="absolute inset-0 p-2 sm:p-4 md:p-6 lg:p-8 flex flex-col overflow-hidden mt-4 transform translate-x-12">
                      <div className="bg-white rounded-full px-2 py-1 text-xs sm:text-sm md:text-base text-[#8a9ad4] font-semibold inline-block mb-1 sm:mb-2 w-fit">
                        {records[4] && records[4].fields && records[4].fields?.DATE
                         ? new Date(records[4]?.fields?.DATE).getFullYear()
                         : "Loading..."}
                      </div>
                      <div className="flex flex-col gap-1 flex-grow overflow-hidden">
                        <div className="w-full h-0 pb-[35%] relative rounded-lg overflow-hidden">
                          <img
                            src={records[4]?.fields?.IMAGE?.[0]?.url || '/images/taylor_timeline_default.jpeg'}
                            alt="Taylor Swift"
                            className="absolute inset-0 w-[90%] h-full object-cover object-[center_35%]"
                          />
                        </div>
                        <h3 className="text-[#8e3e3e] font-medium text-xs sm:text-sm line-clamp-2 mt-1">
                          {records[4]?.fields?.EVENT || 'Event description unavailable'}
                        </h3>
                        <div className="flex flex-col mt-1 space-y-1">
                          <Button
                            variant="outline"
                            className="self-start text-xs border-[#8e3e3e] text-[#8e3e3e] hover:bg-[#8e3e3e] hover:text-white rounded-full px-3 py-1"
                            onClick={() => navigate("/posts_details")}
                          >
                            Read More →
                          </Button>
                          <div className="text-blue-600 font-semibold text-xs sm:text-sm line-clamp-1">
                            {records[4]?.fields?.KEYWORDS?.join(", ")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Custom scrollbar */}
          <div className="hidden md:block absolute left-10 right-0 top-0 bottom-0 w-2 bg-gradient-to-r from-transparent to-[#e8ecf7]/80 pointer-events-none"></div>
        </div>

        <div className="flex justify-center mt-4 md:mt-8">
          <Button
            variant="secondary"
            className="rounded-full px-6 sm:px-12 md:px-20 lg:px-60 py-2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            onClick={() => navigate("/posts")}
          >
            View Full Timeline
          </Button>
        </div>
      </div>
    </section>
  )
}
