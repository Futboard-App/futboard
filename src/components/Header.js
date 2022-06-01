import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { logout } from '../services/supabase-utils';
import './Header.scss';

export default function Header(){

  return (
    <nav className="nav">
      logo
      <span>
        <NavLink to="/">Home</NavLink>
        <Button onClick={() => logout()}>Logout</Button>
      </span>
    </nav>
  );
}