export default function TimelineBody() {
    // Sample data for the posts
    const posts = [
      {
        id: 1,
        date: "Apr 05, 2023",
        category: "Live Performance",
        title: "Taylor performs at the Philadelphia 76ers NBA game",
        location: "Philadelphia, Pennsylvania - Performance",
        image: "/images/taylor_timeline_default.jpeg",
      },
      {
        id: 2,
        date: "Apr 05, 2023",
        category: "Live Performance",
        title: "Taylor performs at the Philadelphia 76ers NBA game",
        location: "Philadelphia, Pennsylvania - Performance",
        image: "/images/taylor_timeline_default.jpeg",
      },
      {
        id: 3,
        date: "Apr 05, 2023",
        category: "Live Performance",
        title: "Taylor performs at the Philadelphia 76ers NBA game",
        location: "Philadelphia, Pennsylvania - Performance",
        image: "/images/taylor_timeline_default.jpeg",
      },
      {
        id: 4,
        date: "Apr 05, 2023",
        category: "Live Performance",
        title: "Taylor performs at the Philadelphia 76ers NBA game",
        location: "Philadelphia, Pennsylvania - Performance",
        image: "/images/taylor_timeline_default.jpeg",
      },
      {
        id: 5,
        date: "Apr 05, 2023",
        category: "Live Performance",
        title: "Taylor performs at the Philadelphia 76ers NBA game",
        location: "Philadelphia, Pennsylvania - Performance",
        image: "/images/taylor_timeline_default.jpeg",
      },
      {
        id: 6,
        date: "Apr 05, 2023",
        category: "Live Performance",
        title: "Taylor performs at the Philadelphia 76ers NBA game",
        location: "Philadelphia, Pennsylvania - Performance",
        image: "/images/taylor_timeline_default.jpeg",
      },
      {
        id: 7,
        date: "Apr 05, 2023",
        category: "Live Performance",
        title: "Taylor performs at the Philadelphia 76ers NBA game",
        location: "Philadelphia, Pennsylvania - Performance",
        image: "/images/taylor_timeline_default.jpeg",
      },
      {
        id: 8,
        date: "Apr 05, 2023",
        category: "Live Performance",
        title: "Taylor performs at the Philadelphia 76ers NBA game",
        location: "Philadelphia, Pennsylvania - Performance",
        image: "/images/taylor_timeline_default.jpeg",
      },
      {
        id: 9,
        date: "Apr 05, 2023",
        category: "Live Performance",
        title: "Taylor performs at the Philadelphia 76ers NBA game",
        location: "Philadelphia, Pennsylvania - Performance",
        image: "/images/taylor_timeline_default.jpeg",
      },
      {
        id: 10,
        date: "Apr 05, 2023",
        category: "Live Performance",
        title: "Taylor performs at the Philadelphia 76ers NBA game",
        location: "Philadelphia, Pennsylvania - Performance",
        image: "/images/taylor_timeline_default.jpeg",
      },
      {
        id: 11,
        date: "Apr 05, 2023",
        category: "Live Performance",
        title: "Taylor performs at the Philadelphia 76ers NBA game",
        location: "Philadelphia, Pennsylvania - Performance",
        image: "/images/taylor_timeline_default.jpeg",
      },
      {
        id: 12,
        date: "Apr 05, 2023",
        category: "Live Performance",
        title: "Taylor performs at the Philadelphia 76ers NBA game",
        location: "Philadelphia, Pennsylvania - Performance",
        image: "/images/taylor_timeline_default.jpeg",
      },
    ]
  
    return (
      <div className="bg-[#e6edf7] py-8">
        
        {/* Ad Placement */}
        <div className="max-w-4xl mx-auto py-8 bg-[#fef2f2] mb-6 text-center text-[#6b7280]">Ad Placement</div>
  
        {/* Filters */}
        <div className="max-w-6xl mx-auto px-4 mb-6 flex flex-wrap gap-2 py-8">
          {/* Sort By */}
          <div className="relative">
            <button className="flex items-center justify-between bg-white text-[#6b7db3] border border-[#6b7db3] rounded-full px-4 py-1.5 text-sm min-w-[100px]">
              <span>Sort By</span>
              <span className="ml-2">▼</span>
            </button>
          </div>
  
          {/* Filter Key words */}
          <div className="relative">
            <button className="flex items-center justify-between bg-white text-[#6b7db3] border border-[#6b7db3] rounded-full px-4 py-1.5 text-sm min-w-[150px]">
              <span>Filter Key words</span>
              <span className="ml-2">▼</span>
            </button>
          </div>
  
          {/* Start Date */}
          <div className="relative">
            <button className="flex items-center justify-between bg-white text-[#6b7db3] border border-[#6b7db3] rounded-full px-4 py-1.5 text-sm min-w-[120px]">
              <span>Start Date</span>
              <svg
                className="ml-2 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                >
                {/* Paste SVG path data below (example only): */}
                <path d="M3 4a1 1 0 011-1h1V2h2v1h8V2h2v1h1a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 4v12h16V8H4zm2 2h2v2H6v-2zm4 0h2v2h-2v-2z" />
              </svg>
            </button>
          </div>
  
          {/* End Date */}
          <div className="relative">
            <button className="flex items-center justify-between bg-white text-[#6b7db3] border border-[#6b7db3] rounded-full px-4 py-1.5 text-sm min-w-[120px]">
              <span>End Date</span>
              <svg
                className="ml-2 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                >
                {/* Paste SVG path data below (example only): */}
                <path d="M3 4a1 1 0 011-1h1V2h2v1h8V2h2v1h1a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 4v12h16V8H4zm2 2h2v2H6v-2zm4 0h2v2h-2v-2z" />
              </svg>
            </button>
          </div>
  
          {/* Month/Day */}
          <div className="relative">
            <button className="flex items-center justify-between bg-white text-[#6b7db3] border border-[#6b7db3] rounded-full px-4 py-1.5 text-sm min-w-[120px]">
              <span>Month/Day</span>
              <svg
                className="ml-2 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                >
                {/* Paste SVG path data below (example only): */}
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
  
        {/* Posts Grid */}
        <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-[#ffe8e8] rounded-xl overflow-hidden border border-[#ffcaca]">
              <div className="relative py-1">
                {/* Date label with white background */}
                <div className="absolute -top-0.1 left-5 bg-white text-[#b91c1c] text-xs font-medium px-2 py-1 rounded-full z-10">
                  {post.date}
                </div>

                {/* Category label with white background */}
                <div className="absolute -top-0.1 right-4 bg-white text-[#b91c1c] text-xs font-medium px-2 py-1 rounded-full z-10">
                  {post.category}
                </div>

                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-[90%] h-40 object-cover object-[center_35%] ml-4 mt-2 rounded-[3%]"/>
              </div>

              <div className="p-3">
                <h3 className="text-[#b91c1c] font-medium text-base mb-1">{post.title}</h3>
                <p className="text-[#e06666] text-xs mb-3">{post.location}</p>

                {/* Read More button with lighter background */}
                <button className="w-full bg-[#fff5f5] text-[#b91c1c] border border-[#ffcaca] rounded-full py-1.5 px-4 text-sm font-medium flex items-center justify-center">
                  Read More
                  <span className="ml-1">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* Pagination */}
        <div className="max-w-6xl mx-auto px-4 my-8 flex justify-center items-center gap-2">
          <span className="text-sm text-[#bb6d6d]">Previous Page</span>
          <button className="w-8 h-8 flex items-center justify-center rounded-full border border-[#bb6d6d] bg-[#e6edf7] text-[#bb6d6d]">
            &lt;
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full border border-[#bb6d6d] bg-[#e6edf7] text-[#bb6d6d]">
            &gt;
          </button>
          <span className="text-sm text-[#bb6d6d]">Next Page</span>
        </div>
  
        {/* View On This Day Button */}
        <div className="max-w-6xl mx-auto px-4 mb-0">
          <button className="w-full bg-[#c25e5e] text-white py-3 rounded-full font-medium">View On This Day</button>
        </div>
        <br/>
      </div>
    )
  }
  
