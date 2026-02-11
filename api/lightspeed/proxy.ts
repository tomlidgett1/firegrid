import type { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * Generic proxy for Lightspeed API requests.
 * Avoids CORS issues by proxying through our server.
 *
 * Usage:
 *   POST /api/lightspeed/proxy
 *   Body: { url: string, accessToken: string, method?: string }
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { url, accessToken, method = 'GET' } = req.body

  if (!url || !accessToken) {
    return res.status(400).json({ error: 'url and accessToken are required' })
  }

  // Only allow requests to Lightspeed API
  if (
    !url.startsWith('https://api.lightspeedapp.com/') &&
    !url.startsWith('https://cloud.lightspeedapp.com/')
  ) {
    return res.status(400).json({ error: 'Invalid URL - must be a Lightspeed API URL' })
  }

  try {
    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    })

    // Forward rate limit headers
    const rateLimitRemaining = response.headers.get('x-ls-api-bucket-level')
    const retryAfter = response.headers.get('retry-after')

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error || data.message || 'Lightspeed API error',
        httpCode: data.httpCode || response.status,
        httpMessage: data.httpMessage || response.statusText,
        rateLimitRemaining,
        retryAfter,
      })
    }

    return res.status(200).json({
      data,
      rateLimitRemaining,
      retryAfter,
    })
  } catch (error) {
    console.error('Lightspeed proxy error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
