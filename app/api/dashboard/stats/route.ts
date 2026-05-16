import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    // Total notes
    const totalNotes = await prisma.note.count({
      where: { userId, isArchived: false },
    })

    // Notes created this week
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const notesThisWeek = await prisma.note.count({
      where: {
        userId,
        createdAt: { gte: oneWeekAgo },
        isArchived: false,
      },
    })

    // AI usage count
    const aiUsageCount = await prisma.aIUsage.count({
      where: { userId },
    })

    // Top tags
    const tagCounts = await prisma.noteTag.groupBy({
      by: ["tagId"],
      _count: { tagId: true },
      where: {
        note: {
          userId,
          isArchived: false,
        },
      },
      orderBy: {
        _count: { tagId: "desc" },
      },
      take: 5,
    })

    const topTags = await Promise.all(
      tagCounts.map(async (tc) => {
        const tag = await prisma.tag.findUnique({
          where: { id: tc.tagId },
        })
        return {
          name: tag?.name || "Unknown",
          count: tc._count.tagId,
          color: tag?.color || "#8b5cf6",
        }
      })
    )

    // Weekly activity (last 7 days)
    const weeklyActivity = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)

      const nextDate = new Date(date)
      nextDate.setDate(nextDate.getDate() + 1)

      const count = await prisma.note.count({
        where: {
          userId,
          createdAt: {
            gte: date,
            lt: nextDate,
          },
        },
      })

      weeklyActivity.push({
        date: date.toLocaleDateString("en-US", { weekday: "short" }),
        count,
      })
    }

    return NextResponse.json({
      totalNotes,
      notesThisWeek,
      aiUsageCount,
      topTags,
      weeklyActivity,
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    )
  }
}
