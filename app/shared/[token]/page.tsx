import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Sparkles, Calendar, User } from "lucide-react"
import ReactMarkdown from "react-markdown"

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getSharedNote(token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/shared/${token}`,
      { cache: "no-store" }
    )
    
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    return null
  }
}

export default async function SharedNotePage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const note = await getSharedNote(token)

  if (!note) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/50">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Peblo AI</span>
          </div>
          <p className="text-gray-400">Shared Note</p>
        </div>

        <Card className="shadow-2xl">
          <CardHeader className="space-y-4">
            <h1 className="text-4xl font-bold text-white">{note.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{note.user?.name || note.user?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(note.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {note.tags && note.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {note.tags.map((noteTag: any) => (
                  <Badge
                    key={noteTag.id}
                    variant="secondary"
                    style={{
                      backgroundColor: `${noteTag.tag.color}20`,
                      borderColor: `${noteTag.tag.color}40`,
                      color: noteTag.tag.color,
                    }}
                  >
                    {noteTag.tag.name}
                  </Badge>
                ))}
              </div>
            )}

            {note.category && (
              <Badge
                variant="outline"
                style={{
                  borderColor: note.category.color,
                  color: note.category.color,
                }}
              >
                {note.category.name}
              </Badge>
            )}
          </CardHeader>

          <CardContent>
            <div className="prose prose-invert prose-indigo max-w-none">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm mb-4">
            Want to create your own AI-powered notes?
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Try Peblo AI Free
          </a>
        </div>
      </div>
    </div>
  )
}
