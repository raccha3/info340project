import { Link } from "react-router-dom";

<Link to="/overworld" className="card-link">
  <article className="card">
    <div className="card-top">
      <img
        className="card-img"
        src="/assets/plains.jpg"
        alt="Overworld preview"
      />
      <div className="card-head">
        <h4 className="card-title">Overworld</h4>
      </div>
    </div>

    <div className="card-body">
      <p className="small">
        <strong>Includes:</strong> Plains, Forest, Desert
      </p>
    </div>
  </article>
</Link>
