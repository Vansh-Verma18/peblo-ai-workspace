"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { CommandPalette } from "@/components/dashboard/command-palette"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { NoteEditor } from "@/components/notes/note-editor"
import { Toaster } from "react-hot-toast"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showNewNote, setShowNewNote] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setShowCommandPalette((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950">
      <Sidebar onNewNote={() => setShowNewNote(true)} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      <CommandPalette
        open={showCommandPalette}
        onOpenChange={setShowCommandPalette}
        onNewNote={() => setShowNewNote(true)}
      />

      <Dialog open={showNewNote} onOpenChange={setShowNewNote}>
        <DialogContent className="max-w-4xl max-h-[90vh] h-[90vh] p-0 flex flex-col overflow-hidden">
          <span className="sr-only">Note Editor</span>
          <NoteEditor
            onSave={() => {
              setShowNewNote(false)
              window.location.reload()
            }}
            onClose={() => setShowNewNote(false)}
          />
        </DialogContent>
      </Dialog>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1F2937",
            color: "#F3F4F6",
            border: "1px solid #374151",
          },
        }}
      />
    </div>
  )
}
