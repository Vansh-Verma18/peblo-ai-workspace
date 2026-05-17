import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { generateExcerpt } from "@/lib/utils"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const categoryId = searchParams.get("categoryId")
    const tagId = searchParams.get("tagId")
    const archived = searchParams.get("archived") === "true"

    const notes = await prisma.note.findMany({
      where: {
        userId: session.user.id,
        isArchived: archived,
        ...(search && {
          OR: [
            { title: { contains: search } },
            { content: { contains: search } },
          ],
        }),
        ...(categoryId && { categoryId }),
        ...(tagId && {
          tags: {
            some: {
              tagId,
            },
          },
        }),
      },
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: [
        { isPinned: "desc" },
        { updatedAt: "desc" },
      ],
    })

    return NextResponse.json(notes)
  } catch (error) {
    console.error("Error fetching notes:", error)
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, content, categoryId, tags } = body

    const excerpt = generateExcerpt(content)

    const note = await prisma.note.create({
      data: {
        title: title || "Untitled",
        content: content || "",
        excerpt,
        userId: session.user.id,
        categoryId: categoryId || null,
      },
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    // Add tags if provided
    if (tags && tags.length > 0) {
      for (const tagName of tags) {
        let tag = await prisma.tag.findUnique({
          where: { name: tagName },
        })

        if (!tag) {
          tag = await prisma.tag.create({
            data: { name: tagName },
          })
        }

        await prisma.noteTag.create({
          data: {
            noteId: note.id,
            tagId: tag.id,
          },
        })
      }
    }

    return NextResponse.json(note, { status: 201 })
  } catch (error) {
    console.error("Error creating note:", error)
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    )
  }
}
