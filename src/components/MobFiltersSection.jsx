import FilterControls from './FilterControls'

function MobFiltersSection({
  query,
  setQuery,
  hostility,
  setHostility,
  sortBy,
  setSortBy,
  searchId,
  selectId,
  sortId,
  searchPlaceholder,
}) {
  return (
    <>
      <FilterControls
        search={query}
        setSearch={setQuery}
        hostility={hostility}
        setHostility={setHostility}
        searchId={searchId}
        selectId={selectId}
        searchPlaceholder={searchPlaceholder}
      />

      <div className="control-row control-row-spaced">
        <label className="control" htmlFor={sortId}>
          <span className="control-label">Sort by</span>
          <select
            id={sortId}
            className="select"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="name-asc">Name (A–Z)</option>
            <option value="name-desc">Name (Z–A)</option>
            <option value="hostility">Hostility</option>
          </select>
        </label>
      </div>
    </>
  )
}

export default MobFiltersSection
