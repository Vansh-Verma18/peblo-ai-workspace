"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { noteTemplates, templateCategories, NoteTemplate } from "@/lib/note-templates"
import { FileText, X } from "lucide-react"
import { motion } from "framer-motion"

interface TemplateSelectorProps {
  open: boolean
  onClose: () => void
  onSelectTemplate: (template: NoteTemplate) => void
}

export function TemplateSelector({ open, onClose, onSelectTemplate }: TemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredTemplates =
    selectedCategory === "All"
      ? noteTemplates
      : noteTemplates.filter((t) => t.category === selectedCategory)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">Choose a Template</DialogTitle>
          <p className="text-sm text-gray-400">
            Start with a pre-built template to save time
          </p>
        </DialogHeader>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap pb-4 border-b border-white/10">
          {templateCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-4 hover:bg-white/10 hover:border-indigo-500/50 transition-all cursor-pointer"
                onClick={() => {
                  onSelectTemplate(template)
                  onClose()
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{template.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3">
                      {template.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {template.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover indicator */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-indigo-500 text-white rounded-full p-1">
                    <FileText className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <p className="text-sm text-gray-400">
            {filteredTemplates.length} template{filteredTemplates.length !== 1 ? "s" : ""} available
          </p>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
