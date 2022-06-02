import { Button } from '@mui/material';
import { logout } from '../services/supabase-utils';
import './Header.scss';
import logo from '../logo-small.svg';
import title from '../logo-title.svg';

export default function Header(){
  function handleBackToHome() {
    window.location.href = '/home';
  }
  return (
    <nav className="nav">
      <img className='logo' src={logo} />
      <img className='title' src={title} />
      <span>
        <Button sx={{ color: '#ffaa0d' }} onClick={handleBackToHome}>Home</Button>
        <Button sx={{ color: '#ffaa0d' }} onClick={() => logout()}>Logout</Button>
      </span>
    </nav>
  );
}