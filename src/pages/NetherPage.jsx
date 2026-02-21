import { useMemo, useState } from "react";
import { netherMobs } from "../data/nether-mobs";
import MobCard from "../components/MobCard";
import FilterControls from "../components/FilterControls";

const HOSTILITY_ORDER = { hostile: 0, neutral: 1, passive: 2 };

function NetherPage({ favoriteIds, onToggleFavorite }) {
  const [query, setQuery] = useState("");
  const [hostility, setHostility] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");

  const filteredMobs = useMemo(() => {
    return netherMobs.filter((mob) => {
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
        <h2>Nether Mobs</h2>
        <p className="muted small">Hostile-heavy dimension. Tagged by biome and mob type.</p>

        <FilterControls
          search={query}
          setSearch={setQuery}
          hostility={hostility}
          setHostility={setHostility}
          searchId="nether-search"
          selectId="nether-type"
          searchPlaceholder="Blaze, Ghast..."
        />

        <div className="control-row" style={{ marginTop: "1rem" }}>
          <label className="control" htmlFor="nether-sort">
            <span className="control-label">Sort by</span>
            <select
              id="nether-sort"
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
          <p className="muted small">No Nether mobs match that filter.</p>
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

export default NetherPage;
