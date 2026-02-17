import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './css/style.css'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import OverworldPage from './pages/OverworldPage'
import NetherPage from './pages/NetherPage'
import EndPage from './pages/EndPage'
import FavoritesPage from './pages/FavoritesPage'

function App() {
  const [favoriteIds, setFavoriteIds] = useState([])

  function toggleFavorite(mobId) {
    setFavoriteIds((prev) => {
      if (prev.includes(mobId)) {
        return prev.filter((id) => id !== mobId)
      }
      return [...prev, mobId]
    })
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/overworld"
          element={<OverworldPage favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
        />
        <Route
          path="/nether"
          element={<NetherPage favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
        />
        <Route
          path="/end"
          element={<EndPage favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
        />
        <Route
          path="/favorites"
          element={<FavoritesPage favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
