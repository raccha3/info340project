import { useParams, useNavigate, Link } from 'react-router-dom'
import { overworldMobs } from '../data/overworldMobs'
import { netherMobs } from '../data/nether-mobs'
import { endMobs } from '../data/end-mobs'

function MobDetailsPage({ favoriteIds, onToggleFavorite }) {
  const { mobId } = useParams()
  const navigate = useNavigate()

  // Combine all mobs to search across all dimensions
  const allMobs = [...overworldMobs, ...netherMobs, ...endMobs]
  const mob = allMobs.find((m) => m.id === parseInt(mobId))
  const isFavorite = favoriteIds.includes(mob?.id)

  if (!mob) {
    return (
      <main className="not-found">
        <h1>Mob Not Found</h1>
        <p>Sorry, we couldn't find a mob with ID {mobId}.</p>
        <button 
          className="btn-back"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </main>
    )
  }

  // Find related mobs from the same world
  const relatedMobs = allMobs.filter(
    (m) => m.world === mob.world && m.id !== mob.id
  )

  return (
    <main className="mob-details">
      <button 
        className="btn-back"
        onClick={() => navigate(-1)}
        aria-label="Go back to previous page"
      >
        ← Back
      </button>

      <article className="details-container">
        <header className="details-header">
          <div className="details-image-section">
            <img 
              src={mob.image} 
              alt={`${mob.name} mob portrait`}
              className="details-image"
            />
            <button
              className="fav-large"
              type="button"
              aria-label={`${isFavorite ? 'Remove' : 'Add'} ${mob.name} from favorites`}
              onClick={() => onToggleFavorite(mob.id)}
            >
              {isFavorite ? '★' : '☆'}
            </button>
          </div>

          <div className="details-info">
            <h1 className="details-title">{mob.name}</h1>
            
            <section className="details-tags">
              <span className={`tag ${mob.hostility}`}>
                {mob.hostility[0].toUpperCase() + mob.hostility.slice(1)}
              </span>
              <span className={`tag ${mob.world.toLowerCase()}`}>
                {mob.world}
              </span>
            </section>

            <section className="details-section">
              <h2>Strategic Goal</h2>
              <p>{mob.goal}</p>
            </section>
          </div>
        </header>

        <section className="details-body">
          <article>
            <h2>Biomes Found In</h2>
            <ul className="biome-list">
              {mob.biomes.map((biome) => (
                <li key={biome}>{biome}</li>
              ))}
            </ul>
          </article>

          <article>
            <h2>Mob Type</h2>
            <p>
              <strong>Hostility Level:</strong> {mob.hostility[0].toUpperCase() + mob.hostility.slice(1)}
            </p>
            <p>
              {mob.hostility === 'hostile' && 
                'This mob will attack you on sight. Prepare weapons and armor!'}
              {mob.hostility === 'neutral' && 
                'This mob is peaceful unless provoked. Attack it and it will fight back.'}
              {mob.hostility === 'passive' && 
                'This mob is harmless and will not attack you.'}
            </p>
          </article>

          {mob.drops && mob.drops.length > 0 && (
            <article>
              <h2>Drops</h2>
              <ul className="drops-list">
                {mob.drops.map((drop, idx) => (
                  <li key={idx}>
                    <strong>{drop.item}</strong> — {drop.rate}
                  </li>
                ))}
              </ul>
            </article>
          )}
        </section>

        {relatedMobs.length > 0 && (
          <section className="related-mobs">
            <h2>Other {mob.world} Mobs</h2>
            <div className="related-grid">
              {relatedMobs.slice(0, 4).map((relatedMob) => (
                <Link 
                  key={relatedMob.id}
                  to={`/mob/${relatedMob.id}`}
                  className="related-card"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <img 
                    src={relatedMob.image} 
                    alt={`${relatedMob.name} mob`}
                  />
                  <p>{relatedMob.name}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  )
}

export default MobDetailsPage
