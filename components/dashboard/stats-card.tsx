"use client"

import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: string
  color?: string
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  color = "indigo",
}: StatsCardProps) {
  const colorClasses = {
    indigo: "from-indigo-600 to-purple-600",
    blue: "from-blue-600 to-cyan-600",
    green: "from-green-600 to-emerald-600",
    orange: "from-orange-600 to-red-600",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            colorClasses[color as keyof typeof colorClasses] || colorClasses.indigo
          } opacity-10`}
        />
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">{title}</p>
              <p className="text-3xl font-bold text-gray-100">{value}</p>
              {trend && (
                <p className="text-xs text-gray-500 mt-1">{trend}</p>
              )}
            </div>
            <div
              className={`p-3 rounded-xl bg-gradient-to-br ${
                colorClasses[color as keyof typeof colorClasses] || colorClasses.indigo
              } shadow-lg`}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
