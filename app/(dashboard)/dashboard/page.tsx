"use client"

import { StatsSkeleton } from "@/components/dashboard/stats-skeleton"
import { StatsCard } from "@/components/dashboard/stats-card"
import { ActivityChart } from "@/components/dashboard/activity-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, TrendingUp, Sparkles, Tag } from "lucide-react"
import { motion } from "framer-motion"
import { useDashboardStats } from "@/hooks/use-dashboard-stats"

export default function DashboardPage() {
  const { stats, isLoading } = useDashboardStats()

  if (isLoading) {
    return (
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here's your workspace overview.</p>
        </div>
        <StatsSkeleton />
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's your workspace overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Notes"
          value={stats?.totalNotes || 0}
          icon={FileText}
          color="indigo"
        />
        <StatsCard
          title="This Week"
          value={stats?.notesThisWeek || 0}
          icon={TrendingUp}
          trend="+12% from last week"
          color="blue"
        />
        <StatsCard
          title="AI Assists"
          value={stats?.aiUsageCount || 0}
          icon={Sparkles}
          color="green"
        />
        <StatsCard
          title="Top Tags"
          value={stats?.topTags?.length || 0}
          icon={Tag}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityChart data={stats?.weeklyActivity || []} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Popular Tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats?.topTags && stats.topTags.length > 0 ? (
              stats.topTags.map((tag, index) => (
                <motion.div
                  key={tag.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <Badge
                    variant="secondary"
                    style={{
                      backgroundColor: `${tag.color}20`,
                      borderColor: `${tag.color}40`,
                      color: tag.color,
                    }}
                  >
                    {tag.name}
                  </Badge>
                  <span className="text-sm text-gray-400">{tag.count} notes</span>
                </motion.div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No tags yet. Start adding tags to your notes!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
