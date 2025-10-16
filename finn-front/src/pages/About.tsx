import { useEffect } from 'react';

const About = () => {
  // Set page metadata for SEO (works both client and SSR)
  useEffect(() => {
    document.title = 'About - Finconecta Assessment';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about the technology stack and features of this full-stack React application with Spring Boot backend');
    }
  }, []);

  return (
    <div className="page-container">
      <div className="about-content">
        <h1>About This Application</h1>

        <section className="about-section">
          <h2>Technology Stack</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <h3>Frontend</h3>
              <ul>
                <li>React 19 with TypeScript</li>
                <li>React Router for navigation</li>
                <li>Axios for HTTP requests</li>
                <li>CSS3 with animations</li>
                <li>Vite for build tooling</li>
                <li>Redux for Global State handling</li>
              </ul>
            </div>
            <div className="tech-item">
              <h3>Backend (Integration)</h3>
              <ul>
                <li>Java Spring Boot</li>
                <li>MongoDB & PostgreSQL</li>
                <li>JWT Authentication</li>
                <li>RESTful APIs</li>
              </ul>
            </div>
            <div className="tech-item">
              <h3>Infrastructure</h3>
              <ul>
                <li>AWS (EC2, RDS)</li>
                <li>Kubernetes</li>
                <li>Docker containers</li>
                <li>CloudFormation</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Features</h2>
          <div className="features-list">
            <div className="feature">
              <h4>✨ Responsive Design</h4>
              <p>Mobile-first approach with smooth animations and transitions</p>
            </div>
            <div className="feature">
              <h4>🔐 Secure Authentication</h4>
              <p>JWT-based authentication with secure token management</p>
            </div>
            <div className="feature">
              <h4>🚀 Modern Architecture</h4>
              <p>Clean code structure following React best practices</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Assessment Objectives</h2>
          <p>
            This application demonstrates end-to-end development capabilities including:
          </p>
          <ul className="objectives-list">
            <li>Full-stack application development</li>
            <li>Integration with multiple database systems</li>
            <li>Modern frontend frameworks and libraries</li>
            <li>Cloud infrastructure and deployment</li>
            <li>Security best practices</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
