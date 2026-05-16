"use client"

import { useState, useEffect } from "react"
import { NoteCard } from "@/components/notes/note-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { NoteEditor } from "@/components/notes/note-editor"
import { Search, Archive } from "lucide-react"
import { Note } from "@/types"
import toast from "react-hot-toast"

export default function ArchivedNotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [showEditor, setShowEditor] = useState(false)

  useEffect(() => {
    fetchNotes()
  }, [searchQuery])

  const fetchNotes = async () => {
    try {
      const params = new URLSearchParams()
      params.append("archived", "true")
      if (searchQuery) params.append("search", searchQuery)

      const response = await fetch(`/api/notes?${params}`)
      if (response.ok) {
        const data = await response.json()
        setNotes(data)
      }
    } catch (error) {
      console.error("Failed to fetch archived notes:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note)
    setShowEditor(true)
  }

  const handleUnarchive = async (noteId: string) => {
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isArchived: false }),
      })

      if (response.ok) {
        toast.success("Note unarchived")
        fetchNotes()
      }
    } catch (error) {
      toast.error("Failed to unarchive note")
    }
  }

  const handleDelete = async (noteId: string) => {
    if (!confirm("Are you sure you want to permanently delete this note?")) {
      return
    }

    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Note deleted permanently")
        fetchNotes()
      }
    } catch (error) {
      toast.error("Failed to delete note")
    }
  }

  const handleCloseEditor = () => {
    setShowEditor(false)
    setSelectedNote(null)
    fetchNotes()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Archived Notes</h1>
          <p className="text-gray-400">
            {notes.length} {notes.length === 1 ? "note" : "notes"}
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search archived notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-4">
            <Archive className="w-10 h-10 text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            No archived notes
          </h3>
          <p className="text-gray-500">
            {searchQuery
              ? "Try a different search term"
              : "Archive notes to keep them out of sight"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div key={note.id} className="relative group">
              <NoteCard
                note={note}
                onClick={() => handleNoteClick(note)}
              />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleUnarchive(note.id)
                  }}
                >
                  Unarchive
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(note.id)
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={showEditor} onOpenChange={setShowEditor}>
        <DialogContent className="max-w-4xl h-[80vh] p-0">
          {selectedNote && (
            <NoteEditor
              noteId={selectedNote.id}
              initialTitle={selectedNote.title}
              initialContent={selectedNote.content}
              initialTags={selectedNote.tags?.map((t) => t.tag.name) || []}
              onSave={handleCloseEditor}
              onClose={handleCloseEditor}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
