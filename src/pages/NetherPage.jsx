import { netherMobs } from '../data/nether-mobs'
import DimensionPage from '../components/DimensionPage'

function NetherPage({ favoriteIds, onToggleFavorite }) {
  return (
    <DimensionPage
      title="Nether Mobs"
      description="Hostile-heavy dimension. Tagged by biome and mob type."
      mobs={netherMobs}
      favoriteIds={favoriteIds}
      onToggleFavorite={onToggleFavorite}
      searchId="nether-search"
      selectId="nether-type"
      sortId="nether-sort"
      searchPlaceholder="Blaze, Ghast..."
      emptyMessage="No Nether mobs match that filter."
    />
  )
}

export default NetherPage