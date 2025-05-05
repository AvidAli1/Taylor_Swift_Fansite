export default function post_detail_body() {
    return (
      <div className="bg-[#e6edf7] py-8 md:py-12">
        {/* Ad Placement */}
        <div className="max-w-4xl mx-auto py-4 md:py-8 bg-[#fef2f2] mb-6 text-center text-[#6b7280]">Ad Placement</div>
  
        {/* Post Details Text */}
        <div className="w-[90%] md:w-[80vw] mx-auto mb-6 rounded-xl border border-red-500 text-red-400 p-3 md:p-5 overflow-hidden">
          <p className="font-semibold mb-2 ml-4 md:ml-[160px]">Notes 🐣</p>
          <div className="ml-4 md:ml-[160px] mt-4 font-normal text-sm md:text-base">
            <p className="mb-2">
              On April 19, 2019, Taylor posted a photo of a pastel-colored portrait featuring baby chicks, sparking
              speculation among fans that something big was coming. With the caption simply reading "4.26", Swifties
              around the world began theorizing what the date could mean — and this post quickly became a turning point in
              the Lover album rollout.
            </p>
            <p>
              This cryptic post was later revealed to be part of the countdown to her upcoming single "ME!" featuring
              Brendon Urie. The aesthetic shift toward soft pastels and playful visuals marked a distinct departure from
              the darker tone of Reputation.
            </p>
          </div>
        </div>
  
        {/* Post Details Images */}
        <div className="w-[90%] md:w-[80vw] mx-auto mb-6 mt-8 md:mt-16 rounded-xl border border-red-500 text-red-400 p-3 md:p-5 overflow-hidden">
          <p className="font-semibold mb-2 ml-4 md:ml-[116px] mt-3">Images</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 ml-0 md:ml-[116px] mt-4">
            <img
              src="/images/taylor_1.png"
              alt="Post Detail 1"
              className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] rounded-lg object-cover"
            />
            <img
              src="/images/taylor_2.png"
              alt="Post Detail 2"
              className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] rounded-lg object-cover"
            />
            <img
              src="/images/taylor_3.png"
              alt="Post Detail 3"
              className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] rounded-lg object-cover"
            />
            <img
              src="/images/taylor_4.png"
              alt="Post Detail 4"
              className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] rounded-lg object-cover"
            />
          </div>
        </div>
  
        {/* Post Details Video */}
        <div className="w-[90%] md:w-[80vw] mx-auto mb-6 mt-8 md:mt-16 rounded-xl border border-gray-500 text-gray-400 p-3 md:p-5 overflow-hidden">
          <p className="font-semibold mb-2 ml-4 md:ml-[116px] mt-3">Video</p>
          <div className="flex justify-center w-full">
            <video src="/images/taylor_vid.mp4" controls className="w-full max-w-4xl rounded-xl" />
          </div>
        </div>
      </div>
    )
  }
  