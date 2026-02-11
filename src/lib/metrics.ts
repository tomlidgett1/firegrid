/**
 * User metrics tracking for Firegrid.
 *
 * Stores aggregate counters on the user document (/users/{uid})
 * and detailed activity events in a subcollection (/users/{uid}/activity/{id}).
 */

import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  increment,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

// ---- Types ----

export type ActivityType =
  | 'login'
  | 'session_start'
  | 'project_connected'
  | 'table_saved'
  | 'dashboard_saved'
  | 'query_run'
  | 'query_table_saved'
  | 'collection_explored'
  | 'feedback_sent'
  | 'page_view'

export interface ActivityEvent {
  type: ActivityType
  metadata?: Record<string, unknown>
}

// ---- Session tracking ----

let _sessionId: string | null = null

export function getSessionId(): string {
  if (!_sessionId) {
    _sessionId = crypto.randomUUID()
  }
  return _sessionId
}

// ---- Core tracking functions ----

/**
 * Record a user login. Increments loginCount and sets firstLoginAt (once).
 * Called from AuthContext on successful sign-in.
 */
export async function trackLogin(uid: string, email: string | null) {
  if (!db) return

  try {
    const userRef = doc(db, 'users', uid)

    // Check if firstLoginAt already exists
    const snap = await getDoc(userRef)
    const existingMetrics = snap.data()?.metrics
    const isFirstLogin = !existingMetrics?.firstLoginAt

    const metricsUpdate: Record<string, unknown> = {
      loginCount: increment(1),
      lastLoginAt: serverTimestamp(),
      lastActiveAt: serverTimestamp(),
    }

    // Only set firstLoginAt on the very first login
    if (isFirstLogin) {
      metricsUpdate.firstLoginAt = serverTimestamp()
    }

    await setDoc(
      userRef,
      {
        metrics: metricsUpdate,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )

    // Log the activity event
    await logActivity(uid, {
      type: 'login',
      metadata: { email, isFirstLogin },
    })
  } catch (err) {
    console.warn('[Firegrid Metrics] Failed to track login:', err)
  }
}

/**
 * Record a session start. Called once when the app loads with an authenticated user.
 */
export async function trackSessionStart(uid: string) {
  if (!db) return

  try {
    const sessionId = getSessionId()
    const userRef = doc(db, 'users', uid)
    await setDoc(
      userRef,
      {
        metrics: {
          totalSessions: increment(1),
          lastSessionStartedAt: serverTimestamp(),
          lastActiveAt: serverTimestamp(),
        },
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )

    await logActivity(uid, {
      type: 'session_start',
      metadata: { sessionId },
    })
  } catch (err) {
    console.warn('[Firegrid Metrics] Failed to track session start:', err)
  }
}

/**
 * Update the user's last active timestamp. Lightweight heartbeat.
 */
export async function trackHeartbeat(uid: string) {
  if (!db) return

  try {
    const userRef = doc(db, 'users', uid)
    await setDoc(
      userRef,
      {
        metrics: {
          lastActiveAt: serverTimestamp(),
        },
      },
      { merge: true }
    )
  } catch (err) {
    // Silently fail — heartbeat is best-effort
  }
}

/**
 * Track when a user connects a GCP project.
 */
export async function trackProjectConnected(
  uid: string,
  projectId: string
) {
  if (!db) return

  try {
    const userRef = doc(db, 'users', uid)
    await setDoc(
      userRef,
      {
        metrics: {
          projectsConnected: increment(1),
          lastActiveAt: serverTimestamp(),
        },
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )

    await logActivity(uid, {
      type: 'project_connected',
      metadata: { projectId },
    })
  } catch (err) {
    console.warn('[Firegrid Metrics] Failed to track project connected:', err)
  }
}

/**
 * Track when a user saves a table.
 */
export async function trackTableSaved(
  uid: string,
  tableId: string,
  tableName: string,
  projectId: string,
  isNew: boolean
) {
  if (!db) return

  try {
    const userRef = doc(db, 'users', uid)
    await setDoc(
      userRef,
      {
        metrics: {
          tablesSaved: increment(1),
          lastActiveAt: serverTimestamp(),
        },
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )

    await logActivity(uid, {
      type: 'table_saved',
      metadata: { tableId, tableName, projectId, isNew },
    })
  } catch (err) {
    console.warn('[Firegrid Metrics] Failed to track table saved:', err)
  }
}

/**
 * Track when a user saves a dashboard.
 */
export async function trackDashboardSaved(
  uid: string,
  dashboardId: string,
  dashboardName: string,
  widgetCount: number,
  isNew: boolean
) {
  if (!db) return

  try {
    const userRef = doc(db, 'users', uid)
    await setDoc(
      userRef,
      {
        metrics: {
          dashboardsSaved: increment(1),
          lastActiveAt: serverTimestamp(),
        },
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )

    await logActivity(uid, {
      type: 'dashboard_saved',
      metadata: { dashboardId, dashboardName, widgetCount, isNew },
    })
  } catch (err) {
    console.warn('[Firegrid Metrics] Failed to track dashboard saved:', err)
  }
}

/**
 * Track when a user runs a SQL query.
 */
export async function trackQueryRun(uid: string, sql: string) {
  if (!db) return

  try {
    const userRef = doc(db, 'users', uid)
    await setDoc(
      userRef,
      {
        metrics: {
          queriesRun: increment(1),
          lastActiveAt: serverTimestamp(),
        },
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )

    await logActivity(uid, {
      type: 'query_run',
      metadata: { sqlPreview: sql.slice(0, 200) },
    })
  } catch (err) {
    console.warn('[Firegrid Metrics] Failed to track query run:', err)
  }
}

/**
 * Track when a user saves a query result as a table.
 */
export async function trackQueryTableSaved(
  uid: string,
  tableId: string,
  tableName: string
) {
  if (!db) return

  try {
    const userRef = doc(db, 'users', uid)
    await setDoc(
      userRef,
      {
        metrics: {
          queryTablesSaved: increment(1),
          lastActiveAt: serverTimestamp(),
        },
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )

    await logActivity(uid, {
      type: 'query_table_saved',
      metadata: { tableId, tableName },
    })
  } catch (err) {
    console.warn('[Firegrid Metrics] Failed to track query table saved:', err)
  }
}

/**
 * Track when feedback is submitted.
 */
export async function trackFeedbackSent(uid: string) {
  if (!db) return

  try {
    const userRef = doc(db, 'users', uid)
    await setDoc(
      userRef,
      {
        metrics: {
          feedbackSent: increment(1),
          lastActiveAt: serverTimestamp(),
        },
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )

    await logActivity(uid, { type: 'feedback_sent' })
  } catch (err) {
    console.warn('[Firegrid Metrics] Failed to track feedback sent:', err)
  }
}

/**
 * Track a page view.
 */
export async function trackPageView(
  uid: string,
  page: string,
  metadata?: Record<string, unknown>
) {
  if (!db) return

  try {
    const userRef = doc(db, 'users', uid)
    await setDoc(
      userRef,
      {
        metrics: {
          pageViews: increment(1),
          lastActiveAt: serverTimestamp(),
        },
      },
      { merge: true }
    )

    await logActivity(uid, {
      type: 'page_view',
      metadata: { page, ...metadata },
    })
  } catch (err) {
    // Silently fail for page views
  }
}

// ---- Internal: activity log ----

async function logActivity(uid: string, event: ActivityEvent) {
  if (!db) return

  try {
    const activityRef = collection(db, 'users', uid, 'activity')
    await addDoc(activityRef, {
      type: event.type,
      metadata: event.metadata ?? null,
      sessionId: getSessionId(),
      createdAt: serverTimestamp(),
    })
  } catch (err) {
    // Silently fail — activity log is best-effort
  }
}
