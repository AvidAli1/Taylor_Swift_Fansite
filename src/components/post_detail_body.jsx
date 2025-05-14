// Remove Next.js client directive as it's not needed in Vite
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom" // Replace Next.js navigation with React Router
import dayjs from "dayjs"
import { motion, AnimatePresence } from "framer-motion"

// YouTube video ID extractor
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  if (url.includes("shorts/")) {
    return url.split("shorts/")[1];
  } else if (url.includes("v=")) {
    return url.split("v=")[1].split("&")[0];
  }
  return null;
};

export default function PostDetailBody() {
  const navigate = useNavigate(); // Use React Router's navigate
  const location = useLocation();
  // Parse query params manually using URLSearchParams
  const searchParams = new URLSearchParams(location.search);
  const postId = searchParams.get("id");
  
  // State variables
  const [event, setEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch post data using the postId
    const fetchPostDetails = async () => {
      setLoading(true);
      try {
        if (!postId) {
          console.error("No post ID provided");
          setLoading(false);
          return;
        }

        // Example API call - replace with your actual API endpoint
        const response = await fetch(
          `https://api.airtable.com/v0/appVhtDyx0VKlGbhy/Taylor%20Swift%20Master%20Tracker/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`, // Use Vite env variable format
            },
          }
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch post details");
        }
        
        const data = await response.json();
        setEvent(data.fields);
      } catch (error) {
        console.error("Error fetching post details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  // Modal functions
  const closeModal = () => setIsModalOpen(false);

  const prevImage = () => {
    if (!event?.IMAGE?.length) return;
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? event.IMAGE.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    if (!event?.IMAGE?.length) return;
    setSelectedImageIndex((prevIndex) =>
      prevIndex === event.IMAGE.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isModalOpen) {
        if (e.key === "ArrowLeft") prevImage();
        else if (e.key === "ArrowRight") nextImage();
        else if (e.key === "Escape") closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, selectedImageIndex, event?.IMAGE]);

  // Social media embeds script loading
  useEffect(() => {
    if (!event) return;

    const loadInstagramScript = () => {
      if (!document.getElementById("instagram-embed-script")) {
        const script = document.createElement("script");
        script.id = "instagram-embed-script";
        script.src = "//www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
      } else if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    const loadTwitterScript = () => {
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
      } else if (!document.getElementById("twitter-embed-script")) {
        const script = document.createElement("script");
        script.id = "twitter-embed-script";
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = () => {
          if (window.twttr?.widgets) window.twttr.widgets.load();
        };
        document.body.appendChild(script);
      }
    };

    // Load scripts based on available content
    if (event.INSTAGRAM) loadInstagramScript();
    if (event.TWITTER) loadTwitterScript();
    
    // Load Getty Images script if needed
    if (event["GETTY EMBED"] && !document.getElementById("getty-embed-script")) {
      const script = document.createElement("script");
      script.id = "getty-embed-script";
      script.src = "//www.gettyimages.com/showcase/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [event]);

  // Image URL helper
  const isLikelyImage = (url) => {
    if (!url) return false;
    const lower = url.toLowerCase();
    return (
      /\.(jpg|jpeg|png|webp|gif)$/i.test(lower) ||
      lower.includes("preview.redd.it") ||
      lower.includes("hips.hearstapps.com") ||
      lower.includes("resize=") ||
      lower.includes("crop=smart") ||
      lower.includes("imgur.com/") ||
      lower.includes("media.tumblr.com") ||
      lower.includes("imageproxy") ||
      lower.includes("twimg.com/media/")
    );
  };

  if (loading) {
    return (
      <div className="bg-[#e6edf7] py-8 md:py-12">
        <div className="max-w-4xl mx-auto py-8 bg-[#fef2f2] mb-6 text-center text-[#6b7280]">
          Loading post details...
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="bg-[#e6edf7] py-8 md:py-12">
        <div className="max-w-4xl mx-auto py-8 bg-[#fef2f2] mb-6 text-center text-[#6b7280]">
          No post details available. <button onClick={handleBackToTimeline} className="ml-2 text-red-400 underline">Back to Timeline</button>
        </div>
      </div>
    );
  }

  // Process source links for organizing
  const processSourceLinks = () => {
    if (!event.SOURCES) return { imageLinks: [], nonImageLinks: [] };
    
    const rawUrls = event.SOURCES.split(" || ").map((url) => url.trim());
    const imageLinks = rawUrls.filter((url) => isLikelyImage(url));
    const nonImageLinks = rawUrls.filter((url) => !isLikelyImage(url) && url);
    
    return { imageLinks, nonImageLinks };
  };

  const { imageLinks, nonImageLinks } = processSourceLinks();

  // Determine if we have videos from sources or YouTube
  const hasVideos = event.YOUTUBE || false;
  
  return (
    <div className="bg-[#e6edf7] py-8 md:py-12">
      {/* Ad Placement */}
      <div className="max-w-4xl mx-auto py-4 md:py-8 bg-[#fef2f2] mb-6 text-center text-[#6b7280]">Ad Placement</div>

      {/* Post Details Text */}
      <div className="w-[90%] md:w-[80vw] mx-auto mb-6 rounded-xl border border-red-500 text-red-400 p-3 md:p-5 overflow-hidden">
        <p className="font-semibold mb-2 ml-4 md:ml-[160px]">Notes 🐣</p>
        <div className="ml-4 md:ml-[160px] mt-4 font-normal text-sm md:text-base">
          <p className="mb-2">
            {event.NOTES || "No additional details available for this post."}
          </p>
          
          {/* Source links display */}
          {(nonImageLinks.length > 0) && (
            <div className="mt-4 border-t border-red-200 pt-4">
              <p className="font-semibold mb-2">Sources:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {nonImageLinks.map((url, index) => (
                  <a
                    key={`link-${index}`}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block bg-white text-red-400 px-3 py-1 rounded-full text-sm border border-red-200 ${url.includes("tumblr.com") ? "border-blue-300" : ""}`}
                  >
                    {url && new URL(url).hostname.replace("www.", "")}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Post Details Images - Combines both IMAGE array and image source links */}
      {((event.IMAGE && event.IMAGE.length > 0) || imageLinks.length > 0) && (
        <div className="w-[90%] md:w-[80vw] mx-auto mb-6 mt-8 md:mt-16 rounded-xl border border-red-500 text-red-400 p-3 md:p-5 overflow-hidden">
          <p className="font-semibold mb-2 ml-4 md:ml-[116px] mt-3">Images</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 ml-0 md:ml-[116px] mt-4">
            {/* From IMAGE array */}
            {event.IMAGE && event.IMAGE.map((img, index) => (
              <img
                key={`gallery-${index}`}
                src={img.url}
                alt={`Post Detail ${index + 1}`}
                className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] rounded-lg object-cover cursor-pointer"
                onClick={() => {
                  setSelectedImageIndex(index);
                  setIsModalOpen(true);
                }}
              />
            ))}
            
            {/* From source links */}
            {imageLinks.map((url, index) => (
              <img
                key={`source-${index}`}
                src={url}
                alt={`Source Image ${index + 1}`}
                className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] rounded-lg object-cover cursor-pointer"
                onClick={() => {
                  // For source images, we need to handle them separately since they're not in the IMAGE array
                  const adjustedIndex = event.IMAGE ? event.IMAGE.length + index : index;
                  setSelectedImageIndex(adjustedIndex);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Getty Embed section */}
      {event["GETTY EMBED"] && (
        <div className="w-[90%] md:w-[80vw] mx-auto mb-6 mt-8 md:mt-16 rounded-xl border border-red-500 text-red-400 p-3 md:p-5 overflow-hidden">
          <p className="font-semibold mb-2 ml-4 md:ml-[116px] mt-3">Getty Images</p>
          <div className="flex justify-center w-full mt-4">
            <div 
              className="getty-embed w-full max-w-4xl" 
              dangerouslySetInnerHTML={{ __html: event["GETTY EMBED"] }}
            />
          </div>
        </div>
      )}

      {/* YouTube Videos Section */}
      {hasVideos && (
        <div className="w-[90%] md:w-[80vw] mx-auto mb-6 mt-8 md:mt-16 rounded-xl border border-red-500 text-red-400 p-3 md:p-5 overflow-hidden">
          <p className="font-semibold mb-2 ml-4 md:ml-[116px] mt-3">Videos</p>
          <div className="flex flex-col items-center gap-6 mt-4">
            {event.YOUTUBE?.split(",").map((url, index) => {
              const videoId = getYouTubeVideoId(url.trim());
              return videoId ? (
                <div key={index} className="w-full max-w-4xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={`YouTube Video ${index + 1}`}
                    className="w-full aspect-video rounded-xl"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Instagram Embeds */}
      {event.INSTAGRAM && (
        <div className="w-[90%] md:w-[80vw] mx-auto mb-6 mt-8 md:mt-16 rounded-xl border border-red-500 text-red-400 p-3 md:p-5 overflow-hidden">
          <p className="font-semibold mb-2 ml-4 md:ml-[116px] mt-3">Instagram</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {event.INSTAGRAM.split(" || ").map((rawUrl, index) => {
              const url = rawUrl.trim().split("?")[0];
              return url ? (
                <div key={index} className="instagram-container max-w-sm">
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink={url}
                    data-instgrm-version="14"
                    style={{
                      background: "#FFF",
                      borderRadius: "3px",
                      border: "1px solid #dbdbdb",
                      boxShadow: "none",
                      margin: "0",
                      minWidth: "326px",
                      padding: "0",
                    }}
                  ></blockquote>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Twitter Embeds */}
      {event.TWITTER && (
        <div className="w-[90%] md:w-[80vw] mx-auto mb-6 mt-8 md:mt-16 rounded-xl border border-red-500 text-red-400 p-3 md:p-5 overflow-hidden">
          <p className="font-semibold mb-2 ml-4 md:ml-[116px] mt-3">Twitter/X</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {event.TWITTER.split(/ \|\| |\s+/).map((url, index) => {
              const cleanUrl = url.trim().replace("x.com", "twitter.com");
              const isValid = /^https:\/\/twitter\.com\/[^/]+\/status\/\d+/.test(cleanUrl);
              return isValid ? (
                <div key={index} className="twitter-container">
                  <blockquote className="twitter-tweet" data-lang="en">
                    <a href={cleanUrl}>{cleanUrl}</a>
                  </blockquote>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Image Modal - Handles both IMAGE array and source image links */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                // Determine if we're showing an IMAGE array image or a source image
                const imageArrayLength = event.IMAGE?.length || 0;
                
                if (selectedImageIndex < imageArrayLength) {
                  // Show image from IMAGE array
                  return (
                    <img
                      src={event.IMAGE[selectedImageIndex].url}
                      alt="Full view"
                      className="max-w-full max-h-[80vh] object-contain rounded-lg"
                    />
                  );
                } else if (imageLinks[selectedImageIndex - imageArrayLength]) {
                  // Show image from source links
                  return (
                    <img
                      src={imageLinks[selectedImageIndex - imageArrayLength]}
                      alt="Full view"
                      className="max-w-full max-h-[80vh] object-contain rounded-lg"
                    />
                  );
                } else {
                  return (
                    <p className="text-white bg-black bg-opacity-50 p-4 rounded-lg">No image to display.</p>
                  );
                }
              })()}
              
              <button 
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-400 text-white rounded-full" 
                onClick={closeModal}
              >
                ✕
              </button>
              
              <button 
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-red-400 text-white rounded-full opacity-70 hover:opacity-100" 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
              >
                ←
              </button>
              
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-red-400 text-white rounded-full opacity-70 hover:opacity-100" 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
              >
                →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}