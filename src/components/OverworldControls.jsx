function OverworldControls({ search, setSearch, hostility, setHostility }) {
  return (
    <form className="controls" aria-label="Mob search and filters" onSubmit={(e) => e.preventDefault()}>
      <label className="control" htmlFor="mob-search">
        <span className="control-label">Search mobs</span>
        <input
          id="mob-search"
          name="q"
          type="search"
          placeholder="Zombie, Bee, Wolf..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>

      <div className="control-row">
        <label className="control" htmlFor="mob-type">
          <span className="control-label">Hostility</span>
          <select
            id="mob-type"
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

        <button className="btn" type="submit">Apply</button>
      </div>
    </form>
  );
}

export default OverworldControls;
