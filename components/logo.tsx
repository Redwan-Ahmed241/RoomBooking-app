interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export default function Logo({ className = "", size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        <svg viewBox="0 0 40 40" className="w-full h-full">
          {/* Location pin background */}
          <path
            d="M20 2C13.373 2 8 7.373 8 14c0 8.5 12 22 12 22s12-13.5 12-22c0-6.627-5.373-12-12-12z"
            fill="#3B82F6"
            className="drop-shadow-sm"
          />
          {/* Villa/house icon inside pin */}
          <g transform="translate(12, 8)">
            <path d="M8 2L2 7v9h2v-6h8v6h2V7L8 2z" fill="white" />
            <path d="M6 12h4v4H6v-4z" fill="white" />
            <circle cx="7" cy="13" r="0.5" fill="#F59E0B" />
            <circle cx="9" cy="13" r="0.5" fill="#F59E0B" />
          </g>
        </svg>
      </div>
      {showText && <span className={`font-bold text-gray-800 ${textSizeClasses[size]}`}>VillaBook</span>}
    </div>
  )
}
