import { useState } from "react";
import { overworldMobs } from "../data/overworldMobs";

function OverworldPage() {
  const [favoriteIds, setFavoriteIds] = useState([]);

  function toggleFavorite(mobId) {
    setFavoriteIds((prev) => {
      if (prev.includes(mobId)) {
        return prev.filter((id) => id !== mobId);
      }
      return [...prev, mobId];
    });
  }

  return (
    <main id="main" className="page">
      <section className="panel">
        <h2>Overworld Mobs</h2>
        <p className="muted small">
          Click the star to favorite a mob ⭐
        </p>
      </section>

      <section className="panel">
        <div className="grid" role="list">
          {overworldMobs.map((mob) => {
            const isFav = favoriteIds.includes(mob.id);

            return (
              <article className="card" role="listitem" key={mob.id}>
                <div className="card-top">
                  <a className="card-link" href="#" onClick={(e) => e.preventDefault()}>
                    <img className="mob-photo" src={mob.image} alt={`${mob.name} mob`} />
                    <div className="card-head">
                      <h4 className="card-title">{mob.name}</h4>
                      <div className="tags">
                        <span className={`tag ${mob.hostility}`}>
                          {mob.hostility[0].toUpperCase() + mob.hostility.slice(1)}
                        </span>
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
                    onClick={() => toggleFavorite(mob.id)}
                  >
                    {isFav ? "★" : "☆"}
                  </button>
                </div>

                <div className="card-body">
                  <p className="small"><strong>Goal:</strong> {mob.goal}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default OverworldPage;
