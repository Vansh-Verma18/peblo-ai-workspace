"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  FileText,
  Archive,
  Plus,
  Sparkles,
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { UserProfile } from "./user-profile"

interface SidebarProps {
  onNewNote?: () => void
}

export function Sidebar({ onNewNote }: SidebarProps) {
  const pathname = usePathname()

  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/dashboard/notes",
      label: "Notes",
      icon: FileText,
    },
    {
      href: "/dashboard/archived",
      label: "Archived",
      icon: Archive,
    },
  ]

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 h-screen bg-gray-900/50 backdrop-blur-xl border-r border-gray-800 flex flex-col"
    >
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/50">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Peblo AI</h1>
            <p className="text-xs text-gray-400">Workspace</p>
          </div>
        </div>

        <Button
          onClick={onNewNote}
          className="w-full mb-6"
          size="lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Note
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-gray-700 bg-gray-800 px-1.5 font-mono text-[10px] font-medium text-gray-400 opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>

        <nav className="space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link key={link.href} href={link.href}>
                <div className="relative">
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start relative",
                      isActive
                        ? "text-indigo-400 hover:text-indigo-300"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    )}
                  >
                    <link.icon className="w-4 h-4 mr-3" />
                    {link.label}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400"
                      />
                    )}
                  </Button>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* User Profile Section */}
      <div className="mt-auto p-4 border-t border-gray-800/50">
        <UserProfile />
      </div>
    </motion.aside>
  )
}
