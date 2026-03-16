import { Link } from 'react-router-dom'

function MobCard({ mob, isFavorite, onToggleFavorite }) {
  const biomeTags = mob.biomes.map((b) => (
    <span className="tag" key={b}>
      {b}
    </span>
  ))

  const hostilityLabel =
    mob.hostility[0].toUpperCase() + mob.hostility.slice(1)

  return (
    <article className="card" role="listitem">
      <div className="card-top">
        <Link className="card-link" to={`/mob/${mob.id}`}>
          <img
            className="mob-photo"
            src={mob.image}
            alt={`${mob.name} mob`}
          />

          <div className="card-head">
            <h4 className="card-title">{mob.name}</h4>

            <div className="tags">
              <span className={`tag ${mob.hostility}`}>
                {hostilityLabel}
              </span>

              <span className={`tag ${mob.world.toLowerCase()}`}>
                {mob.world}
              </span>

              {biomeTags}
            </div>
          </div>
        </Link>

        <button
          className="fav"
          type="button"
          aria-label={`Favorite ${mob.name}`}
          onClick={() => onToggleFavorite(mob.id)}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>

      <div className="card-body">
        <p className="small">
          <strong>Goal:</strong> {mob.goal}
        </p>
      </div>
    </article>
  )
}

export default MobCard