import './App.css';
import { useEffect } from 'react';
import { useStateContext } from './StateProvider';
import { getUser, getProfile, logout } from './services/supabase-utils';
import { BrowserRouter as Router, Switch, Route, Redirect, NavLink } from 'react-router-dom';
import AuthPage from './components/pages/AuthPage';
import ProfileSetupPage from './components/pages/ProfileSetupPage';
import HomePage from './components/pages/HomePage';
import SearchPage from './components/pages/SearchPage';
import LeaguePage from './components/pages/LeaguePage';
import TeamPage from './components/pages/TeamPage';
import Button from '@mui/material/Button';


function App() {
  const { currentUser, setCurrentUser, currentProfile, setCurrentProfile } = useStateContext();

  useEffect(() => {
    async function load() {
      const user = await getUser();
      setCurrentUser(user);
      // if (user) {
      //   // const profile = await getProfile();
      //   // setCurrentProfile(profile);
      // }
    }
    load();
  }, []);

  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            {/* <img/> logo will go here onClick will bring user back to home */}
            {/*vvvvv this is here as we dont want to assume the user will know to just click the logo  vvvvv*/}
            <NavLink to='/home'>Dashboard</NavLink> 
            <NavLink to='/search'>Search</NavLink>
          </nav>
          {currentUser && <Button onClick={logout}>logout</Button>}
        </header>
        
        <main>
          <Switch>
            <Route exact path="/">
              {currentUser ? (
                <Redirect to="/profile-setup" />
              ) : (
                <AuthPage setCurrentUser={setCurrentUser} />
              )}
            </Route>
            <Route exact path="/profile-setup">
              {currentUser ? (
                currentProfile.step_1_complete ? (
                  currentProfile.step_2_complete ? (
                    <Redirect to="/home" />
                  ) : (
                    <ProfileSetupPage step={2} />
                  )
                ) : (
                  <ProfileSetupPage step={1} />
                )
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route exact path="home">
              {currentUser ? <HomePage /> : <Redirect to="/" />}
            </Route>
            <Route exact path="search">
              {currentUser ? <SearchPage /> : <Redirect to="/" />}
            </Route>
            <Route exact path="league/:id">
              {currentUser ? <LeaguePage /> : <Redirect to="/" />}
            </Route>
            <Route exact path="team/:id">
              {currentUser ? <TeamPage /> : <Redirect to="/" />}
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
