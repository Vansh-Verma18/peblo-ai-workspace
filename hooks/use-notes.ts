import { useState, useEffect, useCallback, useRef } from "react"
import { Note } from "@/types"
import toast from "react-hot-toast"

interface UseNotesOptions {
  search?: string
  archived?: boolean
  pinned?: boolean
}

interface UseNotesReturn {
  notes: Note[]
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
  updateNote: (noteId: string, updates: Partial<Note>) => Promise<void>
  deleteNote: (noteId: string) => Promise<void>
  createNote: (note: Partial<Note>) => Promise<Note | null>
  optimisticUpdate: (noteId: string, updates: Partial<Note>) => void
  optimisticDelete: (noteId: string) => void
}

export function useNotes(options: UseNotesOptions = {}): UseNotesReturn {
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  // Cache to prevent duplicate requests
  const fetchingRef = useRef(false)
  const cacheRef = useRef<{ data: Note[]; timestamp: number } | null>(null)
  const CACHE_TIME = 30000 // 30 seconds

  const fetchNotes = useCallback(async () => {
    // Check cache first
    if (cacheRef.current && Date.now() - cacheRef.current.timestamp < CACHE_TIME) {
      setNotes(cacheRef.current.data)
      setIsLoading(false)
      return
    }

    // Prevent duplicate requests
    if (fetchingRef.current) return
    fetchingRef.current = true

    try {
      const params = new URLSearchParams()
      if (options.search) params.append("search", options.search)
      if (options.archived !== undefined) params.append("archived", String(options.archived))
      if (options.pinned !== undefined) params.append("pinned", String(options.pinned))

      const response = await fetch(`/api/notes?${params}`)
      if (!response.ok) throw new Error("Failed to fetch notes")

      const data = await response.json()
      setNotes(data)
      setError(null)
      
      // Update cache
      cacheRef.current = { data, timestamp: Date.now() }
    } catch (err) {
      setError(err as Error)
      console.error("Failed to fetch notes:", err)
    } finally {
      setIsLoading(false)
      fetchingRef.current = false
    }
  }, [options.search, options.archived, options.pinned])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  // Optimistic update - update UI immediately
  const optimisticUpdate = useCallback((noteId: string, updates: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, ...updates } : note
      )
    )
  }, [])

  // Optimistic delete - remove from UI immediately
  const optimisticDelete = useCallback((noteId: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId))
  }, [])

  // Update note with optimistic UI
  const updateNote = useCallback(async (noteId: string, updates: Partial<Note>) => {
    // Store original state for rollback
    const originalNotes = notes

    // Optimistic update
    optimisticUpdate(noteId, updates)

    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })

      if (!response.ok) throw new Error("Failed to update note")

      const updatedNote = await response.json()
      
      // Update with server response
      setNotes((prev) =>
        prev.map((note) => (note.id === noteId ? updatedNote : note))
      )

      // Invalidate cache
      cacheRef.current = null
    } catch (err) {
      // Rollback on error
      setNotes(originalNotes)
      toast.error("Failed to update note")
      throw err
    }
  }, [notes, optimisticUpdate])

  // Delete note with optimistic UI
  const deleteNote = useCallback(async (noteId: string) => {
    // Store original state for rollback
    const originalNotes = notes

    // Optimistic delete
    optimisticDelete(noteId)

    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete note")

      // Invalidate cache
      cacheRef.current = null
      toast.success("Note deleted")
    } catch (err) {
      // Rollback on error
      setNotes(originalNotes)
      toast.error("Failed to delete note")
      throw err
    }
  }, [notes, optimisticDelete])

  // Create note with optimistic UI
  const createNote = useCallback(async (note: Partial<Note>): Promise<Note | null> => {
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      })

      if (!response.ok) throw new Error("Failed to create note")

      const newNote = await response.json()
      
      // Add to beginning of list
      setNotes((prev) => [newNote, ...prev])
      
      // Invalidate cache
      cacheRef.current = null
      toast.success("Note created")
      
      return newNote
    } catch (err) {
      toast.error("Failed to create note")
      return null
    }
  }, [])

  const refetch = useCallback(async () => {
    cacheRef.current = null // Invalidate cache
    setIsLoading(true)
    await fetchNotes()
  }, [fetchNotes])

  return {
    notes,
    isLoading,
    error,
    refetch,
    updateNote,
    deleteNote,
    createNote,
    optimisticUpdate,
    optimisticDelete,
  }
}
