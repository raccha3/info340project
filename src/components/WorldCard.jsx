import { Link } from "react-router-dom";

function WorldCard({ title, description, image, imageAlt, to }) {
  return (
    <Link to={to} className="card-link" role="listitem">
      <article className="card">
        <div className="card-top">
          <img className="mob-photo" src={image} alt={imageAlt} />
          <div className="card-head">
            <h4 className="card-title">{title}</h4>
          </div>
        </div>
        <div className="card-body">
          <p className="small"><strong>Includes:</strong> {description}</p>
        </div>
      </article>
    </Link>
  );
}

export default WorldCard;
