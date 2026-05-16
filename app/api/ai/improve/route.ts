import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { improveWriting } from "@/lib/openrouter"
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

    const improved = await improveWriting(content)

    // Log AI usage
    await prisma.aIUsage.create({
      data: {
        userId: session.user.id,
        action: "improve_writing",
        tokens: Math.ceil(content.length / 4),
        cost: 0, // Gemini is free!
      },
    })

    return NextResponse.json({ improved })
  } catch (error) {
    console.error("Error improving writing:", error)
    return NextResponse.json(
      { error: "Failed to improve writing" },
      { status: 500 }
    )
  }
}
