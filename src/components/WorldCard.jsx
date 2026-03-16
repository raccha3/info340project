import { Link } from "react-router-dom";

function WorldCard({ title, description, image, imageAlt, to }) {
  return (
    <article className="card" role="listitem">
      <Link to={to} className="card-link">
        <div className="card-top">
          <img className="mob-photo" src={image} alt={imageAlt} />
          <div className="card-head">
            <h4 className="card-title">{title}</h4>
          </div>
        </div>

        <div className="card-body">
          <p className="small">
            <strong>Includes:</strong> {description}
          </p>
        </div>
      </Link>
    </article>
  );
}

export default WorldCard;