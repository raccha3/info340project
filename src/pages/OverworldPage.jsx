import { useMemo, useState } from "react";
import { overworldMobs } from "../data/overworldMobs";

function OverworldPage({ favoriteIds, onToggleFavorite }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMobs = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      return overworldMobs;
    }

    return overworldMobs.filter((mob) => mob.name.toLowerCase().includes(normalizedQuery));
  }, [searchQuery]);

  return (
    <main id="main" className="page">
      <section className="panel">
        <h2>Overworld Mobs</h2>
        <p className="muted small">
          Click the star to favorite a mob ⭐
        </p>

        <form className="controls" onSubmit={(event) => event.preventDefault()}>
          <label className="control" htmlFor="overworld-search">
            <span className="control-label">Search mobs</span>
            <input
              id="overworld-search"
              name="q"
              type="search"
              placeholder="Zombie, Bee, Wolf..."
              className="search-input"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </label>
        </form>
      </section>

      <section className="panel">
        <div className="grid" role="list">
          {filteredMobs.map((mob) => {
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
                    className={`fav ${isFav ? "is-favorite" : ""}`}
                    type="button"
                    aria-label={`Favorite ${mob.name}`}
                    onClick={() => onToggleFavorite(mob.id)}
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
