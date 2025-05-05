import { cn } from "../../lib/utils"

/**
 * Button component with different variants
 */
export function Button({ className, variant = "default", size = "default", children, ...props }) {
  const baseStyles =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

  const variants = {
    default: "bg-[#8a9ad4] text-white hover:bg-[#7a8ac4]",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-[#b66b6b] text-white hover:bg-[#a55e5e]",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  }

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  }

  return (
    <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}

export default Button
