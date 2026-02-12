import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from 'react'
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  type User,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db, googleProvider, isFirebaseConfigured } from '@/lib/firebase'
import { TOKEN_EXPIRED_EVENT } from '@/lib/firestore-rest'
import { trackLogin, trackSessionStart } from '@/lib/metrics'
import type { AppUser } from '@/lib/types'

const TOKEN_KEY = 'firegrid_oauth_token'
const TOKEN_EXPIRY_KEY = 'firegrid_oauth_token_expiry'

// Google OAuth access tokens are valid for 3600 seconds (1 hour).
// We refresh 5 minutes early to avoid requests failing near the boundary.
const TOKEN_LIFETIME_MS = 3600 * 1000
const REFRESH_BUFFER_MS = 5 * 60 * 1000

function storeToken(token: string | null) {
  if (token) {
    sessionStorage.setItem(TOKEN_KEY, token)
  } else {
    sessionStorage.removeItem(TOKEN_KEY)
  }
}

function retrieveToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY)
}

function storeTokenExpiry(expiresAt: number | null) {
  if (expiresAt) {
    sessionStorage.setItem(TOKEN_EXPIRY_KEY, String(expiresAt))
  } else {
    sessionStorage.removeItem(TOKEN_EXPIRY_KEY)
  }
}

function retrieveTokenExpiry(): number | null {
  const val = sessionStorage.getItem(TOKEN_EXPIRY_KEY)
  return val ? Number(val) : null
}

function isTokenValid(): boolean {
  const token = retrieveToken()
  if (!token) return false
  const expiry = retrieveTokenExpiry()
  if (!expiry) return false
  // Consider expired if less than REFRESH_BUFFER_MS remaining
  return Date.now() < expiry - REFRESH_BUFFER_MS
}

function msUntilRefreshNeeded(): number | null {
  const expiry = retrieveTokenExpiry()
  if (!expiry) return null
  const remaining = expiry - REFRESH_BUFFER_MS - Date.now()
  return remaining > 0 ? remaining : null
}

interface AuthContextValue {
  user: AppUser | null
  loading: boolean
  configured: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  /** Silently refresh the Google OAuth token. Returns the new token or null on failure. */
  refreshAccessToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(isFirebaseConfigured)

  // Track whether we've already recorded a session start for this mount
  const sessionTrackedRef = useRef(false)
  // Ref to the proactive refresh timer so we can clear it on unmount
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ---- Schedule a proactive silent refresh before token expires ----
  const scheduleTokenRefresh = useCallback(() => {
    // Clear any existing timer
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current)
      refreshTimerRef.current = null
    }

    const ms = msUntilRefreshNeeded()
    if (ms == null || ms <= 0) return

    refreshTimerRef.current = setTimeout(async () => {
      if (!auth || !googleProvider) return
      try {
        console.log('[Firegrid] Proactively refreshing Google access token...')
        const result = await signInWithPopup(auth, googleProvider)
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const newToken = credential?.accessToken ?? null

        if (newToken) {
          const expiresAt = Date.now() + TOKEN_LIFETIME_MS
          storeToken(newToken)
          storeTokenExpiry(expiresAt)
          setUser((prev) =>
            prev ? { ...prev, accessToken: newToken } : null
          )
          console.log('[Firegrid] Token refreshed successfully')
          // Schedule the next refresh
          scheduleTokenRefresh()
        }
      } catch (err) {
        console.warn('[Firegrid] Proactive token refresh failed (popup may have been blocked):', err)
        // Token will expire naturally — ProtectedRoute will handle re-auth
      }
    }, ms)
  }, [])

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      if (firebaseUser) {
        // Restore the OAuth access token from sessionStorage on refresh
        const token = retrieveToken()

        if (token && isTokenValid()) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            accessToken: token,
          })

          // Schedule proactive refresh before token expires
          scheduleTokenRefresh()

          // Track session start once per app mount (page load / refresh)
          if (!sessionTrackedRef.current) {
            sessionTrackedRef.current = true
            trackSessionStart(firebaseUser.uid)
          }
        } else {
          // Token is expired or missing — clear stale data
          storeToken(null)
          storeTokenExpiry(null)
          // Set user without token so the app can prompt re-sign-in
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            accessToken: null,
          })
        }
      } else {
        setUser(null)
        storeToken(null)
        storeTokenExpiry(null)
      }
      setLoading(false)
    })

    return () => {
      unsubscribe()
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current)
      }
    }
  }, [scheduleTokenRefresh])

  // Listen for 401 events from the API layer — immediately invalidate the token
  useEffect(() => {
    const handleTokenExpired = () => {
      console.warn('[Firegrid] API returned 401 — clearing expired token')
      storeToken(null)
      storeTokenExpiry(null)
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current)
        refreshTimerRef.current = null
      }
      setUser((prev) => (prev ? { ...prev, accessToken: null } : null))
    }

    window.addEventListener(TOKEN_EXPIRED_EVENT, handleTokenExpired)
    return () => window.removeEventListener(TOKEN_EXPIRED_EVENT, handleTokenExpired)
  }, [])

  const signIn = useCallback(async () => {
    if (!auth || !googleProvider) {
      throw new Error('Firebase is not configured')
    }
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken ?? null

      // Persist token + expiry to sessionStorage (tab-scoped, cleared on browser close)
      storeToken(token)
      storeTokenExpiry(token ? Date.now() + TOKEN_LIFETIME_MS : null)

      const appUser: AppUser = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        accessToken: token,
      }

      setUser(appUser)

      // Schedule proactive refresh before token expires
      scheduleTokenRefresh()

      // Log user details to Firestore
      if (db) {
        try {
          const userRef = doc(db, 'users', result.user.uid)
          await setDoc(
            userRef,
            {
              email: result.user.email,
              displayName: result.user.displayName,
              photoURL: result.user.photoURL,
              provider: 'google',
              lastLoginAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            },
            { merge: true }
          )
          console.log('[Firegrid] User document written:', {
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
          })
        } catch (err) {
          // Don't block sign-in if Firestore write fails
          console.warn('[Firegrid] Failed to write user document:', err)
        }
      }

      // Track login metrics (non-blocking)
      trackLogin(result.user.uid, result.user.email)

      // Also count this sign-in as a session start
      if (!sessionTrackedRef.current) {
        sessionTrackedRef.current = true
        trackSessionStart(result.user.uid)
      }
    } catch (error) {
      console.error('Sign-in error:', error)
      throw error
    }
  }, [scheduleTokenRefresh])

  const signOut = useCallback(async () => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current)
      refreshTimerRef.current = null
    }
    if (auth) {
      await firebaseSignOut(auth)
    }
    storeToken(null)
    storeTokenExpiry(null)
    setUser(null)
  }, [])

  /** Silently refresh the Google OAuth access token via signInWithPopup. */
  const refreshAccessToken = useCallback(async (): Promise<string | null> => {
    if (!auth || !googleProvider) return null
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const newToken = credential?.accessToken ?? null

      if (newToken) {
        const expiresAt = Date.now() + TOKEN_LIFETIME_MS
        storeToken(newToken)
        storeTokenExpiry(expiresAt)
        setUser((prev) => (prev ? { ...prev, accessToken: newToken } : null))
        scheduleTokenRefresh()
      }

      return newToken
    } catch (err) {
      console.warn('[Firegrid] Token refresh failed:', err)
      return null
    }
  }, [scheduleTokenRefresh])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        configured: isFirebaseConfigured,
        signIn,
        signOut,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
