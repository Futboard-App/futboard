import './App.css';
import { useEffect } from 'react';
import { useStateContext } from './StateProvider';
import { getUser, getProfile, logout } from './services/supabase-utils';
import { BrowserRouter as Router, Switch, Route, Redirect, NavLink, useHistory } from 'react-router-dom';
import AuthPage from './components/pages/AuthPage';
import ProfileSetupPage from './components/pages/ProfileSetupPage';
import HomePage from './components/pages/HomePage';
import SearchPage from './components/pages/SearchPage';
import LeaguePage from './components/pages/LeaguePage';
import TeamPage from './components/pages/TeamPage';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


function App() {
  const { currentUser, setCurrentUser, currentProfile, setCurrentProfile, searchQuery, setSearchQuery } = useStateContext();
  // const { push } = useHistory();

  // function handleSearch(e) {
  //   e.preventDefault();
  //   push(`/search?q=${searchQuery}`);
  // }

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
            <Route exact path="/home">
              {currentUser ? <HomePage /> : <Redirect to="/" />}
            </Route>
            <Route exact path={`/search?q=${searchQuery}`}>
              {currentUser ? <SearchPage /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/league/:id">
              {currentUser ? <LeaguePage /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/team/:id">
              {currentUser ? <TeamPage /> : <Redirect to="/" />}
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
