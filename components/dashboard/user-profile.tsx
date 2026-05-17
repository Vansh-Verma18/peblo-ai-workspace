"use client"

import { useState, useRef, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  User,
  Settings,
  Moon,
  Sun,
  LogOut,
  ChevronUp,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function UserProfile() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const user = session?.user
  const userName = user?.name || "User"
  const userEmail = user?.email || "user@example.com"
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
    // Theme toggle logic would go here
  }

  const menuItems = [
    {
      icon: User,
      label: "Profile",
      onClick: () => {
        console.log("Profile clicked")
        setIsOpen(false)
      },
    },
    {
      icon: Settings,
      label: "Settings",
      onClick: () => {
        console.log("Settings clicked")
        setIsOpen(false)
      },
    },
    {
      icon: theme === "dark" ? Sun : Moon,
      label: theme === "dark" ? "Light Mode" : "Dark Mode",
      onClick: () => {
        toggleTheme()
        setIsOpen(false)
      },
    },
    {
      icon: LogOut,
      label: "Logout",
      onClick: () => signOut({ callbackUrl: "/login" }),
      danger: true,
    },
  ]

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full p-3 rounded-xl
          flex items-center gap-3
          transition-all duration-200
          hover:bg-gray-800/50
          group
          ${isOpen ? "bg-gray-800/50" : ""}
        `}
      >
        {/* Avatar with gradient ring */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
          <Avatar className="w-10 h-10 border-2 border-gray-700 group-hover:border-purple-500 transition-colors relative">
            <AvatarImage src={user?.image || undefined} alt={userName} />
            <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white font-semibold">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* User Info */}
        <div className="flex-1 text-left overflow-hidden">
          <p className="text-sm font-semibold text-white truncate">
            {userName}
          </p>
          <p className="text-xs text-gray-400 truncate">
            {userEmail}
          </p>
        </div>

        {/* Chevron Icon */}
        <ChevronUp
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-0 right-0 mb-2 p-2 rounded-xl bg-gray-900 border border-gray-800 shadow-2xl backdrop-blur-xl"
          >
            <div className="space-y-1">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`
                    w-full px-3 py-2 rounded-lg
                    flex items-center gap-3
                    text-sm font-medium
                    transition-all duration-150
                    ${
                      item.danger
                        ? "text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }
                  `}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
