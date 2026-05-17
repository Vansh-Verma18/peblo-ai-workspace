import { Skeleton } from "@/components/ui/skeleton"

export function NoteCardSkeleton() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-all">
      <div className="flex items-start justify-between mb-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
      
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      
      <div className="flex items-center justify-between text-xs">
        <Skeleton className="h-3 w-24" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </div>
    </div>
  )
}

export function NoteListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <NoteCardSkeleton key={i} />
      ))}
    </div>
  )
}
