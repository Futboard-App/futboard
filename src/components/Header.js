import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { logout } from '../services/supabase-utils';
import './Header.scss';
import logo from '../logo.svg';

export default function Header() {
  return (
    <nav className="nav">
      <img className="logo" src={logo} />
      <span>
        <NavLink to="/home">Home</NavLink>
        <Button onClick={() => logout()}>Logout</Button>
      </span>
    </nav>
  );
}
