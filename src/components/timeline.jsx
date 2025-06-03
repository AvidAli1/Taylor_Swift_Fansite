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

  const today = new Date();
  const day = today.getDate();          
  const month = today.getMonth() + 1;
  
  // for next and previous day buttons (4,5) (5,31) (9,9)
  const [currentMonth, setCurrentMonth] = useState(month); // to set month
  const [currentDay, setCurrentDay] = useState(day); // to set day
  
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

  // Add handleReadMore function to match functionality in timeline-body.jsx
  const handleReadMore = (postId) => {
    navigate(`/post_details?id=${postId}`);
  };

  const hasImage = !!records[0]?.fields?.IMAGE?.[0]?.url;

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
        setRecords(fetched); // Store in state
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
                <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-7xl font-serif text-[#8e3e3e] text-center">
                  <span className="block">ON THIS DAY</span>
                  <span className="text-xs sm:text-lg md:text-2xl lg:text-4xl block mt-1">in Taylor Swift History</span>
                </h2>
              </div>

              {/* Left Star - Absolutely positioned */}
              <div className="absolute left-1 sm:left-2 md:left-4 lg:left-8 top-1/2 transform -translate-y-1/2">
                <img
                  src="/images/star.png"
                  alt="Star"
                  className="w-[26px] h-[26px] sm:w-[40px] sm:h-[40px] md:w-[66px] md:h-[66px] lg:w-[100px] lg:h-[100px]"
                />
              </div>

              {/* Right Star - Absolutely positioned */}
              <div className="absolute right-1 sm:right-2 md:right-4 lg:right-8 top-1/2 transform -translate-y-1/2">
                <img
                  src="/images/star.png"
                  alt="Star"
                 className="w-[26px] h-[26px] sm:w-[40px] sm:h-[40px] md:w-[66px] md:h-[66px] lg:w-[100px] lg:h-[100px]"
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

                {/* Circles on the line - dynamically positioned based on records */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[0px] w-5 h-5 rounded-full bg-[#6B78B4]"></div>
                {records.slice(1, 5).map((_, index) => (
                  <div key={index} className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#FEE6E3] border-2 border-[#6B78B4]`} 
                       style={{ top: `${200 + (index * 200)}px` }}></div>
                ))}
                <div className="absolute left-1/2 -translate-x-1/2 top-[1200px] w-5 h-5 rounded-full bg-[#6B78B4]"></div>
              </div>

              {/* Mobile Timeline Items - Styled to match desktop */}
              <div className="absolute left-[20px] w-[calc(100%-30px)] space-y-[50px] pb-4">
                {records.map((record, index) => (
                  <div key={index} className="relative mt-[50px]" style={{ marginTop: index === 0 ? "20px" : "" }}>
                    <div className="relative">
                      {/* Background using similar styling approach as desktop */}
                      <div className="bg-gradient-to-br from-[#fce0e0] to-[#f8d7da] rounded-[15px] shadow-lg border border-[#e8c5c8] p-1">
                        <div className="bg-white/80 backdrop-blur-sm rounded-[12px] p-4 border border-[#f0d0d3]">
                          
                          {/* Date Badge - styled like desktop */}
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 border border-[#8e3e3e] bg-white rounded-full px-4 py-1 text-xs text-[#8e3e3e] font-semibold shadow-md z-10 min-w-[120px] text-center">
                            {record?.fields?.DATE
                              ? (() => {
                                  const date = new Date(record.fields.DATE);
                                  const options = { month: "long" };
                                  const month = date.toLocaleString("en-US", options);
                                  const day = String(date.getDate()).padStart(2, "0");
                                  const year = date.getFullYear();
                                  return `${month}-${day}-${year}`;
                                })()
                              : "Loading..."}
                          </div>

                          <div className="flex flex-col gap-3 mt-2">
                            {/* Event Image */}
                            {record?.fields?.IMAGE?.[0]?.url ? (
                              <div className="w-full h-[140px] relative rounded-xl overflow-hidden shadow-md">
                                <img
                                  src={record.fields.IMAGE[0].url}
                                  alt="Taylor Swift Event"
                                  className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
                                />
                              </div>
                            ) : (
                              <div className="w-full h-[100px] bg-gradient-to-r from-[#e8ecf7] to-[#d8e2f7] rounded-xl flex items-center justify-center">
                                <span className="text-[#8a9ad4] text-sm">No Image Available</span>
                              </div>
                            )}

                            {/* Event Description */}
                            <h3 className="text-[#8e3e3e] font-bold text-sm leading-relaxed text-center">
                              {record?.fields?.EVENT || 'Event description unavailable'}
                            </h3>
                            
                            {/* Notes */}
                            {record?.fields?.NOTES && (
                              <p className="text-xs text-center font-medium text-gray-700 leading-relaxed">
                                {record.fields.NOTES}
                              </p>
                            )}

                            {/* Read More Button */}
                            <Button
                              variant="outline"
                              className="self-center text-xs border-[#8e3e3e] text-[#8e3e3e] hover:bg-[#8e3e3e] hover:text-white rounded-full px-4 py-1.5 font-medium transition-all duration-200"
                              onClick={() => handleReadMore(record.id)}
                            >
                              Read More →
                            </Button>

                            {/* Divider line like desktop */}
                            <div className="w-full h-[1px] bg-[#8e3e3e] rounded-full opacity-60"></div>
                            
                            {/* Keywords section */}
                            {record?.fields?.KEYWORDS && record.fields.KEYWORDS.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 justify-center">
                                {record.fields.KEYWORDS.slice(0, 4).map((tag, tagIndex) => (
                                  <div
                                    key={tagIndex}
                                    className="bg-[#8a9ac7] text-white font-medium text-xs px-2.5 py-1 rounded-full whitespace-nowrap shadow-sm"
                                  >
                                    {tag}
                                  </div>
                                ))}
                                {record.fields.KEYWORDS.length > 4 && (
                                  <div className="bg-[#b8c5e8] text-[#8e3e3e] font-medium text-xs px-2.5 py-1 rounded-full">
                                    +{record.fields.KEYWORDS.length - 4}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
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
              <div className="absolute left-16 w-[calc(50%-15px)] space-y-[152px] origin-top-right lg:scale-[0.75] md:scale-[0.65] py-64 px-2">
                <div className="relative mt-[120px] w-[80%]">
                  <div className="relative">
                    {/* Background Rectangle Image - Now controls the content height */}
                    <img
                      src="/images/leftSide_rectangle.png"
                      alt="Left Rectangle"
                      className={`w-full ${records[1]?.fields?.IMAGE?.[0]?.url ? "min-h-[400px]" : "min-h-[255px]"}`}
                    />

                    {/* Overlay Content - Now constrained to image height */}
                    <div className="absolute top-0 left-3 p-2 sm:p-3 flex flex-col mr-2 mt-7 w-full max-w-[90%] h-[calc(100%-56px)]">
                      {/* Date Badge - now with complete date logic */}
                      <div className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#8e3e3e] bg-white rounded-full py-1 text-sm text-[#8e3e3e] font-semibold w-fit shadow-md z-10
                        ${records[1]?.fields?.IMAGE?.[0]?.url ? "top-5" : "top-0"}`}
                        style={{ minWidth: "140px", paddingLeft: "1rem", paddingRight: "1rem" }}>
                        {records[1]?.fields?.DATE
                          ? (() => {
                              const date = new Date(records[1].fields.DATE);
                              const options = { month: "long" };
                              const month = date.toLocaleString("en-US", options);
                              const day = String(date.getDate()).padStart(2, "0");
                              const year = date.getFullYear();
                              return `${month}-${day}-${year}`;
                            })()
                          : "Loading..."}
                      </div>

                      {/* Scrollable Content Area */}
                      <div className="flex-1 overflow-y-auto pt-8"> {/* Added pt-8 to account for date badge */}
                        {/* Event Image - unchanged */}
                        {records[1]?.fields?.IMAGE?.[0]?.url && (
                          <div className="w-full h-0 pb-[35%] relative rounded-xl overflow-hidden mt-2 max-w-[400px]">
                            <img
                              src={records[1].fields.IMAGE[0].url}
                              alt="Event"
                              className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
                            />
                          </div>
                        )}

                        {/* Event Description - now with overflow control */}
                        <h3 className="text-[#8e3e3e] font-bold text-md text-center mt-2 max-w-[400px] mx-auto line-clamp-3">
                          {records[1]?.fields?.EVENT || "Event description unavailable"}
                        </h3>

                        {/* Notes - now with overflow control */}
                        {records[1]?.fields?.NOTES && (
                          <p className="text-sm text-center font-bold text-black mt-1 max-w-[300px] mx-auto line-clamp-3">
                            {records[1].fields.NOTES}
                          </p>
                        )}

                        {/* Button + Keywords */}
                        <div className="flex flex-col mt-1 space-y-1 gap-2">
                          <Button
                            variant="outline"
                            className="self-center text-sm border-[#8e3e3e] text-[#8e3e3e] hover:bg-[#8e3e3e] hover:text-white rounded-full px-2 py-0.5 mt-1"
                            onClick={() => records[1] && handleReadMore(records[1].id)}
                          >
                            Read More →
                          </Button>
                          <div className="w-[98%] h-[2px] bg-[#8e3e3e] mt-3 self-center rounded-full"></div>
                          
                          {/* Keywords with scroll if needed */}
                          <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto py-1">
                            {records[1]?.fields?.KEYWORDS?.map((tag, index) => (
                              <div
                                key={index}
                                className="bg-[#8a9ac7] text-white font-semibold text-sm px-3 py-1 rounded-full whitespace-nowrap"
                              >
                                {tag}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-[920px] w-[80%]">
                  <div className="relative">
                    {/* Background Rectangle Image - Now using min-height */}
                    <img
                      src="/images/leftSide_rectangle.png"
                      alt="Left Rectangle"
                      className={`w-full ${records[3]?.fields?.IMAGE?.[0]?.url ? "min-h-[400px]" : "min-h-[255px]"}`}
                    />

                    {/* Overlay Content - Constrained to image height */}
                    <div className="absolute top-0 left-3 p-2 sm:p-3 flex flex-col mr-2 mt-7 w-full max-w-[90%] h-[calc(100%-56px)]">
                      {/* Date Badge - unchanged */}
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#8e3e3e] bg-white rounded-full py-1 text-sm text-[#8e3e3e] font-semibold w-fit shadow-md z-10
                          ${records[3]?.fields?.IMAGE?.[0]?.url ? "top-5" : "top-0"}`}
                        style={{ minWidth: "140px", paddingLeft: "1rem", paddingRight: "1rem" }}
                      >
                        {records[3]?.fields?.DATE
                          ? (() => {
                              const date = new Date(records[3].fields.DATE);
                              const options = { month: "long" };
                              const month = date.toLocaleString("en-US", options);
                              const day = String(date.getDate()).padStart(2, "0");
                              const year = date.getFullYear();
                              return `${month}-${day}-${year}`;
                            })()
                          : "Loading..."}
                      </div>

                      {/* Scrollable Content Area */}
                      <div className="flex-1 overflow-y-auto pt-8">
                        {/* Event Image if exists */}
                        {records[3]?.fields?.IMAGE?.[0]?.url && (
                          <div className="w-full h-0 pb-[35%] relative rounded-xl overflow-hidden mt-2 max-w-[400px]">
                            <img
                              src={records[3].fields.IMAGE[0].url}
                              alt="Event Image"
                              className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
                            />
                          </div>
                        )}

                        {/* Event Description with line clamping */}
                        <h3 className="text-[#8e3e3e] font-bold text-md text-center mt-2 max-w-[400px] mx-auto line-clamp-3">
                          {records[3]?.fields?.EVENT || "Event description unavailable"}
                        </h3>

                        {/* Notes with line clamping */}
                        {records[3]?.fields?.NOTES && (
                          <p className="text-sm text-center font-bold text-black mt-1 max-w-[300px] mx-auto line-clamp-3">
                            {records[3].fields.NOTES}
                          </p>
                        )}

                        {/* Button + Keywords */}
                        <div className="flex flex-col mt-1 space-y-1 gap-2">
                          <Button
                            variant="outline"
                            className="self-center text-sm border-[#8e3e3e] text-[#8e3e3e] hover:bg-[#8e3e3e] hover:text-white rounded-full px-2 py-0.5 mt-1"
                            onClick={() => records[3] && handleReadMore(records[3].id)}
                          >
                            Read More →
                          </Button>
                          <div className="w-[98%] h-[2px] bg-[#8e3e3e] mt-3 self-center rounded-full"></div>
                          
                          {/* Scrollable Keywords */}
                          <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto py-1">
                            {records[3]?.fields?.KEYWORDS?.map((tag, index) => (
                              <div
                                key={index}
                                className="bg-[#8a9ac7] text-white font-semibold text-sm px-3 py-1 rounded-full whitespace-nowrap"
                              >
                                {tag}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-[1660px] w-[80%]">
                  <div className="relative">
                    {/* Background Rectangle Image - Now using min-height */}
                    <img
                      src="/images/leftSide_rectangle.png"
                      alt="Left Rectangle"
                      className={`w-full ${records[5]?.fields?.IMAGE?.[0]?.url ? "min-h-[400px]" : "min-h-[255px]"}`}
                    />

                    {/* Overlay Content - Constrained to image height */}
                    <div className="absolute top-0 left-3 p-2 sm:p-3 flex flex-col mr-2 mt-7 w-full max-w-[90%] h-[calc(100%-56px)]">
                      {/* Date Badge - unchanged */}
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#8e3e3e] bg-white rounded-full py-1 text-sm text-[#8e3e3e] font-semibold w-fit shadow-md z-10
                          ${records[5]?.fields?.IMAGE?.[0]?.url ? "top-5" : "top-0"}`}
                        style={{ minWidth: "140px", paddingLeft: "1rem", paddingRight: "1rem" }}
                      >
                        {records[5]?.fields?.DATE
                          ? (() => {
                              const date = new Date(records[5].fields.DATE);
                              const options = { month: "long" };
                              const month = date.toLocaleString("en-US", options);
                              const day = String(date.getDate()).padStart(2, "0");
                              const year = date.getFullYear();
                              return `${month}-${day}-${year}`;
                            })()
                          : "Loading..."}
                      </div>

                      {/* Scrollable Content Area */}
                      <div className="flex-1 overflow-y-auto pt-8">
                        {/* Event Image if exists */}
                        {records[5]?.fields?.IMAGE?.[0]?.url && (
                          <div className="w-full h-0 pb-[35%] relative rounded-xl overflow-hidden mt-2 max-w-[400px]">
                            <img
                              src={records[5].fields.IMAGE[0].url}
                              alt="Event Image"
                              className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
                            />
                          </div>
                        )}

                        {/* Event Description with line clamping */}
                        <h3 className="text-[#8e3e3e] font-bold text-md text-center mt-2 max-w-[400px] mx-auto line-clamp-3">
                          {records[5]?.fields?.EVENT || "Event description unavailable"}
                        </h3>

                        {/* Notes with line clamping */}
                        {records[5]?.fields?.NOTES && (
                          <p className="text-sm text-center font-bold text-black mt-1 max-w-[300px] mx-auto line-clamp-3">
                            {records[5].fields.NOTES}
                          </p>
                        )}

                        {/* Button + Keywords */}
                        <div className="flex flex-col mt-1 space-y-1 gap-2">
                          <Button
                            variant="outline"
                            className="self-center text-sm border-[#8e3e3e] text-[#8e3e3e] hover:bg-[#8e3e3e] hover:text-white rounded-full px-2 py-0.5 mt-1"
                            onClick={() => records[5] && handleReadMore(records[5].id)}
                          >
                            Read More →
                          </Button>
                          <div className="w-[98%] h-[2px] bg-[#8e3e3e] mt-3 self-center rounded-full"></div>
                          
                          {/* Scrollable Keywords */}
                          <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto py-1">
                            {records[5]?.fields?.KEYWORDS?.map((tag, index) => (
                              <div
                                key={index}
                                className="bg-[#8a9ac7] text-white font-semibold text-sm px-3 py-1 rounded-full whitespace-nowrap"
                              >
                                {tag}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side content */}
              <div className="absolute right-[-3px] w-[calc(50%-15px)] space-y-[76px] origin-top-left lg:scale-[0.75] md:scale-[0.65]">
                <div className="relative top-[12px] w-[75%] ml-8">
                  <div className="relative">
                    {/* Background Rectangle Image - Now using min-height */}
                    <img
                      src="/images/rightSide_Rectangle.png"
                      alt="Right Rectangle"
                      className={`w-full ${records[0]?.fields?.IMAGE?.[0]?.url ? "min-h-[400px]" : "min-h-[255px]"}`}
                    />

                    {/* Overlay Content - Constrained to image height */}
                    <div className="absolute top-0 left-8 p-2 sm:p-3 flex flex-col ml-2 mt-7 w-full max-w-[90%] h-[calc(100%-56px)]">
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#8e3e3e] bg-white rounded-full py-1 text-sm text-[#8e3e3e] font-semibold w-fit shadow-md z-10
                          ${records[0]?.fields?.IMAGE?.[0]?.url ? "top-5" : "top-0"}`}
                        style={{ minWidth: "140px", paddingLeft: "1rem", paddingRight: "1rem" }}
                      >
                        {records[0]?.fields?.DATE
                          ? (() => {
                              const date = new Date(records[0].fields.DATE);
                              const options = { month: "long" };
                              const month = date.toLocaleString("en-US", options);
                              const day = String(date.getDate()).padStart(2, "0");
                              const year = date.getFullYear();
                              return `${month}-${day}-${year}`;
                            })()
                          : "Loading..."}
                      </div>

                      {/* Scrollable Content Area */}
                      <div className="flex-1 overflow-y-auto pt-8">
                        {/* Event Image if exists */}
                        {records[0]?.fields?.IMAGE?.[0]?.url && (
                          <div className="w-full h-0 pb-[35%] relative rounded-xl overflow-hidden mt-2 max-w-[400px]">
                            <img
                              src={records[0].fields.IMAGE[0].url}
                              alt="Event Image"
                              className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
                            />
                          </div>
                        )}

                        {/* Event Description with line clamping */}
                        <h3 className="text-[#8e3e3e] font-bold text-md text-center mt-2 max-w-[400px] mx-auto line-clamp-3">
                          {records[0]?.fields?.EVENT || "Event description unavailable"}
                        </h3>

                        {/* Notes with line clamping */}
                        {records[0]?.fields?.NOTES && (
                          <p className="text-sm text-center font-bold text-black mt-1 max-w-[300px] mx-auto line-clamp-3">
                            {records[0].fields.NOTES}
                          </p>
                        )}

                        {/* Button + Keywords */}
                        <div className="flex flex-col mt-1 space-y-1 gap-2">
                          <Button
                            variant="outline"
                            className="self-center text-sm border-[#8e3e3e] text-[#8e3e3e] hover:bg-[#8e3e3e] hover:text-white rounded-full px-2 py-0.5 mt-1"
                            onClick={() => records[0] && handleReadMore(records[0].id)}
                          >
                            Read More →
                          </Button>
                          <div className="w-[98%] h-[2px] bg-[#8e3e3e] mt-3 self-center rounded-full"></div>
                          
                          {/* Scrollable Keywords */}
                          <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto py-1">
                            {records[0]?.fields?.KEYWORDS?.map((tag, index) => (
                              <div
                                key={index}
                                className="bg-[#8a9ac7] text-white font-semibold text-sm px-3 py-1 rounded-full whitespace-nowrap"
                              >
                                {tag}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-[640px] w-[75%] ml-8">
                  <div className="relative">
                    {/* Background Rectangle Image - Now using min-height */}
                    <img
                      src="/images/rightSide_Rectangle.png"
                      alt="Right Rectangle"
                      className={`w-full ${records[2]?.fields?.IMAGE?.[0]?.url ? "min-h-[400px]" : "min-h-[255px]"}`}
                    />

                    {/* Overlay Content - Constrained to image height */}
                    <div className="absolute top-0 left-8 p-2 sm:p-3 flex flex-col ml-2 mt-7 w-full max-w-[90%] h-[calc(100%-56px)]">
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#8e3e3e] bg-white rounded-full py-1 text-sm text-[#8e3e3e] font-semibold w-fit shadow-md z-10
                          ${records[2]?.fields?.IMAGE?.[0]?.url ? "top-5" : "top-0"}`}
                        style={{ minWidth: "140px", paddingLeft: "1rem", paddingRight: "1rem" }}
                      >
                        {records[2]?.fields?.DATE
                          ? (() => {
                              const date = new Date(records[2].fields.DATE);
                              const options = { month: "long" };
                              const month = date.toLocaleString("en-US", options);
                              const day = String(date.getDate()).padStart(2, "0");
                              const year = date.getFullYear();
                              return `${month}-${day}-${year}`;
                            })()
                          : "Loading..."}
                      </div>

                      {/* Scrollable Content Area */}
                      <div className="flex-1 overflow-y-auto pt-8">
                        {/* Event Image if exists */}
                        {records[2]?.fields?.IMAGE?.[0]?.url && (
                          <div className="w-full h-0 pb-[35%] relative rounded-xl overflow-hidden mt-2 max-w-[400px]">
                            <img
                              src={records[2].fields.IMAGE[0].url}
                              alt="Event Image"
                              className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
                            />
                          </div>
                        )}

                        {/* Event Description with line clamping */}
                        <h3 className="text-[#8e3e3e] font-bold text-md text-center mt-2 max-w-[400px] mx-auto line-clamp-3">
                          {records[2]?.fields?.EVENT || "Event description unavailable"}
                        </h3>

                        {/* Notes with line clamping */}
                        {records[2]?.fields?.NOTES && (
                          <p className="text-sm text-center font-bold text-black mt-1 max-w-[300px] mx-auto line-clamp-3">
                            {records[2].fields.NOTES}
                          </p>
                        )}

                        {/* Button + Keywords */}
                        <div className="flex flex-col mt-1 space-y-1 gap-2">
                          <Button
                            variant="outline"
                            className="self-center text-sm border-[#8e3e3e] text-[#8e3e3e] hover:bg-[#8e3e3e] hover:text-white rounded-full px-2 py-0.5 mt-1"
                            onClick={() => records[2] && handleReadMore(records[2].id)}
                          >
                            Read More →
                          </Button>
                          <div className="w-[98%] h-[2px] bg-[#8e3e3e] mt-3 self-center rounded-full"></div>
                          
                          {/* Scrollable Keywords */}
                          <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto py-1">
                            {records[2]?.fields?.KEYWORDS?.map((tag, index) => (
                              <div
                                key={index}
                                className="bg-[#8a9ac7] text-white font-semibold text-sm px-3 py-1 rounded-full whitespace-nowrap"
                              >
                                {tag}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-[1410px] w-[75%] ml-8">
                  <div className="relative">
                    {/* Background Rectangle Image - Now using min-height */}
                    <img
                      src="/images/rightSide_Rectangle.png"
                      alt="Right Rectangle"
                      className={`w-full ${records[4]?.fields?.IMAGE?.[0]?.url ? "min-h-[400px]" : "min-h-[255px]"}`}
                    />

                    {/* Overlay Content - Constrained to image height */}
                    <div className="absolute top-0 left-8 p-2 sm:p-3 flex flex-col ml-2 mt-7 w-full max-w-[90%] h-[calc(100%-56px)]">
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#8e3e3e] bg-white rounded-full py-1 text-sm text-[#8e3e3e] font-semibold w-fit shadow-md z-10
                          ${records[4]?.fields?.IMAGE?.[0]?.url ? "top-5" : "top-0"}`}
                        style={{ minWidth: "140px", paddingLeft: "1rem", paddingRight: "1rem" }}
                      >
                        {records[4]?.fields?.DATE
                          ? (() => {
                              const date = new Date(records[4].fields.DATE);
                              const options = { month: "long" };
                              const month = date.toLocaleString("en-US", options);
                              const day = String(date.getDate()).padStart(2, "0");
                              const year = date.getFullYear();
                              return `${month}-${day}-${year}`;
                            })()
                          : "Loading..."}
                      </div>

                      {/* Scrollable Content Area */}
                      <div className="flex-1 overflow-y-auto pt-8">
                        {/* Event Image if exists */}
                        {records[4]?.fields?.IMAGE?.[0]?.url && (
                          <div className="w-full h-0 pb-[35%] relative rounded-xl overflow-hidden mt-2 max-w-[400px]">
                            <img
                              src={records[4].fields.IMAGE[0].url}
                              alt="Event Image"
                              className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
                            />
                          </div>
                        )}

                        {/* Event Description with line clamping */}
                        <h3 className="text-[#8e3e3e] font-bold text-md text-center mt-2 max-w-[400px] mx-auto line-clamp-3">
                          {records[4]?.fields?.EVENT || "Event description unavailable"}
                        </h3>

                        {/* Notes with line clamping */}
                        {records[4]?.fields?.NOTES && (
                          <p className="text-sm text-center font-bold text-black mt-1 max-w-[300px] mx-auto line-clamp-3">
                            {records[4].fields.NOTES}
                          </p>
                        )}

                        {/* Button + Keywords */}
                        <div className="flex flex-col mt-1 space-y-1 gap-2">
                          <Button
                            variant="outline"
                            className="self-center text-sm border-[#8e3e3e] text-[#8e3e3e] hover:bg-[#8e3e3e] hover:text-white rounded-full px-2 py-0.5 mt-1"
                            onClick={() => records[4] && handleReadMore(records[4].id)}
                          >
                            Read More →
                          </Button>
                          <div className="w-[98%] h-[2px] bg-[#8e3e3e] mt-3 self-center rounded-full"></div>
                          
                          {/* Scrollable Keywords */}
                          <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto py-1">
                            {records[4]?.fields?.KEYWORDS?.map((tag, index) => (
                              <div
                                key={index}
                                className="bg-[#8a9ac7] text-white font-semibold text-sm px-3 py-1 rounded-full whitespace-nowrap"
                              >
                                {tag}
                              </div>
                            ))}
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
