import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import LoginPage from '@/pages/LoginPage'
import LandingPage from '@/pages/LandingPage'
import DashboardPage from '@/pages/DashboardPage'
import ProjectPage from '@/pages/ProjectPage'
import TableBuilderPage from '@/pages/TableBuilderPage'
import QueryPage from '@/pages/QueryPage'
import QueryTablePage from '@/pages/QueryTablePage'
import CsvTablePage from '@/pages/CsvTablePage'
import DashboardCreatorPage from '@/pages/DashboardCreatorPage'
import CollectionExplorerPage from '@/pages/CollectionExplorerPage'
import LightspeedCallbackPage from '@/pages/LightspeedCallbackPage'
import SalesPage from '@/pages/SalesPage'
import { Loader2, RefreshCw } from 'lucide-react'
import { useState, type ReactNode } from 'react'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading, signIn } = useAuth()
  const [reauthing, setReauthing] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Loader2 size={20} className="animate-spin text-gray-400" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  // User is logged in but OAuth token is missing (e.g. sessionStorage cleared)
  if (!user.accessToken) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 max-w-sm text-center shadow-sm">
          <RefreshCw size={20} className="text-gray-400 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
            Session expired
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Your Google access token has expired. Please sign in again to reconnect.
          </p>
          <button
            onClick={async () => {
              setReauthing(true)
              try {
                await signIn()
              } catch {
                // signIn error handled internally
              } finally {
                setReauthing(false)
              }
            }}
            disabled={reauthing}
            className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium rounded-md px-4 py-2 hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {reauthing ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <RefreshCw size={14} />
            )}
            {reauthing ? 'Reconnecting…' : 'Reconnect with Google'}
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/project/:projectId"
        element={
          <ProtectedRoute>
            <ProjectPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/project/:projectId/collection/:collectionPath"
        element={
          <ProtectedRoute>
            <TableBuilderPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/project/:projectId/explore"
        element={
          <ProtectedRoute>
            <CollectionExplorerPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/project/:projectId/explore/:collectionPath"
        element={
          <ProtectedRoute>
            <CollectionExplorerPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/query"
        element={
          <ProtectedRoute>
            <QueryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/query-table/:tableId"
        element={
          <ProtectedRoute>
            <QueryTablePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/csv-table/:tableId"
        element={
          <ProtectedRoute>
            <CsvTablePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard-builder"
        element={
          <ProtectedRoute>
            <DashboardCreatorPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard-builder/:dashboardId"
        element={
          <ProtectedRoute>
            <DashboardCreatorPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lightspeed/callback"
        element={
          <ProtectedRoute>
            <LightspeedCallbackPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sales"
        element={
          <ProtectedRoute>
            <SalesPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
