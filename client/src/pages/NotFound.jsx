import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
      <h1 style={{ fontSize: '6rem', color: 'var(--primary-color)', margin: 0 }}>404</h1>
      <h2 style={{ marginBottom: '1.5rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-light)', marginBottom: '2rem', maxWidth: '400px' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary">
        Return to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
