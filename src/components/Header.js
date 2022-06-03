import { Button } from '@mui/material';
import { logout } from '../services/supabase-utils';
import './Header.scss';
import logo from '../logo-small.svg';
import title from '../logo-title.svg';
import { useHistory } from 'react-router-dom';

export default function Header({ profileSetup }) {
  const { push } = useHistory();
  function handleBackToHome() {
    push('/home');
  }
  function handleToAboutUs() {
    push('/aboutus');
  }
  return (
    <nav className="nav">
      <div className="logo-title-container">
        <img className="logo" src={logo} />
        <img className="title" src={title} />
      </div>
      <span>
        {!profileSetup && (
          <>
            <Button sx={{ color: '#ffaa0d' }} onClick={handleBackToHome}>
              Home
            </Button>
            <Button sx={{ color: '#ffaa0d' }} onClick={handleToAboutUs}>
              Meet the Team
            </Button>
          </>
        )}
        <Button sx={{ color: '#ffaa0d' }} onClick={() => logout()}>
          Logout
        </Button>
      </span>
    </nav>
  );
}
