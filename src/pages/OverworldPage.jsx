import { useMemo, useState } from "react";
import { overworldMobs } from "../data/overworldMobs";
import MobCard from "../components/MobCard";
import FilterControls from "../components/FilterControls";

const HOSTILITY_ORDER = { hostile: 0, neutral: 1, passive: 2 };

function OverworldPage({ favoriteIds, onToggleFavorite }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [hostility, setHostility] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");

  const filteredMobs = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return overworldMobs.filter((mob) => {
      const matchesQuery = !normalizedQuery || mob.name.toLowerCase().includes(normalizedQuery);
      const matchesHostility = hostility === "all" || mob.hostility === hostility;
      return matchesQuery && matchesHostility;
    });
  }, [searchQuery, hostility]);

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
        <h2>Overworld Mobs</h2>
        <p className="muted small">
          Click the star to favorite a mob ⭐
        </p>

        <FilterControls
          search={searchQuery}
          setSearch={setSearchQuery}
          hostility={hostility}
          setHostility={setHostility}
          searchId="overworld-search"
          selectId="overworld-type"
          searchPlaceholder="Zombie, Bee, Wolf..."
        />

        <div className="control-row" style={{ marginTop: "1rem" }}>
          <label className="control" htmlFor="overworld-sort">
            <span className="control-label">Sort by</span>
            <select
              id="overworld-sort"
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

        <div className="grid" role="list">
          {sortedMobs.length === 0 ? (
            <p className="muted small">No Overworld mobs match that filter.</p>
          ) : (
            sortedMobs.map((mob) => (
              <MobCard
                key={mob.id}
                mob={mob}
                isFavorite={favoriteIds.includes(mob.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default OverworldPage;