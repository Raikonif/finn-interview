import { useEffect } from 'react';

const Home = () => {
  // Set page metadata for SEO (works both client and SSR)
  useEffect(() => {
    document.title = 'Home - Finconecta Assessment';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Full-stack React application showcasing modern web development practices with Spring Boot backend integration');
    }
  }, []);

  return (
    <div className="page-container">
      <div className="hero-section">
        <h1>Welcome to Finconecta Assessment</h1>
        <p className="hero-description">
          This is a full-stack React application showcasing modern web development
          practices with Spring Boot backend integration.
        </p>
        <div className="features">
          <div className="feature-card">
            <h3>CRUD Operations</h3>
            <p>Full Create, Read, Update, Delete functionality for managing items</p>
          </div>
          <div className="feature-card">
            <h3>JWT Authentication</h3>
            <p>Secure authentication system with JSON Web Tokens</p>
          </div>
          <div className="feature-card">
            <h3>Responsive Design</h3>
            <p>Mobile-first design that works across all device sizes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
