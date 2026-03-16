import MobCard from './MobCard'

function MobGrid({ mobs, favoriteIds, onToggleFavorite, emptyMessage }) {
  if (mobs.length === 0) {
    return <p className="muted small">{emptyMessage}</p>
  }

  return (
    <div className="grid" role="list">
        {mobs.map((mob) => (
          <MobCard
            key={mob.id}
            mob={mob}
            isFavorite={favoriteIds.includes(mob.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
    </div>
  )
}

export default MobGrid
