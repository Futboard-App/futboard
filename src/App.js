/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { useEffect, useState } from 'react';
import { useStateContext } from './StateProvider';
import { getProfile, getUser } from './services/supabase-utils';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AuthPage from './components/pages/AuthPage';
import ProfileSetupPage from './components/pages/ProfileSetupPage';
import HomePage from './components/pages/HomePage';
import MatchPage from './components/pages/MatchPage';
import TeamPage from './components/pages/TeamPage';
import AboutUsPage from './components/pages/AboutUsPage';

function App() {
  const { currentUser, setCurrentUser, currentProfile, setCurrentProfile } = useStateContext();
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const user = await getUser();
      setCurrentUser(user);
      setUserLoaded(true);
    }
    loadUser();
  }, []);

  useEffect(() => {
    async function loadProfile() {
      const profile = await getProfile(currentUser.id);
      setCurrentProfile(profile);
    }
    if (userLoaded) {
      loadProfile();
    }
  }, [currentUser]);

  return (
    <Router>
      <div className="App">
        <main>
          <Switch>
            <Route exact path="/aboutus">
              <AboutUsPage />
            </Route>
            <Route exact path="/">
              {currentProfile.username ? (
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
                    <ProfileSetupPage step={1} />
                  )
                ) : (
                  <ProfileSetupPage step={0} />
                )
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route exact path="/home">
              {currentUser ? <HomePage /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/match/:id">
              {currentUser ? <MatchPage /> : <Redirect to="/" />}
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
