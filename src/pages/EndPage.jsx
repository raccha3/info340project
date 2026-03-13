import { endMobs } from '../data/end-mobs'
import DimensionPage from '../components/DimensionPage'

function EndPage({ favoriteIds, onToggleFavorite }) {
  return (
    <DimensionPage
      title="End Mobs"
      description="The End has fewer mob types than the Overworld, so this page focuses on the main ones."
      mobs={endMobs}
      favoriteIds={favoriteIds}
      onToggleFavorite={onToggleFavorite}
      searchId="end-search"
      selectId="end-type"
      sortId="end-sort"
      searchPlaceholder="Enderman, Shulker..."
      emptyMessage="No End mobs match that filter."
    />
  )
}

export default EndPage