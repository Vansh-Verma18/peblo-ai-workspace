"use client"

import { useState, useCallback } from "react"
import { NoteCard } from "@/components/notes/note-card"
import { NoteListSkeleton } from "@/components/notes/note-card-skeleton"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { NoteEditor } from "@/components/notes/note-editor"
import { Search, Filter, Plus, FileText } from "lucide-react"
import { TemplateSelector } from "@/components/notes/template-selector"
import { NoteTemplate } from "@/lib/note-templates"
import { Note } from "@/types"
import { motion, AnimatePresence } from "framer-motion"
import toast from "react-hot-toast"
import { useNotes } from "@/hooks/use-notes"
import { useDebouncedValue } from "@/hooks/use-debounced-value"

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [showEditor, setShowEditor] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [templateData, setTemplateData] = useState<{ title: string; content: string; tags: string[] } | null>(null)

  // Debounce search to reduce API calls
  const debouncedSearch = useDebouncedValue(searchQuery, 300)

  // Use optimized notes hook with caching and optimistic updates
  const {
    notes,
    isLoading,
    updateNote,
    deleteNote,
    createNote,
    optimisticUpdate,
    optimisticDelete,
  } = useNotes({ search: debouncedSearch })

  const handleNoteClick = useCallback((note: Note) => {
    setSelectedNote(note)
    setShowEditor(true)
    setIsCreating(false)
  }, [])

  const handleCreateNote = useCallback(() => {
    setSelectedNote(null)
    setTemplateData(null)
    setShowEditor(true)
    setIsCreating(true)
  }, [])

  const handleSelectTemplate = useCallback((template: NoteTemplate) => {
    setSelectedNote(null)
    setTemplateData({
      title: template.title,
      content: template.content,
      tags: template.tags,
    })
    setShowEditor(true)
    setIsCreating(true)
  }, [])

  const handlePin = useCallback(async (noteId: string) => {
    const note = notes.find((n) => n.id === noteId)
    if (!note) return

    // Optimistic update
    optimisticUpdate(noteId, { isPinned: !note.isPinned })

    try {
      await updateNote(noteId, { isPinned: !note.isPinned })
      toast.success(note.isPinned ? "Note unpinned" : "Note pinned")
    } catch (error) {
      // Error handling is done in the hook with rollback
    }
  }, [notes, updateNote, optimisticUpdate])

  const handleArchive = useCallback(async (noteId: string) => {
    // Optimistic update
    optimisticUpdate(noteId, { isArchived: true })

    try {
      await updateNote(noteId, { isArchived: true })
      toast.success("Note archived")
    } catch (error) {
      // Error handling is done in the hook with rollback
    }
  }, [updateNote, optimisticUpdate])

  const handleDelete = useCallback(async (noteId: string) => {
    if (!confirm("Are you sure you want to delete this note?")) {
      return
    }

    // Optimistic delete
    optimisticDelete(noteId)

    try {
      await deleteNote(noteId)
    } catch (error) {
      // Error handling is done in the hook with rollback
    }
  }, [deleteNote, optimisticDelete])

  const handleShare = useCallback(async (noteId: string) => {
    try {
      const response = await fetch(`/api/notes/${noteId}/share`, {
        method: "POST",
      })

      if (response.ok) {
        const data = await response.json()
        const shareUrl = `${window.location.origin}/shared/${data.token}`
        await navigator.clipboard.writeText(shareUrl)
        toast.success("Share link copied to clipboard!")
      }
    } catch (error) {
      toast.error("Failed to create share link")
    }
  }, [])

  const handleCloseEditor = useCallback(() => {
    setShowEditor(false)
    setSelectedNote(null)
    setIsCreating(false)
    // No need to refetch - updates are handled optimistically
  }, [])

  const handleSaveNewNote = useCallback(async () => {
    // Note creation is handled in the editor
    handleCloseEditor()
  }, [handleCloseEditor])

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Notes</h1>
            <p className="text-gray-400">Loading notes...</p>
          </div>
          <Button disabled size="lg">
            <Plus className="w-4 h-4 mr-2" />
            New Note
          </Button>
        </div>
        <NoteListSkeleton />
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Notes</h1>
          <p className="text-gray-400">
            {notes.length} {notes.length === 1 ? "note" : "notes"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCreateNote} size="lg">
            <Plus className="w-4 h-4 mr-2" />
            New Note
          </Button>
          <Button onClick={() => setShowTemplates(true)} size="lg" variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            From Template
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-4">
            <Search className="w-10 h-10 text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            No notes found
          </h3>
          <p className="text-gray-500 mb-4">
            {searchQuery
              ? "Try a different search term"
              : "Create your first note to get started"}
          </p>
          {!searchQuery && (
            <Button onClick={handleCreateNote}>
              <Plus className="w-4 h-4 mr-2" />
              Create Note
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onClick={() => handleNoteClick(note)}
                onPin={handlePin}
                onArchive={handleArchive}
                onDelete={handleDelete}
                onShare={handleShare}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      <Dialog open={showEditor} onOpenChange={(open) => {
        if (!open) {
          handleCloseEditor()
        }
      }}>
        <DialogContent 
          className="max-w-4xl h-[80vh] p-0" 
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <NoteEditor
            noteId={isCreating ? undefined : selectedNote?.id}
            initialTitle={isCreating ? (templateData?.title || "") : selectedNote?.title}
            initialContent={isCreating ? (templateData?.content || "") : selectedNote?.content}
            initialTags={isCreating ? (templateData?.tags || []) : selectedNote?.tags?.map((t) => t.tag.name) || []}
            onSave={handleSaveNewNote}
            onClose={handleCloseEditor}
          />
        </DialogContent>
      </Dialog>

      <TemplateSelector
        open={showTemplates}
        onClose={() => setShowTemplates(false)}
        onSelectTemplate={handleSelectTemplate}
      />
    </div>
  )
}
