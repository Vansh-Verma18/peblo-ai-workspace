import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { suggestTags } from "@/lib/openrouter"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { content } = body

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      )
    }

    const tags = await suggestTags(content)

    // Log AI usage
    await prisma.aIUsage.create({
      data: {
        userId: session.user.id,
        action: "suggest_tags",
        tokens: Math.ceil(content.length / 4),
        cost: 0, // Gemini is free!
      },
    })

    return NextResponse.json({ tags })
  } catch (error) {
    console.error("Error suggesting tags:", error)
    return NextResponse.json(
      { error: "Failed to suggest tags" },
      { status: 500 }
    )
  }
}
