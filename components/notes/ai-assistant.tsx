"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, ListChecks, Wand2, Tag, Loader2, X } from "lucide-react"
import toast from "react-hot-toast"

interface AIAssistantProps {
  content: string
  onApply: (content: string) => void
  onClose: () => void
}

export function AIAssistant({ content, onApply, onClose }: AIAssistantProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | string[] | null>(null)
  const [activeAction, setActiveAction] = useState<string | null>(null)

  const handleAIAction = async (action: string, endpoint: string) => {
    if (!content.trim()) {
      toast.error("Please write some content first")
      return
    }

    setIsLoading(true)
    setActiveAction(action)
    setResult(null)

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "AI request failed")
      }

      const data = await response.json()
      
      if (action === "summarize") {
        setResult(data.summary)
      } else if (action === "actionItems") {
        setResult(data.actionItems)
      } else if (action === "improve") {
        setResult(data.improved)
      } else if (action === "tags") {
        setResult(data.tags)
      }

      toast.success("AI generated successfully!")
    } catch (error) {
      console.error("AI Error:", error)
      toast.error(error instanceof Error ? error.message : "AI request failed. Please try again.")
      // Don't close the dialog on error
    } finally {
      setIsLoading(false)
      setActiveAction(null)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 w-[420px] z-50 animate-in slide-in-from-bottom-5">
      <Card className="shadow-2xl border-indigo-500/30 bg-gray-900/95 backdrop-blur-xl">
        <CardHeader className="pb-3 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="p-2 rounded-lg bg-indigo-500/10">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                AI Assistant
              </span>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-gray-800"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAIAction("summarize", "/api/ai/summarize")}
              disabled={isLoading}
              className="justify-start h-10 border-gray-700 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all"
            >
              {isLoading && activeAction === "summarize" ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2 text-indigo-400" />
              )}
              <span className="text-sm">Summarize</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAIAction("actionItems", "/api/ai/action-items")}
              disabled={isLoading}
              className="justify-start h-10 border-gray-700 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
            >
              {isLoading && activeAction === "actionItems" ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <ListChecks className="w-4 h-4 mr-2 text-purple-400" />
              )}
              <span className="text-sm">Action Items</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAIAction("improve", "/api/ai/improve")}
              disabled={isLoading}
              className="justify-start h-10 border-gray-700 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all"
            >
              {isLoading && activeAction === "improve" ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Wand2 className="w-4 h-4 mr-2 text-pink-400" />
              )}
              <span className="text-sm">Improve</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAIAction("tags", "/api/ai/suggest-tags")}
              disabled={isLoading}
              className="justify-start h-10 border-gray-700 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
            >
              {isLoading && activeAction === "tags" ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Tag className="w-4 h-4 mr-2 text-cyan-400" />
              )}
              <span className="text-sm">Suggest Tags</span>
            </Button>
          </div>

          {result && (
            <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700 max-h-[400px] overflow-y-auto">
              {Array.isArray(result) ? (
                <ul className="space-y-2">
                  {result.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-indigo-400 mt-1">•</span>
                      <span className="text-gray-200 flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">{result}</p>
                  
                  {typeof result === "string" && activeAction === "improve" && (
                    <Button
                      size="sm"
                      className="w-full bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => {
                        onApply(result)
                        toast.success("Applied improved text")
                        setResult(null)
                      }}
                    >
                      <Wand2 className="w-4 h-4 mr-2" />
                      Apply Changes
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
                <p className="text-sm text-gray-400">Generating response...</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
