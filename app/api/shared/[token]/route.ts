import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params
    const sharedLink = await prisma.sharedLink.findUnique({
      where: { token },
      include: {
        note: {
          include: {
            category: true,
            tags: {
              include: {
                tag: true,
              },
            },
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })

    if (!sharedLink) {
      return NextResponse.json(
        { error: "Shared link not found" },
        { status: 404 }
      )
    }

    // Check if link has expired
    if (sharedLink.expiresAt && sharedLink.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "Shared link has expired" },
        { status: 410 }
      )
    }

    return NextResponse.json(sharedLink.note)
  } catch (error) {
    console.error("Error fetching shared note:", error)
    return NextResponse.json(
      { error: "Failed to fetch shared note" },
      { status: 500 }
    )
  }
}
