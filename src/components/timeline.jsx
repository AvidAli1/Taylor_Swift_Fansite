"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/Button";
import { useNavigate } from "react-router-dom";

import "./timeline.css";

export default function Timeline() {
  const navigate = useNavigate();

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
                  <span className="text-sm sm:text-xl md:text-3xl lg:text-5xl block mt-1">
                    in Taylor Swift History
                  </span>
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
              className="rounded-full px-2 sm:px-4 md:px-6 text-xs sm:text-sm flex items-center gap-1 md:gap-2"
            >
              <ChevronLeft size={12} className="md:size-16" />
              <span className="hidden sm:inline">Previous Day</span>
              <span className="sm:hidden">Prev</span>
            </Button>

            <div className="bg-white rounded-full px-4 sm:px-6 md:px-8 py-1 md:py-2 min-w-[120px] sm:min-w-[160px] md:min-w-[200px] border border-[#b66b6b]">
              <span className="text-[#8e3e3e] text-sm md:text-base font-medium">
                APRIL 20
              </span>
            </div>

            <Button
              variant="secondary"
              className="rounded-full px-2 sm:px-4 md:px-6 text-xs sm:text-sm flex items-center gap-1 md:gap-2"
            >
              <span className="hidden sm:inline">Next Day</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight size={12} className="md:size-16" />
            </Button>
          </div>
        </div>

        {/* Timeline Section - Mobile vs Desktop layouts */}
        <div className="relative mt-6 md:mt-12 mb-4 md:mb-8 flex-grow overflow-hidden">
          {/* Mobile Timeline (Single Column) */}
          <div className="md:hidden h-[60vh] overflow-y-auto">
            <div className="relative flex justify-center">
              {/* Center line */}
              <div className="relative w-[2px] flex flex-col items-center bg-[#e8ecf7]">
                <div className="h-[1880px] w-[3px] bg-[#8a9ad4]"></div>

                {/* Circles on the line */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[0px] w-5 h-5 rounded-full bg-[#6B78B4]"></div>
                <div className="absolute left-1/2 -translate-x-1/2 top-[200px] w-5 h-5 rounded-full bg-[#FEE6E3] border-2 border-[#6B78B4]"></div>
                <div className="absolute left-1/2 -translate-x-1/2 top-[400px] w-5 h-5 rounded-full bg-[#FEE6E3] border-2 border-[#6B78B4]"></div>
                <div className="absolute left-1/2 -translate-x-1/2 top-[600px] w-5 h-5 rounded-full bg-[#FEE6E3] border-2 border-[#6B78B4]"></div>
                <div className="absolute left-1/2 -translate-x-1/2 top-[800px] w-5 h-5 rounded-full bg-[#FEE6E3] border-2 border-[#6B78B4]"></div>
                <div className="absolute left-1/2 -translate-x-1/2 top-[1000px] w-5 h-5 rounded-full bg-[#FEE6E3] border-2 border-[#6B78B4]"></div>
                <div className="absolute left-1/2 -translate-x-1/2 top-[1200px] w-5 h-5 rounded-full bg-[#6B78B4]"></div>
              </div>

              {/* Mobile Timeline Items - All on right side */}
              <div className="absolute left-[20px] w-[calc(100%-30px)] space-y-[50px] pb-4">
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                  <div
                    key={index}
                    className="relative mt-[50px]"
                    style={{ marginTop: index === 0 ? "20px" : "" }}
                  >
                    <div className="bg-[#fce0e0] rounded-[10px] shadow-md p-4">
                      <div className="bg-[#fce0e0] rounded-lg px-2 py-1 text-xs text-[#8a9ad4] font-medium inline-block mb-2">
                        2024
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="w-full h-[160px] relative rounded-lg overflow-hidden">
                          <img
                            src="/images/taylor_timeline_default.jpeg"
                            alt="Taylor Swift"
                            className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
                          />
                        </div>
                        <h3 className="text-[#8e3e3e] font-medium text-sm">
                          Taylor and Travis Kelce vacation in Carmel-by-the-Sea
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
                    <img
                      src="/images/leftSide_rectangle.png"
                      alt="Left Rectangle"
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 p-8">
                      <div className="bg-white rounded-lg px-3 py-1 text-xs text-[#8a9ad4] font-medium inline-block mb-2">
                        2024
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="w-full md:w-[520px] h-[260px] relative rounded-lg overflow-hidden">
                          <img
                            src="/images/taylor_timeline_default.jpeg"
                            alt="Taylor Swift"
                            className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
                          />
                        </div>
                        <h3 className="text-[#8e3e3e] font-medium text-sm">
                          Taylor and Travis Kelce vacation in Carmel-by-the-Sea
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
                </div>

                <div className="relative py-24">
                  <div className="relative">
                    <img
                      src="/images/leftSide_rectangle.png"
                      alt="Left Rectangle"
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 p-8">
                      <div className="bg-white rounded-lg px-3 py-1 text-xs text-[#8a9ad4] font-medium inline-block mb-2">
                        2024
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="w-full md:w-[520px] h-[260px] relative rounded-lg overflow-hidden">
                          <img
                            src="/images/taylor_timeline_default.jpeg"
                            alt="Taylor Swift"
                            className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
                          />
                        </div>
                        <h3 className="text-[#8e3e3e] font-medium text-sm">
                          Taylor and Travis Kelce vacation in Carmel-by-the-Sea
                        </h3>
                        <Button
                          variant="outline"
                          className="self-start text-xs border-[#8e3e3e] text-[#8e3e3e] hover:bg-[#8e3e3e] hover:text-white rounded-full px-4 py-1"
                        >
                          Read More →
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative py-12">
                  <div className="relative">
                    <img
                      src="/images/leftSide_rectangle.png"
                      alt="Left Rectangle"
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 p-8">
                      <div className="bg-white rounded-lg px-3 py-1 text-xs text-[#8a9ad4] font-medium inline-block mb-2">
                        2024
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="w-full md:w-[520px] h-[260px] relative rounded-lg overflow-hidden">
                          <img
                            src="/images/taylor_timeline_default.jpeg"
                            alt="Taylor Swift"
                            className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
                          />
                        </div>
                        <h3 className="text-[#8e3e3e] font-medium text-sm">
                          Taylor and Travis Kelce vacation in Carmel-by-the-Sea
                        </h3>
                        <Button
                          variant="outline"
                          className="self-start text-xs border-[#8e3e3e] text-[#8e3e3e] hover:bg-[#8e3e3e] hover:text-white rounded-full px-4 py-1"
                        >
                          Read More →
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side content */}
              <div className="absolute right-[-3px] w-[calc(50%-15px)] space-y-[76px] origin-top-left lg:scale-[0.75] md:scale-[0.65]">
                <div className="relative mt-[12px]">
                  <div className="relative">
                    <img
                      src="/images/rightSide_Rectangle.png"
                      alt="Right Rectangle"
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 py-8 px-20">
                      <div className="bg-white rounded-lg px-3 py-1 text-xs text-[#8a9ad4] font-medium inline-block mb-2">
                        2024
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="w-full md:w-[520px] h-[260px] relative rounded-lg overflow-hidden">
                          <img
                            src="/images/taylor_timeline_default.jpeg"
                            alt="Taylor Swift"
                            className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
                          />
                        </div>
                        <h3 className="text-[#8e3e3e] font-medium text-sm">
                          Taylor and Travis Kelce vacation in Carmel-by-the-Sea
                        </h3>
                        <Button
                          variant="outline"
                          className="self-start text-xs border-[#8e3e3e] text-[#8e3e3e] hover:bg-[#8e3e3e] hover:text-white rounded-full px-4 py-1"
                        >
                          Read More →
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative py-44">
                  <div className="relative">
                    <img
                      src="/images/rightSide_Rectangle.png"
                      alt="Right Rectangle"
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 py-8 px-20">
                      <div className="bg-white rounded-lg px-3 py-1 text-xs text-[#8a9ad4] font-medium inline-block mb-2">
                        2024
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="w-full md:w-[520px] h-[260px] relative rounded-lg overflow-hidden">
                          <img
                            src="/images/taylor_timeline_default.jpeg"
                            alt="Taylor Swift"
                            className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
                          />
                        </div>
                        <h3 className="text-[#8e3e3e] font-medium text-sm">
                          Taylor and Travis Kelce vacation in Carmel-by-the-Sea
                        </h3>
                        <Button
                          variant="outline"
                          className="self-start text-xs border-[#8e3e3e] text-[#8e3e3e] hover:bg-[#8e3e3e] hover:text-white rounded-full px-4 py-1"
                        >
                          Read More →
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative py-16">
                  <div className="relative">
                    <img
                      src="/images/rightSide_Rectangle.png"
                      alt="Right Rectangle"
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 py-8 px-20">
                      <div className="bg-white rounded-lg px-3 py-1 text-xs text-[#8a9ad4] font-medium inline-block mb-2">
                        2024
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="w-full md:w-[520px] h-[260px] relative rounded-lg overflow-hidden">
                          <img
                            src="/images/taylor_timeline_default.jpeg"
                            alt="Taylor Swift"
                            className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
                          />
                        </div>
                        <h3 className="text-[#8e3e3e] font-medium text-sm">
                          Taylor and Travis Kelce vacation in Carmel-by-the-Sea
                        </h3>
                        <Button
                          variant="outline"
                          className="self-start text-xs border-[#8e3e3e] text-[#8e3e3e] hover:bg-[#8e3e3e] hover:text-white rounded-full px-4 py-1"
                        >
                          Read More →
                        </Button>
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
  );
}
