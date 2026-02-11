import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { FirestoreValue, DocumentData, FieldInfo } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ---- Firestore Value Parsing ----

export function parseFirestoreValue(value: FirestoreValue): unknown {
  if (value.stringValue !== undefined) return value.stringValue
  if (value.integerValue !== undefined) return Number(value.integerValue)
  if (value.doubleValue !== undefined) return value.doubleValue
  if (value.booleanValue !== undefined) return value.booleanValue
  if (value.timestampValue !== undefined) return value.timestampValue
  if (value.nullValue !== undefined) return null
  if (value.referenceValue !== undefined) return value.referenceValue
  if (value.geoPointValue !== undefined)
    return `${value.geoPointValue.latitude}, ${value.geoPointValue.longitude}`
  if (value.mapValue?.fields) {
    const result: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value.mapValue.fields)) {
      result[k] = parseFirestoreValue(v)
    }
    return result
  }
  if (value.arrayValue) {
    return (value.arrayValue.values ?? []).map(parseFirestoreValue)
  }
  return null
}

export function getFirestoreValueType(value: FirestoreValue): string {
  if (value.stringValue !== undefined) return 'string'
  if (value.integerValue !== undefined) return 'integer'
  if (value.doubleValue !== undefined) return 'double'
  if (value.booleanValue !== undefined) return 'boolean'
  if (value.timestampValue !== undefined) return 'timestamp'
  if (value.nullValue !== undefined) return 'null'
  if (value.referenceValue !== undefined) return 'reference'
  if (value.geoPointValue !== undefined) return 'geoPoint'
  if (value.mapValue) return 'map'
  if (value.arrayValue) return 'array'
  return 'unknown'
}

// ---- Flatten Nested Objects ----

export function flattenObject(
  obj: Record<string, unknown>,
  prefix = ''
): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key

    if (
      value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      !(value instanceof Date)
    ) {
      Object.assign(
        result,
        flattenObject(value as Record<string, unknown>, newKey)
      )
    } else if (Array.isArray(value)) {
      result[newKey] = value
        .map((v) =>
          typeof v === 'object' && v !== null ? JSON.stringify(v) : String(v)
        )
        .join(', ')
    } else {
      result[newKey] = value
    }
  }

  return result
}

// ---- Schema Discovery ----

export function discoverSchema(documents: DocumentData[]): FieldInfo[] {
  const fieldMap = new Map<
    string,
    { dataType: string; count: number; samples: unknown[] }
  >()

  for (const doc of documents) {
    const flat = flattenObject(doc)
    for (const [path, value] of Object.entries(flat)) {
      if (path === '__id') continue
      const existing = fieldMap.get(path)
      if (existing) {
        existing.count++
        if (existing.samples.length < 3 && value !== null && value !== undefined) {
          existing.samples.push(value)
        }
      } else {
        fieldMap.set(path, {
          dataType: inferType(value),
          count: 1,
          samples: value !== null && value !== undefined ? [value] : [],
        })
      }
    }
  }

  return Array.from(fieldMap.entries())
    .map(([path, info]) => ({
      path,
      dataType: info.dataType,
      coverage: documents.length > 0 ? info.count / documents.length : 0,
      sampleValues: info.samples,
    }))
    .sort((a, b) => b.coverage - a.coverage)
}

function inferType(value: unknown): string {
  if (value === null || value === undefined) return 'null'
  if (typeof value === 'string') {
    // Check if it looks like a timestamp
    if (/^\d{4}-\d{2}-\d{2}T/.test(value)) return 'timestamp'
    return 'string'
  }
  if (typeof value === 'number') return Number.isInteger(value) ? 'integer' : 'double'
  if (typeof value === 'boolean') return 'boolean'
  if (Array.isArray(value)) return 'array'
  if (typeof value === 'object') return 'map'
  return 'unknown'
}

// ---- Export Helpers ----

export function exportToCSV(data: Record<string, unknown>[], filename: string) {
  if (data.length === 0) return

  const headers = Object.keys(data[0])
  const csvRows = [
    headers.map(escapeCSV).join(','),
    ...data.map((row) =>
      headers
        .map((h) => {
          const val = row[h]
          return escapeCSV(val === null || val === undefined ? '' : String(val))
        })
        .join(',')
    ),
  ]

  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' })
  downloadBlob(blob, `${filename}.csv`)
}

export function exportToJSON(data: Record<string, unknown>[], filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json;charset=utf-8;',
  })
  downloadBlob(blob, `${filename}.json`)
}

export function copyToClipboard(data: Record<string, unknown>[]) {
  const text = JSON.stringify(data, null, 2)
  return navigator.clipboard.writeText(text)
}

function escapeCSV(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// ---- Convert JS values back to Firestore wire format ----

export function toFirestoreValue(value: unknown): FirestoreValue {
  if (value === null || value === undefined) {
    return { nullValue: null }
  }
  if (typeof value === 'boolean') {
    return { booleanValue: value }
  }
  if (typeof value === 'number') {
    if (Number.isInteger(value)) {
      return { integerValue: String(value) }
    }
    return { doubleValue: value }
  }
  if (typeof value === 'string') {
    // Detect ISO timestamps
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
      return { timestampValue: value }
    }
    // Detect Firestore references
    if (
      value.startsWith('projects/') &&
      value.includes('/databases/') &&
      value.includes('/documents/')
    ) {
      return { referenceValue: value }
    }
    return { stringValue: value }
  }
  if (Array.isArray(value)) {
    return {
      arrayValue: {
        values: value.map(toFirestoreValue),
      },
    }
  }
  if (typeof value === 'object') {
    const fields: Record<string, FirestoreValue> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      fields[k] = toFirestoreValue(v)
    }
    return { mapValue: { fields } }
  }
  return { nullValue: null }
}

/**
 * Convert a plain JS object to Firestore fields map.
 * Skips internal fields prefixed with __ (like __id, __path).
 */
export function toFirestoreFields(
  obj: Record<string, unknown>
): Record<string, FirestoreValue> {
  const fields: Record<string, FirestoreValue> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('__')) continue
    fields[key] = toFirestoreValue(value)
  }
  return fields
}
