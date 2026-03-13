import { useMemo, useState } from 'react'
import FilterControls from './FilterControls'
import MobCard from './MobCard'

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

  const mobCards = sortedMobs.map((mob) => (
    <MobCard
      key={mob.id}
      mob={mob}
      isFavorite={favoriteIds.includes(mob.id)}
      onToggleFavorite={onToggleFavorite}
    />
  ))

  let resultsContent = <div className="grid" role="list">{mobCards}</div>

  if (sortedMobs.length === 0) {
    resultsContent = <p className="muted small">{emptyMessage}</p>
  }

  return (
    <main id="main" className="page">
      <section className="panel">
        <h2>{title}</h2>
        <p className="muted small">{description}</p>

        <FilterControls
          search={query}
          setSearch={setQuery}
          hostility={hostility}
          setHostility={setHostility}
          searchId={searchId}
          selectId={selectId}
          searchPlaceholder={searchPlaceholder}
        />

        <div className="control-row control-row-spaced">
          <label className="control" htmlFor={sortId}>
            <span className="control-label">Sort by</span>
            <select
              id={sortId}
              className="select"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="name-asc">Name (A–Z)</option>
              <option value="name-desc">Name (Z–A)</option>
              <option value="hostility">Hostility</option>
            </select>
          </label>
        </div>
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