import { useState, useEffect, useCallback, useRef } from "react"
import { DashboardStats } from "@/types"

interface UseDashboardStatsReturn {
  stats: DashboardStats | null
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export function useDashboardStats(): UseDashboardStatsReturn {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  // Prevent duplicate requests
  const fetchingRef = useRef(false)
  const cacheRef = useRef<{ data: DashboardStats; timestamp: number } | null>(null)
  const CACHE_TIME = 60000 // 1 minute cache for dashboard stats

  const fetchStats = useCallback(async () => {
    // Check cache first
    if (cacheRef.current && Date.now() - cacheRef.current.timestamp < CACHE_TIME) {
      setStats(cacheRef.current.data)
      setIsLoading(false)
      return
    }

    // Prevent duplicate requests
    if (fetchingRef.current) return
    fetchingRef.current = true

    try {
      const response = await fetch("/api/dashboard/stats")
      if (!response.ok) throw new Error("Failed to fetch stats")

      const data = await response.json()
      setStats(data)
      setError(null)
      
      // Update cache
      cacheRef.current = { data, timestamp: Date.now() }
    } catch (err) {
      setError(err as Error)
      console.error("Failed to fetch stats:", err)
    } finally {
      setIsLoading(false)
      fetchingRef.current = false
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  const refetch = useCallback(async () => {
    cacheRef.current = null // Invalidate cache
    setIsLoading(true)
    await fetchStats()
  }, [fetchStats])

  return {
    stats,
    isLoading,
    error,
    refetch,
  }
}
