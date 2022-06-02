import { Button } from '@mui/material';
import { logout } from '../services/supabase-utils';
import './Header.scss';
import logo from '../logo.svg';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="nav">
      <img className="logo" src={logo} />
      <span>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/aboutus">About Us</NavLink>
        <Button onClick={() => logout()}>Logout</Button>
      </span>
    </nav>
  );
}
