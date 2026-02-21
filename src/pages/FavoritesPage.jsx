import { overworldMobs } from "../data/overworldMobs";
import { netherMobs } from "../data/nether-mobs";
import { endMobs } from "../data/end-mobs";
import MobCard from "../components/MobCard";

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

export default FavoritesPage;
