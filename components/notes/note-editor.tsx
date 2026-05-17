"use client"

import { useState, useEffect } from "react"
import { RichTextEditor } from "./rich-text-editor"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAutosave } from "@/hooks/use-autosave"
import { 
  Save, 
  X
} from "lucide-react"
import toast from "react-hot-toast"
import { AIAssistant } from "./ai-assistant"
import { AIAssistButton } from "./ai-assist-button"

interface NoteEditorProps {
  noteId?: string
  initialTitle?: string
  initialContent?: string
  initialTags?: string[]
  onSave?: () => void
  onClose?: () => void
}

export function NoteEditor({
  noteId,
  initialTitle = "",
  initialContent = "",
  initialTags = [],
  onSave,
  onClose,
}: NoteEditorProps) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [tags, setTags] = useState<string[]>(initialTags)
  const [tagInput, setTagInput] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [hasChanges, setHasChanges] = useState(false)

  // Track if this is the first render to avoid auto-save on mount
  const [isFirstRender, setIsFirstRender] = useState(true)

  useEffect(() => {
    setIsFirstRender(false)
  }, [])

  const saveNote = async () => {
    // Don't save on first render or if no changes
    if (isFirstRender || (!title.trim() && !content.trim())) return

    setIsSaving(true)
    try {
      const url = noteId ? `/api/notes/${noteId}` : "/api/notes"
      const method = noteId ? "PATCH" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title || "Untitled",
          content,
          tags,
        }),
      })

      if (!response.ok) throw new Error("Failed to save note")

      setLastSaved(new Date())
      setHasChanges(false)
      toast.success("Note saved", { duration: 2000 })
      // Don't call onSave here - it causes the dialog to close
    } catch (error) {
      toast.error("Failed to save note")
    } finally {
      setIsSaving(false)
    }
  }

  const handleManualSave = async () => {
    await saveNote()
    if (onSave) {
      onSave()
    }
  }

  const handleClose = () => {
    if (hasChanges) {
      const confirmClose = window.confirm("You have unsaved changes. Do you want to save before closing?")
      if (confirmClose) {
        saveNote().then(() => {
          onClose?.()
        })
      } else {
        onClose?.()
      }
    } else {
      onClose?.()
    }
  }

  useAutosave(saveNote, 2000, [title, content, tags])

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
      setHasChanges(true)
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-950/50">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleManualSave}
            disabled={isSaving}
            title="Save note"
            className="text-gray-400 hover:text-white"
          >
            <Save className="w-4 h-4" />
          </Button>
          
          {/* Premium AI Assist Button */}
          <AIAssistButton 
            onClick={() => setShowAI(!showAI)}
            isActive={showAI}
          />
          
          {lastSaved && (
            <span className="text-xs text-gray-500">
              Saved {lastSaved.toLocaleTimeString()}
            </span>
          )}
        </div>
        {onClose && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleClose} 
            title="Close"
            className="text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-hidden p-6 flex flex-col gap-4">
        <Input
          placeholder="Note title..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            setHasChanges(true)
          }}
          className="text-2xl font-bold border-none bg-transparent focus:ring-0 px-0 shrink-0"
        />

        <div className="flex flex-wrap gap-2 shrink-0">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              {tag}
              <button
                onClick={() => {
                  removeTag(tag)
                  setHasChanges(true)
                }}
                className="ml-1 hover:text-red-400"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          <Input
            placeholder="Add tag..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-32 h-6 text-xs"
          />
        </div>

        <div className="flex-1 overflow-hidden">
          <RichTextEditor
            content={content}
            onChange={(newContent) => {
              setContent(newContent)
              setHasChanges(true)
            }}
            placeholder="Start writing your note..."
          />
        </div>
      </div>

      {showAI && (
        <AIAssistant
          content={content}
          onApply={(newContent) => setContent(newContent)}
          onClose={() => setShowAI(false)}
        />
      )}
    </div>
  )
}
