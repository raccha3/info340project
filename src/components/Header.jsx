import { NavLink } from 'react-router-dom';

function Header() {
	return (
		<header className="site-header">
			<div className="site-header-inner">
				<div className="brand">
					<div className="brand-mark">
						<img src="/assets/logo.png" alt="Minecraft BiomeDex logo" />
					</div>
					<div>
						<h1 className="brand-title">Minecraft BiomeDex</h1>
						<p className="brand-subtitle">Pick a world to browse biomes and mobs.</p>
					</div>
				</div>

				<nav className="site-nav" aria-label="Primary">
				<NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>Worlds</NavLink>
				<NavLink to="/overworld" className={({ isActive }) => (isActive ? "active" : "")}>Overworld</NavLink>
				<NavLink to="/nether" className={({ isActive }) => (isActive ? "active" : "")}>Nether</NavLink>
				<NavLink to="/end" className={({ isActive }) => (isActive ? "active" : "")}>End</NavLink>
				<NavLink to="/favorites" className={({ isActive }) => (isActive ? "active" : "")}>Favorites</NavLink>
				</nav>
			</div>
		</header>
	);
}

export default Header;
