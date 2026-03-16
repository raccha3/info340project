import { useState } from 'react'
import { overworldMobs } from '../data/overworldMobs'
import { netherMobs } from '../data/nether-mobs'
import { endMobs } from '../data/end-mobs'

function ComparePage() {
  const allMobs = [...overworldMobs, ...netherMobs, ...endMobs]

  const [mob1Id, setMob1Id] = useState('')
  const [mob2Id, setMob2Id] = useState('')

  const mob1 =
    mob1Id === '' ? null : allMobs.find((mob) => mob.id === parseInt(mob1Id, 10))

  const mob2 =
    mob2Id === '' ? null : allMobs.find((mob) => mob.id === parseInt(mob2Id, 10))

  const commonBiomes =
    mob1 && mob2
      ? mob1.biomes.filter((biome) => mob2.biomes.includes(biome))
      : []

  const commonDrops =
    mob1 && mob2
      ? mob1.drops.filter((drop1) =>
          mob2.drops.some((drop2) => drop2.item === drop1.item)
        )
      : []

  const mobOptions = allMobs.map((mob) => (
    <option key={mob.id} value={mob.id}>
      {mob.name} ({mob.world})
    </option>
  ))

  const mob1BiomeItems =
    mob1?.biomes.map((biome) => <li key={biome}>{biome}</li>) ?? []

  const mob2BiomeItems =
    mob2?.biomes.map((biome) => <li key={biome}>{biome}</li>) ?? []

  const mob1DropItems =
    mob1?.drops.map((drop) => (
      <li key={`${drop.item}-${drop.rate}`}>
        <strong>{drop.item}</strong> — {drop.rate}
      </li>
    )) ?? []

  const mob2DropItems =
    mob2?.drops.map((drop) => (
      <li key={`${drop.item}-${drop.rate}`}>
        <strong>{drop.item}</strong> — {drop.rate}
      </li>
    )) ?? []

  const commonDropNames = commonDrops.map((drop) => drop.item).join(', ')

  const mob1HostilityLabel =
    mob1 && mob1.hostility[0].toUpperCase() + mob1.hostility.slice(1)

  const mob2HostilityLabel =
    mob2 && mob2.hostility[0].toUpperCase() + mob2.hostility.slice(1)

  return (
    <main className="compare-page">
      <section className="panel compare-panel">
        <h1>Mob Comparison</h1>
        <p className="muted small">
          Select two mobs to compare their stats and drops.
        </p>

        <form
          className="compare-selectors"
          aria-label="Compare two mobs"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="selector">
            <label htmlFor="mob1-select">First Mob:</label>
            <select
              id="mob1-select"
              className="select"
              value={mob1Id}
              onChange={(event) => setMob1Id(event.target.value)}
            >
              <option value="">-- Select a mob --</option>
              {mobOptions}
            </select>
          </div>

          <div className="vs-text" aria-hidden="true">
            vs
          </div>

          <div className="selector">
            <label htmlFor="mob2-select">Second Mob:</label>
            <select
              id="mob2-select"
              className="select"
              value={mob2Id}
              onChange={(event) => setMob2Id(event.target.value)}
            >
              <option value="">-- Select a mob --</option>
              {mobOptions}
            </select>
          </div>
        </form>
      </section>

      {mob1 && mob2 ? (
        <>
          <section className="comparison-grid">
            <article className="card comparison-card">
              <div className="comparison-header">
                <img
                  src={mob1.image}
                  alt={`${mob1.name} mob`}
                  className="comparison-image"
                />
                <h2>{mob1.name}</h2>
                <div className="comparison-tags">
                  <span className={`tag ${mob1.hostility}`}>
                    {mob1HostilityLabel}
                  </span>
                  <span className={`tag ${mob1.world.toLowerCase()}`}>
                    {mob1.world}
                  </span>
                </div>
              </div>

              <div className="comparison-content">
                <section className="comparison-section">
                  <h3>Biomes</h3>
                  <ul>{mob1BiomeItems}</ul>
                </section>

                <section className="comparison-section">
                  <h3>Drops</h3>
                  <ul>{mob1DropItems}</ul>
                </section>

                <section className="comparison-section">
                  <h3>Strategic Goal</h3>
                  <p>{mob1.goal}</p>
                </section>
              </div>
            </article>

            <article className="card comparison-card">
              <div className="comparison-header">
                <img
                  src={mob2.image}
                  alt={`${mob2.name} mob`}
                  className="comparison-image"
                />
                <h2>{mob2.name}</h2>
                <div className="comparison-tags">
                  <span className={`tag ${mob2.hostility}`}>
                    {mob2HostilityLabel}
                  </span>
                  <span className={`tag ${mob2.world.toLowerCase()}`}>
                    {mob2.world}
                  </span>
                </div>
              </div>

              <div className="comparison-content">
                <section className="comparison-section">
                  <h3>Biomes</h3>
                  <ul>{mob2BiomeItems}</ul>
                </section>

                <section className="comparison-section">
                  <h3>Drops</h3>
                  <ul>{mob2DropItems}</ul>
                </section>

                <section className="comparison-section">
                  <h3>Strategic Goal</h3>
                  <p>{mob2.goal}</p>
                </section>
              </div>
            </article>
          </section>

          <section className="panel similarities-panel">
            <h2>Similarities</h2>

            {mob1.hostility === mob2.hostility && (
              <p>
                <strong>✓ Same Hostility:</strong> Both are {mob1.hostility}
              </p>
            )}

            {commonBiomes.length > 0 && (
              <p>
                <strong>✓ Shared Biomes:</strong> {commonBiomes.join(', ')}
              </p>
            )}

            {commonDrops.length > 0 && (
              <p>
                <strong>✓ Common Drops:</strong> {commonDropNames}
              </p>
            )}

            {mob1.hostility !== mob2.hostility &&
              commonBiomes.length === 0 &&
              commonDrops.length === 0 && (
                <p className="muted">These mobs have no obvious similarities.</p>
              )}
          </section>
        </>
      )}

      {!(mob1 && mob2) && (
        <section className="panel compare-placeholder">
          <p className="muted">Select two mobs above to see a detailed comparison.</p>
        </section>
      )}
    </main>
  )
}

export default ComparePage