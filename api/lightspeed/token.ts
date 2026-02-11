import type { VercelRequest, VercelResponse } from '@vercel/node'

const LIGHTSPEED_TOKEN_URL = 'https://cloud.lightspeedapp.com/auth/oauth/token'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const clientId =
    process.env.VITE_LIGHTSPEED_CLIENT_ID || process.env.LIGHTSPEED_CLIENT_ID
  const clientSecret = process.env.LIGHTSPEED_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: 'Lightspeed credentials not configured' })
  }

  const { code, refreshToken, redirectUri } = req.body

  try {
    let payload: Record<string, string>

    if (code) {
      // Exchange authorization code for tokens
      payload = {
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
      }
    } else if (refreshToken) {
      // Refresh an existing token
      payload = {
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }
    } else {
      return res.status(400).json({ error: 'Either code or refreshToken is required' })
    }

    const response = await fetch(LIGHTSPEED_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Lightspeed token error:', data)
      return res.status(response.status).json({
        error: data.error || 'Token exchange failed',
        hint: data.hint || data.message || null,
      })
    }

    return res.status(200).json({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
      tokenType: data.token_type,
    })
  } catch (error) {
    console.error('Token exchange error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
