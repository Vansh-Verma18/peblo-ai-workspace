import OpenAI from "openai"

// Initialize OpenRouter client (uses OpenAI SDK with custom base URL)
const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: "https://openrouter.ai/api/v1",
})

// Using OpenRouter's auto-select (works reliably)
const MODEL = "openrouter/auto" // Automatically selects best available model

// Base function to generate text using OpenRouter
export async function generateText(prompt: string): Promise<string> {
  try {
    const completion = await openrouter.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant. Provide concise, professional responses. Keep answers brief and to the point. No explanations unless asked."
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 300, // Shorter responses for speed
      temperature: 0.7,
    })

    return completion.choices[0]?.message?.content || ""
  } catch (error) {
    console.error("OpenRouter AI Error:", error)
    throw new Error("Failed to generate AI response")
  }
}

// Summarize text in 2-3 concise sentences
export async function summarizeText(text: string): Promise<string> {
  const prompt = `Summarize in 2-3 sentences:\n\n${text}`
  return generateText(prompt)
}

// Extract action items from text
export async function extractActionItems(text: string): Promise<string[]> {
  const prompt = `List action items as numbered list:\n\n${text}`
  const response = await generateText(prompt)

  // Parse the response into an array
  return response
    .split("\n")
    .filter((line) => line.trim().match(/^\d+\./))
    .map((line) => line.replace(/^\d+\.\s*/, "").trim())
}

// Generate a short, catchy title
export async function suggestTitle(content: string): Promise<string> {
  const prompt = `Create a short title (max 6 words):\n\n${content.substring(0, 300)}`
  return generateText(prompt)
}

// Generate relevant tags
export async function suggestTags(content: string): Promise<string[]> {
  const prompt = `Suggest 3-5 tags (comma-separated):\n\n${content.substring(0, 300)}`
  const response = await generateText(prompt)

  // Parse tags
  return response
    .split(",")
    .map((tag) => tag.trim().replace(/^#/, ""))
    .filter((tag) => tag.length > 0)
    .slice(0, 5)
}

// Improve writing quality
export async function improveWriting(text: string): Promise<string> {
  const prompt = `Fix grammar and improve. Return ONLY the improved text:\n\n${text}`
  return generateText(prompt)
}
