function MobCard({ mob, isFavorite, onToggleFavorite }) {
  return (
    <article className="card" role="listitem">
      <div className="card-top">
        <a className="card-link" href="#" onClick={(e) => e.preventDefault()}>
          <img className="mob-photo" src={mob.image} alt={`${mob.name} mob`} />
          <div className="card-head">
            <h4 className="card-title">{mob.name}</h4>

            <div className="tags">
              <span className={`tag ${mob.hostility}`}>{mob.hostility[0].toUpperCase() + mob.hostility.slice(1)}</span>
              <span className="tag overworld">Overworld</span>
              {mob.biomes.map((b) => (
                <span className="tag" key={b}>{b}</span>
              ))}
            </div>
          </div>
        </a>

        <button
          className="fav"
          type="button"
          aria-label={`Favorite ${mob.name}`}
          onClick={() => onToggleFavorite(mob.id)}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      <div className="card-body">
        <p className="small">
          <strong>Goal:</strong> {mob.goal}
        </p>
      </div>
    </article>
  );
}

export default MobCard;
