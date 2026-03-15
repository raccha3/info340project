import { useMemo, useState } from 'react'
import MobFiltersSection from './MobFiltersSection'
import MobGrid from './MobGrid'

const HOSTILITY_ORDER = {
  hostile: 0,
  neutral: 1,
  passive: 2,
}

function DimensionPage({
  title,
  description,
  mobs,
  favoriteIds,
  onToggleFavorite,
  searchId,
  selectId,
  sortId,
  searchPlaceholder,
  emptyMessage,
}) {
  const [query, setQuery] = useState('')
  const [hostility, setHostility] = useState('all')
  const [sortBy, setSortBy] = useState('name-asc')

  const filteredMobs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return mobs.filter((mob) => {
      const matchesQuery =
        normalizedQuery === '' ||
        mob.name.toLowerCase().includes(normalizedQuery)

      const matchesHostility =
        hostility === 'all' || mob.hostility === hostility

      return matchesQuery && matchesHostility
    })
  }, [mobs, query, hostility])

  const sortedMobs = useMemo(() => {
    const list = [...filteredMobs]

    if (sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'name-desc') {
      list.sort((a, b) => b.name.localeCompare(a.name))
    } else if (sortBy === 'hostility') {
      list.sort(
        (a, b) =>
          (HOSTILITY_ORDER[a.hostility] ?? 99) -
          (HOSTILITY_ORDER[b.hostility] ?? 99)
      )
    }

    return list
  }, [filteredMobs, sortBy])

  const resultsContent = (
    <MobGrid
      mobs={sortedMobs}
      favoriteIds={favoriteIds}
      onToggleFavorite={onToggleFavorite}
      emptyMessage={emptyMessage}
    />
  )

  return (
    <main id="main" className="page">
      <section className="panel">
        <h2>{title}</h2>
        <p className="muted small">{description}</p>

        <MobFiltersSection
          query={query}
          setQuery={setQuery}
          hostility={hostility}
          setHostility={setHostility}
          sortBy={sortBy}
          setSortBy={setSortBy}
          searchId={searchId}
          selectId={selectId}
          sortId={sortId}
          searchPlaceholder={searchPlaceholder}
        />
      </section>

      <section className="panel">
        <div className="results-bar">
          <h3 className="results-title">Mob List</h3>
        </div>

        {resultsContent}
      </section>
    </main>
  )
}

export default DimensionPage