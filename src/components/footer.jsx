import { Button } from "./ui/Button"

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="relative">
        {/* Background Image */}
        <div className="relative w-full h-[400px]">
          <img
            src="/images/taylor_swift_background.png"
            alt="Taylor Swift Background"
            className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Ad Placement */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white/90 p-6 rounded-lg text-center">
          <h3 className="text-[#6b7db3] text-xl font-medium mb-4">Ad Placement</h3>
        </div>
      </div>

      {/* Support Buttons */}
      <div className="bg-[#e8ecf7] py-6 flex justify-center gap-4">
        <Button variant="secondary" className="rounded-full px-8">
          Support Us
        </Button>
        <Button variant="secondary" className="rounded-full px-8">
          Submit Suggestion
        </Button>
      </div>

      {/* Copyright */}
      <div className="bg-[#8a9ad4] py-4 text-center text-white">
        <p>Copyright © 2025 Swift Lore</p>
      </div>
    </footer>
  )
}
