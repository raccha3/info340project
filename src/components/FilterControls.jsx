function FilterControls({
  search,
  setSearch,
  hostility,
  setHostility,
  searchId,
  selectId,
  searchPlaceholder,
}) {
  return (
    <form className="controls" aria-label="Mob search and filters" onSubmit={(e) => e.preventDefault()}>
      <label className="control" htmlFor={searchId}>
        <span className="control-label">Search mobs</span>
        <input
          id={searchId}
          name="q"
          type="search"
          placeholder={searchPlaceholder}
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>

      <div className="control-row">
        <label className="control" htmlFor={selectId}>
          <span className="control-label">Hostility</span>
          <select
            id={selectId}
            name="type"
            className="select"
            value={hostility}
            onChange={(e) => setHostility(e.target.value)}
          >
            <option value="all">All</option>
            <option value="hostile">Hostile</option>
            <option value="neutral">Neutral</option>
            <option value="passive">Passive</option>
          </select>
        </label>
      </div>
    </form>
  );
}

export default FilterControls;
