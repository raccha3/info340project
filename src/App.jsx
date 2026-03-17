import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { onValue, ref, set } from 'firebase/database'
import './css/style.css'
import { database } from './firebase'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import OverworldPage from './pages/OverworldPage'
import NetherPage from './pages/NetherPage'
import EndPage from './pages/EndPage'
import FavoritesPage from './pages/FavoritesPage'
import MobDetailsPage from './pages/MobDetailsPage'
import ComparePage from './pages/ComparePage'
import NotFoundPage from './pages/NotFoundPage'

const FAVORITES_PATH = 'favorites/shared'

function App() {
  const [favoriteIds, setFavoriteIds] = useState([])
  const [dbLoading, setDbLoading] = useState(true)
  const [dbError, setDbError] = useState('')

  useEffect(() => {
    const favoritesRef = ref(database, FAVORITES_PATH)

    const unsubscribe = onValue(
      favoritesRef,
      (snapshot) => {
        const value = snapshot.val()

        const rawIds = value?.ids
        const ids = Array.isArray(rawIds)
          ? rawIds
          : rawIds && typeof rawIds === 'object'
          ? Object.values(rawIds)
          : []

        const normalizedIds = ids
          .map((id) => Number(id))
          .filter((id) => Number.isFinite(id))

        setFavoriteIds(normalizedIds)
        setDbError('')
        setDbLoading(false)
      },
      () => {
        setDbError('Could not load favorites from Firebase.')
        setDbLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  function toggleFavorite(mobId) {
    const next = favoriteIds.includes(mobId)
      ? favoriteIds.filter((id) => id !== mobId)
      : [...favoriteIds, mobId]

    setFavoriteIds(next)

    set(ref(database, FAVORITES_PATH), {
  ids: next,
  updatedAt: Date.now(),
  }).catch(() => {
    setDbError('Could not save favorites. Please try again.')
  })
}

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Header />

      {(dbLoading || dbError) && (
        <section className="page">
          <div className="panel">
            {dbLoading && <p className="muted small">Loading favorites...</p>}
            {dbError && (
              <p className="alert-message" role="alert" aria-live="assertive">
                {dbError}
              </p>
            )}
          </div>
        </section>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/overworld"
          element={
            <OverworldPage
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/nether"
          element={
            <NetherPage
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/end"
          element={
            <EndPage
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/mob/:mobId"
          element={
            <MobDetailsPage
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
            />
          }
        />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App