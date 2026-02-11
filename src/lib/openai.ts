import type { ColumnConfig } from './types'

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

function getOpenAIKey(): string {
  return import.meta.env.VITE_OPENAI_API_KEY ?? ''
}

export function hasOpenAIKey(): boolean {
  return !!getOpenAIKey()
}

export interface CollectionSchema {
  collectionPath: string
  documentCount: number
  fields: {
    path: string
    dataType: string
    coverage: number
    sampleValues: unknown[]
  }[]
}

export interface TableRecommendation {
  collectionPath: string
  tableName: string
  description: string
  columns: ColumnConfig[]
  priority: 'high' | 'medium' | 'low'
  selected: boolean
}

export async function analyseCollectionsWithAI(
  collections: CollectionSchema[]
): Promise<TableRecommendation[]> {
  const apiKey = getOpenAIKey()
  if (!apiKey) throw new Error('OpenAI API key not configured')

  // Build a concise representation of all collections
  const collectionSummaries = collections.map((c) => ({
    path: c.collectionPath,
    docCount: c.documentCount,
    fields: c.fields.map((f) => ({
      name: f.path,
      type: f.dataType,
      coverage: Math.round(f.coverage * 100) + '%',
      samples: f.sampleValues.slice(0, 2).map((v) =>
        typeof v === 'object' ? JSON.stringify(v) : String(v)
      ),
    })),
  }))

  const systemPrompt = `You are an expert data analyst helping a user build useful table views from their Firestore database collections. You will receive a list of collections with their schemas (field names, types, coverage percentages, and sample values).

For each collection that would make a useful table, recommend:
1. A clean, human-friendly table name
2. A brief description of what this data represents
3. Which columns to show (visible: true) and which to hide (visible: false)
4. Sensible column aliases (human-readable names)
5. Column ordering (most important fields first)
6. A priority rating: "high" for core business data, "medium" for supporting data, "low" for metadata/config

Guidelines:
- Always include the document ID column (__id) as the first visible column with alias "ID"
- Hide internal/system fields by default (e.g., fields starting with __ except __id)
- Give high priority to collections with user-facing business data
- Give medium priority to configuration or supporting collections
- Give low priority to very sparse collections or metadata
- Use clean, title-case aliases for columns (e.g., "created_at" → "Created At", "firstName" → "First Name")
- Order columns: ID first, then primary identifiers, then important data, then metadata/timestamps last
- Skip collections that have no fields or appear to be empty/test data

Return valid JSON array. Each item must match this exact structure:
{
  "collectionPath": "string",
  "tableName": "string", 
  "description": "string",
  "priority": "high" | "medium" | "low",
  "columns": [
    {
      "id": "string (field path)",
      "sourcePath": "string (field path)",
      "alias": "string (human name)",
      "dataType": "string",
      "visible": boolean,
      "order": number
    }
  ]
}

Return ONLY the JSON array, no markdown, no explanation.`

  const userPrompt = `Here are the Firestore collections and their schemas:\n\n${JSON.stringify(collectionSummaries, null, 2)}`

  const res = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3,
      max_tokens: 4096,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || `OpenAI API error: ${res.status}`)
  }

  const data = await res.json()
  const content = data.choices?.[0]?.message?.content ?? '[]'

  // Parse the response - strip markdown fences if present
  let jsonStr = content.trim()
  if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
  }

  const recommendations: TableRecommendation[] = JSON.parse(jsonStr).map(
    (rec: TableRecommendation) => ({
      ...rec,
      selected: rec.priority === 'high' || rec.priority === 'medium',
    })
  )

  return recommendations
}
