import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { randomBytes } from "crypto"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify note ownership
    const note = await prisma.note.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    // Check if share link already exists
    const existingLink = await prisma.sharedLink.findFirst({
      where: { noteId: id },
    })

    if (existingLink) {
      return NextResponse.json(existingLink)
    }

    // Create new share link
    const token = randomBytes(16).toString("hex")

    const sharedLink = await prisma.sharedLink.create({
      data: {
        noteId: id,
        token,
      },
    })

    return NextResponse.json(sharedLink, { status: 201 })
  } catch (error) {
    console.error("Error creating share link:", error)
    return NextResponse.json(
      { error: "Failed to create share link" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify note ownership
    const note = await prisma.note.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    await prisma.sharedLink.deleteMany({
      where: { noteId: id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting share link:", error)
    return NextResponse.json(
      { error: "Failed to delete share link" },
      { status: 500 }
    )
  }
}
