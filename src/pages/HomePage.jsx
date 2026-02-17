import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main id="main" className="page">
      <section className="panel">
        <h2>Choose a World</h2>
        <p className="muted small">Start with a world, then browse biomes and mobs you can favorite.</p>
      </section>

      <section className="panel">
        <div className="grid" role="list">
          <Link to="/overworld" className="card-link" role="listitem">
            <article className="card">
              <div className="card-top">
                <img className="mob-photo" src="/assets/plains.jpg" alt="Overworld preview" />
                <div className="card-head">
                  <h4 className="card-title">Overworld</h4>
                </div>
              </div>
              <div className="card-body">
                <p className="small"><strong>Includes:</strong> Plains, Forest, Desert</p>
              </div>
            </article>
          </Link>

          <Link to="/nether" className="card-link" role="listitem">
            <article className="card">
              <div className="card-top">
                <img className="mob-photo" src="/assets/nether.jpg" alt="Nether preview" />
                <div className="card-head">
                  <h4 className="card-title">Nether</h4>
                </div>
              </div>
              <div className="card-body">
                <p className="small"><strong>Includes:</strong> Fortress, Wastes, Crimson Forest</p>
              </div>
            </article>
          </Link>

          <Link to="/end" className="card-link" role="listitem">
            <article className="card">
              <div className="card-top">
                <img className="mob-photo" src="/assets/end.jpg" alt="End preview" />
                <div className="card-head">
                  <h4 className="card-title">End</h4>
                </div>
              </div>
              <div className="card-body">
                <p className="small"><strong>Includes:</strong> Main Island, End City</p>
              </div>
            </article>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
