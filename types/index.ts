export interface Note {
  id: string
  title: string
  content: string
  excerpt: string | null
  isPinned: boolean
  isArchived: boolean
  categoryId: string | null
  userId: string
  createdAt: Date
  updatedAt: Date
  category?: Category | null
  tags?: NoteTag[]
}

export interface Category {
  id: string
  name: string
  color: string
  icon: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Tag {
  id: string
  name: string
  color: string
  createdAt: Date
  updatedAt: Date
}

export interface NoteTag {
  id: string
  noteId: string
  tagId: string
  tag: Tag
}

export interface SharedLink {
  id: string
  noteId: string
  token: string
  expiresAt: Date | null
  createdAt: Date
}

export interface AIUsage {
  id: string
  userId: string
  action: string
  tokens: number
  cost: number
  createdAt: Date
}

export interface User {
  id: string
  name: string | null
  email: string
  image: string | null
  createdAt: Date
  updatedAt: Date
}

export interface DashboardStats {
  totalNotes: number
  notesThisWeek: number
  aiUsageCount: number
  topTags: { name: string; count: number; color: string }[]
  weeklyActivity: { date: string; count: number }[]
}

export interface AIResponse {
  success: boolean
  data?: any
  error?: string
}
