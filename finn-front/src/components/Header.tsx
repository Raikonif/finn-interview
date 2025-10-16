import NavBar from '@/components/NavBar';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Finconecta Assessment</h1>
        </div>
        <NavBar />
      </div>
    </header>
  );
};

export default Header;
