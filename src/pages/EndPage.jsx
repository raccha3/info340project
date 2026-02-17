import { useMemo, useState } from "react";
import { endMobs } from "../data/end-mobs";

function EndPage({ favoriteIds, onToggleFavorite }) {
  const [query, setQuery] = useState("");
  const [hostility, setHostility] = useState("all");

  const filteredMobs = useMemo(() => {
    return endMobs.filter((mob) => {
      const matchesQuery = mob.name.toLowerCase().includes(query.toLowerCase().trim());
      const matchesHostility = hostility === "all" || mob.hostility === hostility;
      return matchesQuery && matchesHostility;
    });
  }, [query, hostility]);

  return (
    <main id="main" className="page">
      <section className="panel">
        <h2>End Mobs</h2>
        <p className="muted small">
          The End has fewer mob types than the Overworld, so this page focuses on the main ones.
        </p>

        <form className="controls" aria-label="Mob search and filters" onSubmit={(event) => event.preventDefault()}>
          <label className="control" htmlFor="end-search">
            <span className="control-label">Search mobs</span>
            <input
              id="end-search"
              name="q"
              type="search"
              placeholder="Enderman, Shulker..."
              className="search-input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <div className="control-row">
            <label className="control" htmlFor="end-type">
              <span className="control-label">Hostility</span>
              <select
                id="end-type"
                name="type"
                className="select"
                value={hostility}
                onChange={(event) => setHostility(event.target.value)}
              >
                <option value="all">All</option>
                <option value="hostile">Hostile</option>
                <option value="neutral">Neutral</option>
                <option value="passive">Passive</option>
              </select>
            </label>
          </div>
        </form>
      </section>

      <section className="panel">
        <div className="results-bar">
          <h3 className="results-title">Mob List</h3>
        </div>

        {filteredMobs.length === 0 ? (
          <p className="muted small">No End mobs match that filter.</p>
        ) : (
          <div className="grid" role="list">
            {filteredMobs.map((mob) => {
              const isFav = favoriteIds.includes(mob.id);

              return (
                <article className="card" role="listitem" key={mob.id}>
                  <div className="card-top">
                    <a className="card-link" href="#" onClick={(event) => event.preventDefault()}>
                      <img className="mob-photo" src={mob.image} alt={`${mob.name} mob`} />
                      <div className="card-head">
                        <h4 className="card-title">{mob.name}</h4>
                        <div className="tags">
                          <span className={`tag ${mob.hostility}`}>
                            {mob.hostility[0].toUpperCase() + mob.hostility.slice(1)}
                          </span>
                          <span className="tag end">End</span>
                          {mob.biomes.map((biome) => (
                            <span className="tag" key={biome}>{biome}</span>
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
        )}
      </section>
    </main>
  );
}

export default EndPage;
