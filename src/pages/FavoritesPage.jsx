import { overworldMobs } from "../data/overworldMobs";
import { netherMobs } from "../data/nether-mobs";
import { endMobs } from "../data/end-mobs";

function FavoritesPage({ favoriteIds, onToggleFavorite }) {
	const allMobs = [...overworldMobs, ...netherMobs, ...endMobs];
	const favoriteMobs = allMobs.filter((mob) => favoriteIds.includes(mob.id));

	return (
		<main id="main" className="page">
			<section className="panel">
				<h2>Favorites</h2>
				<p className="muted small">
					{favoriteMobs.length} mob{favoriteMobs.length !== 1 ? "s" : ""} favorited
				</p>
			</section>

			<section className="panel">
				{favoriteMobs.length === 0 ? (
					<p className="muted">No favorites yet. Star mobs from Overworld, Nether, or End.</p>
				) : (
					<div className="grid" role="list">
						{favoriteMobs.map((mob) => (
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
												<span className={`tag ${mob.world.toLowerCase()}`}>{mob.world}</span>
												{mob.biomes.map((biome) => (
													<span className="tag" key={biome}>{biome}</span>
												))}
											</div>
										</div>
									</a>

									<button
										className="fav is-favorite"
										type="button"
										aria-label={`Favorite ${mob.name}`}
										onClick={() => onToggleFavorite(mob.id)}
									>
										★
									</button>
								</div>

								<div className="card-body">
									<p className="small"><strong>Goal:</strong> {mob.goal}</p>
								</div>
							</article>
						))}
					</div>
				)}
			</section>
		</main>
	);
}

export default FavoritesPage;
