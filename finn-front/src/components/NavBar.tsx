import {Link, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import type {RootState} from "@/store/store.ts";
import {Button} from './ui/button';
import useSignOut from "@/hooks/useSignOut.tsx";

const NavBar = () => {
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const {handleSubmit, logOutRef} = useSignOut();
  const navItems = [
    {path: '/', label: 'Home'},
    {path: '/about', label: 'About'},
    {path: '/new-item', label: 'Create User'},
  ];
  const authenticatedItems = [
    {path: '/items', label: 'Users'},
    
  ];

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.path} className="nav-item">
            <Link
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
        {isAuthenticated && authenticatedItems.map((item) => (
          <li key={item.path} className="nav-item">
            <Link
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
        {
          isAuthenticated ?
            <li className="nav-item">
              <Button onClick={() =>
                handleSubmit()
              } className="nav-link bg-orange-500 login-btn" ref={logOutRef}>
                Log Out
              </Button>
            </li> : <li className="nav-item">
              <Link to="/login" className="nav-link login-btn">
                Login
              </Link>
            </li>
        }
      </ul>
    </nav>
  );
};

export default NavBar;
