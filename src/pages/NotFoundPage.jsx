import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main id="main" className="page">
      <section className="panel">
        <h2>Page Not Found</h2>
        <p className="muted">The page you're looking for doesn't exist.</p>

        <Link to="/" className="btn">
          Go Home
        </Link>
      </section>
    </main>
  );
}

export default NotFoundPage;