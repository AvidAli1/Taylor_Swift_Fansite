import { Button } from "./ui/Button"

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="relative">
        {/* Background Image */}
        <div className="relative w-full h-[340px]">
          <img
            src="/images/taylor_swift_background.png"
            alt="Taylor Swift Background"
            className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Ad Placement */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white/90 p-5 rounded-lg text-center">
          <h3 className="text-[#6b7db3] text-lg font-medium mb-3">Ad Placement</h3>
        </div>
      </div>

      {/* Support Buttons */}
      <div className="bg-[#e8ecf7] py-5 flex justify-center gap-3">
        <a
          href="https://buymeacoffee.com/swiftlore"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="secondary" className="rounded-full px-7">
            Support Us
          </Button>
        </a>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSc0f-asKuKOM81V3sPMusyvSkdcFr9XqrGVT0VgodPKKpkKPg/viewform?usp=header"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="secondary" className="rounded-full px-7">
            Submit Suggestion
          </Button>
        </a>
      </div>

      {/* Copyright */}
      <div className="bg-[#8a9ad4] py-3 text-center text-white">
        <p className="text-sm">Copyright © 2025 Swift Lore</p>
      </div>
    </footer>
  )
}