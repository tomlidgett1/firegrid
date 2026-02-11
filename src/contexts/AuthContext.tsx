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
import { trackLogin, trackSessionStart } from '@/lib/metrics'
import type { AppUser } from '@/lib/types'

const TOKEN_KEY = 'firegrid_oauth_token'

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

interface AuthContextValue {
  user: AppUser | null
  loading: boolean
  configured: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(isFirebaseConfigured)

  // Track whether we've already recorded a session start for this mount
  const sessionTrackedRef = useRef(false)

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      if (firebaseUser) {
        // Restore the OAuth access token from sessionStorage on refresh
        const token = retrieveToken()

        if (token) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            accessToken: token,
          })

          // Track session start once per app mount (page load / refresh)
          if (!sessionTrackedRef.current) {
            sessionTrackedRef.current = true
            trackSessionStart(firebaseUser.uid)
          }
        } else {
          // We have a Firebase session but no OAuth token — need to re-auth
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
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signIn = useCallback(async () => {
    if (!auth || !googleProvider) {
      throw new Error('Firebase is not configured')
    }
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken ?? null

      // Persist to sessionStorage (tab-scoped, cleared on browser close)
      storeToken(token)

      const appUser: AppUser = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        accessToken: token,
      }

      setUser(appUser)

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
  }, [])

  const signOut = useCallback(async () => {
    if (auth) {
      await firebaseSignOut(auth)
    }
    storeToken(null)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, loading, configured: isFirebaseConfigured, signIn, signOut }}
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
