import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'

// Code-split /problems and /architecture: most visitors (landing on the
// portfolio itself) never touch either, and /architecture pulls in
// react-zoom-pan-pinch plus diagram images that shouldn't block the
// initial home page load.
const ProblemsPage = lazy(() => import('./pages/ProblemsPage').then((m) => ({ default: m.ProblemsPage })))
const ArchitecturePage = lazy(() => import('./pages/ArchitecturePage').then((m) => ({ default: m.ArchitecturePage })))

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
        <Route
          path="/architecture"
          element={
            <Suspense fallback={null}>
              <ArchitecturePage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
