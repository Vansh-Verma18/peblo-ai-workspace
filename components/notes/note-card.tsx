"use client"

import { Note } from "@/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDate, truncate } from "@/lib/utils"
import { Pin, Archive, Trash2, Share2, MoreVertical } from "lucide-react"
import { motion } from "framer-motion"

interface NoteCardProps {
  note: Note
  onClick: () => void
  onPin?: (noteId: string) => void
  onArchive?: (noteId: string) => void
  onDelete?: (noteId: string) => void
  onShare?: (noteId: string) => void
}

export function NoteCard({
  note,
  onClick,
  onPin,
  onArchive,
  onDelete,
  onShare,
}: NoteCardProps) {
  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation()
    action()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className="cursor-pointer group relative overflow-hidden"
        onClick={onClick}
      >
        {note.isPinned && (
          <div className="absolute top-2 right-2">
            <Pin className="w-4 h-4 text-indigo-400 fill-indigo-400" />
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold text-gray-100 line-clamp-1 flex-1">
              {note.title}
            </h3>
            {(onPin || onArchive || onDelete || onShare) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {onPin && (
                    <DropdownMenuItem onClick={(e) => handleAction(e as any, () => onPin(note.id))}>
                      <Pin className="mr-2 h-4 w-4" />
                      {note.isPinned ? "Unpin" : "Pin"}
                    </DropdownMenuItem>
                  )}
                  {onShare && (
                    <DropdownMenuItem onClick={(e) => handleAction(e as any, () => onShare(note.id))}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                  )}
                  {onArchive && (
                    <DropdownMenuItem onClick={(e) => handleAction(e as any, () => onArchive(note.id))}>
                      <Archive className="mr-2 h-4 w-4" />
                      {note.isArchived ? "Unarchive" : "Archive"}
                    </DropdownMenuItem>
                  )}
                  {onDelete && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={(e) => handleAction(e as any, () => onDelete(note.id))}
                        className="text-red-400 focus:text-red-400"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <p className="text-xs text-gray-500">
            {formatDate(note.updatedAt)}
          </p>
        </CardHeader>

        <CardContent className="space-y-3">
          {note.excerpt && (
            <p className="text-sm text-gray-400 line-clamp-3">
              {note.excerpt}
            </p>
          )}

          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {note.tags.slice(0, 3).map((noteTag) => (
                <Badge
                  key={noteTag.id}
                  variant="secondary"
                  className="text-xs"
                  style={{
                    backgroundColor: `${noteTag.tag.color}20`,
                    borderColor: `${noteTag.tag.color}40`,
                    color: noteTag.tag.color,
                  }}
                >
                  {noteTag.tag.name}
                </Badge>
              ))}
              {note.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{note.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {note.category && (
            <Badge
              variant="outline"
              className="text-xs"
              style={{
                borderColor: note.category.color,
                color: note.category.color,
              }}
            >
              {note.category.name}
            </Badge>
          )}
        </CardContent>

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </Card>
    </motion.div>
  )
}
