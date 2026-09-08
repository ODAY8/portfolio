import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'

// Code-split /problems: it's the only thing that needs @supabase/supabase-js,
// which most visitors (landing on the portfolio itself) never touch.
const ProblemsPage = lazy(() => import('./pages/ProblemsPage').then((m) => ({ default: m.ProblemsPage })))

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/problems"
          element={
            <Suspense fallback={null}>
              <ProblemsPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
