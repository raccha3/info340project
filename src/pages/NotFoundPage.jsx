function NotFoundPage() {
  return (
    <main id="main" className="page">
      <section className="panel">
        <h2>Page Not Found</h2>
        <p className="muted">The page you're looking for doesn't exist.</p>
        <a href="/" className="btn">Go Home</a>
      </section>
    </main>
  );
}

export default NotFoundPage;