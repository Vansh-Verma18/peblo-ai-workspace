"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AIAssistButtonProps {
  onClick: () => void
  isActive?: boolean
}

export function AIAssistButton({ onClick, isActive }: AIAssistButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative">
      <Button
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`
          relative group
          w-12 h-12
          bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600
          hover:from-purple-500 hover:via-violet-500 hover:to-blue-500
          text-white font-semibold
          rounded-lg
          shadow-lg shadow-purple-500/50
          hover:shadow-xl hover:shadow-purple-500/60
          transition-all duration-300
          border-0
          p-0
          ${isActive ? 'ring-2 ring-purple-400 ring-offset-2 ring-offset-gray-950' : ''}
        `}
      >
        {/* Animated glow effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
        
        {/* Sparkle animation */}
        <div className="absolute -top-1 -right-1">
          <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse" />
        </div>
        
        {/* Button content - Icon only */}
        <div className="relative flex items-center justify-center">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>

        {/* Shimmer effect */}
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </Button>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl px-3 py-2">
            <p className="font-semibold text-purple-400 text-sm whitespace-nowrap">✨ AI Assistant</p>
          </div>
        </div>
      )}
    </div>
  )
}
