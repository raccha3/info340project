import { overworldMobs } from '../data/overworldMobs'
import DimensionPage from '../components/DimensionPage'

function OverworldPage({ favoriteIds, onToggleFavorite }) {
  return (
    <DimensionPage
      title="Overworld Mobs"
      description="Click the star to favorite a mob."
      mobs={overworldMobs}
      favoriteIds={favoriteIds}
      onToggleFavorite={onToggleFavorite}
      searchId="overworld-search"
      selectId="overworld-type"
      sortId="overworld-sort"
      searchPlaceholder="Zombie, Bee, Wolf..."
      emptyMessage="No Overworld mobs match that filter."
    />
  )
}

export default OverworldPage