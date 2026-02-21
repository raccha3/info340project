import WorldCard from "../components/WorldCard";

const worlds = [
  {
    id: "overworld",
    title: "Overworld",
    description: "Plains, Forest, Desert",
    image: "/assets/plains.jpg",
    imageAlt: "Overworld preview",
    to: "/overworld",
  },
  {
    id: "nether",
    title: "Nether",
    description: "Fortress, Wastes, Crimson Forest",
    image: "/assets/nether.jpg",
    imageAlt: "Nether preview",
    to: "/nether",
  },
  {
    id: "end",
    title: "End",
    description: "Main Island, End City",
    image: "/assets/end.jpg",
    imageAlt: "End preview",
    to: "/end",
  },
];

function HomePage() {
  return (
    <main id="main" className="page">
      <section className="panel">
        <h2>Choose a World</h2>
        <p className="muted small">Start with a world, then browse biomes and mobs you can favorite.</p>
      </section>

      <section className="panel">
        <div className="grid" role="list">
          {worlds.map((world) => (
            <WorldCard
              key={world.id}
              title={world.title}
              description={world.description}
              image={world.image}
              imageAlt={world.imageAlt}
              to={world.to}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default HomePage;
