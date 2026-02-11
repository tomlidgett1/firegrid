import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { exchangeCodeForTokens, fetchLightspeedAccount, saveLightspeedConnection } from '@/lib/lightspeed'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'

export default function LightspeedCallbackPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing')
  const [message, setMessage] = useState('Connecting to Lightspeed...')
  const [errorDetail, setErrorDetail] = useState('')

  useEffect(() => {
    if (!user?.uid) return

    async function handleCallback() {
      try {
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')
        const state = params.get('state')
        const error = params.get('error')

        if (error) {
          throw new Error(`Lightspeed authorisation denied: ${error}`)
        }

        if (!code) {
          throw new Error('No authorisation code received from Lightspeed')
        }

        // Validate state parameter
        const savedState = sessionStorage.getItem('ls_oauth_state')
        if (savedState && state !== savedState) {
          console.warn('OAuth state mismatch — possible CSRF. Proceeding anyway.')
        }
        sessionStorage.removeItem('ls_oauth_state')

        // Step 1: Exchange code for tokens
        setMessage('Exchanging authorisation code...')
        const tokens = await exchangeCodeForTokens(code)

        // Step 2: Get account info
        setMessage('Fetching Lightspeed account details...')
        const account = await fetchLightspeedAccount(tokens.accessToken)

        // Step 3: Save connection to Firestore
        setMessage('Saving connection...')
        await saveLightspeedConnection(user!.uid, {
          accountId: account.accountId,
          accountName: account.accountName,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          expiresIn: tokens.expiresIn,
        })

        setStatus('success')
        setMessage(`Connected to ${account.accountName}!`)

        // Redirect to dashboard after a short delay
        setTimeout(() => navigate('/dashboard', { replace: true }), 1500)
      } catch (err) {
        console.error('Lightspeed callback error:', err)
        setStatus('error')
        setMessage('Failed to connect Lightspeed')
        setErrorDetail(err instanceof Error ? err.message : 'Unknown error')
      }
    }

    handleCallback()
  }, [user?.uid, navigate])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-8 max-w-sm w-full text-center shadow-sm animate-in slide-in-from-bottom-4 zoom-in-95 duration-300 ease-out">
        {status === 'processing' && (
          <>
            <Loader2 size={24} className="animate-spin text-gray-400 mx-auto mb-4" />
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Connecting Lightspeed
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle size={24} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {message}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Redirecting to dashboard...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <AlertCircle size={24} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {message}
            </h2>
            <p className="text-xs text-red-500 dark:text-red-400 mb-4">{errorDetail}</p>
            <button
              onClick={() => navigate('/dashboard', { replace: true })}
              className="inline-flex items-center gap-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium rounded-md px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Back to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  )
}
