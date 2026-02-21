import { useMemo, useState } from "react";
import { endMobs } from "../data/end-mobs";
import MobCard from "../components/MobCard";
import FilterControls from "../components/FilterControls";

const HOSTILITY_ORDER = { hostile: 0, neutral: 1, passive: 2 };

function EndPage({ favoriteIds, onToggleFavorite }) {
  const [query, setQuery] = useState("");
  const [hostility, setHostility] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");

  const filteredMobs = useMemo(() => {
    return endMobs.filter((mob) => {
      const matchesQuery = mob.name.toLowerCase().includes(query.toLowerCase().trim());
      const matchesHostility = hostility === "all" || mob.hostility === hostility;
      return matchesQuery && matchesHostility;
    });
  }, [query, hostility]);

  const sortedMobs = useMemo(() => {
    const list = [...filteredMobs];
    if (sortBy === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "name-desc") list.sort((a, b) => b.name.localeCompare(a.name));
    else if (sortBy === "hostility") list.sort((a, b) => (HOSTILITY_ORDER[a.hostility] ?? 3) - (HOSTILITY_ORDER[b.hostility] ?? 3));
    return list;
  }, [filteredMobs, sortBy]);

  return (
    <main id="main" className="page">
      <section className="panel">
        <h2>End Mobs</h2>
        <p className="muted small">
          The End has fewer mob types than the Overworld, so this page focuses on the main ones.
        </p>

        <FilterControls
          search={query}
          setSearch={setQuery}
          hostility={hostility}
          setHostility={setHostility}
          searchId="end-search"
          selectId="end-type"
          searchPlaceholder="Enderman, Shulker..."
        />

        <div className="control-row" style={{ marginTop: "1rem" }}>
          <label className="control" htmlFor="end-sort">
            <span className="control-label">Sort by</span>
            <select
              id="end-sort"
              className="select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name-asc">Name (A–Z)</option>
              <option value="name-desc">Name (Z–A)</option>
              <option value="hostility">Hostility</option>
            </select>
          </label>
        </div>
      </section>

      <section className="panel">
        <div className="results-bar">
          <h3 className="results-title">Mob List</h3>
        </div>

        {sortedMobs.length === 0 ? (
          <p className="muted small">No End mobs match that filter.</p>
        ) : (
          <div className="grid" role="list">
            {sortedMobs.map((mob) => (
              <MobCard
                key={mob.id}
                mob={mob}
                isFavorite={favoriteIds.includes(mob.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default EndPage;
