import OpenAI from "openai"

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY environment variable")
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateAISummary(content: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that creates concise summaries of notes. Keep summaries under 100 words.",
      },
      {
        role: "user",
        content: `Summarize this note:\n\n${content}`,
      },
    ],
    max_tokens: 150,
    temperature: 0.7,
  })

  return response.choices[0]?.message?.content || "Unable to generate summary"
}

export async function generateActionItems(content: string): Promise<string[]> {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that extracts action items from notes. Return a JSON array of action items as strings. If no action items are found, return an empty array.",
      },
      {
        role: "user",
        content: `Extract action items from this note:\n\n${content}`,
      },
    ],
    max_tokens: 200,
    temperature: 0.5,
  })

  const result = response.choices[0]?.message?.content || "[]"
  try {
    return JSON.parse(result)
  } catch {
    return []
  }
}

export async function generateTitle(content: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that generates concise, descriptive titles for notes. Keep titles under 60 characters.",
      },
      {
        role: "user",
        content: `Generate a title for this note:\n\n${content}`,
      },
    ],
    max_tokens: 50,
    temperature: 0.7,
  })

  return response.choices[0]?.message?.content || "Untitled"
}

export async function suggestTags(content: string): Promise<string[]> {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that suggests relevant tags for notes. Return a JSON array of 3-5 single-word tags.",
      },
      {
        role: "user",
        content: `Suggest tags for this note:\n\n${content}`,
      },
    ],
    max_tokens: 100,
    temperature: 0.5,
  })

  const result = response.choices[0]?.message?.content || "[]"
  try {
    return JSON.parse(result)
  } catch {
    return []
  }
}

export async function improveWriting(content: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful writing assistant that improves clarity, grammar, and style while maintaining the original meaning and tone.",
      },
      {
        role: "user",
        content: `Improve this text:\n\n${content}`,
      },
    ],
    max_tokens: 500,
    temperature: 0.7,
  })

  return response.choices[0]?.message?.content || content
}
