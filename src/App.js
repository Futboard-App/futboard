/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { useEffect } from 'react';
import { useStateContext } from './StateProvider';
import { getProfile, getUser } from './services/supabase-utils';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AuthPage from './components/pages/AuthPage';
import ProfileSetupPage from './components/pages/ProfileSetupPage';
import HomePage from './components/pages/HomePage';
import MatchPage from './components/pages/MatchPage';
import TeamPage from './components/pages/TeamPage';

function App() {
  const { currentUser, setCurrentUser, currentProfile, setCurrentProfile } = useStateContext();

  // useEffect(() => {
  //   const getUser = localStorage.getItem('user');
  //   const getProfile = localStorage.getItem('profile');
  //   const user = JSON.parse(getUser);
  //   const profile = JSON.parse(getProfile);
  //   setCurrentProfile(user);
  //   setCurrentProfile(profile);
  // }, []);

  useEffect(() => {
    async function loadUser() {
      const user = await getUser();
      setCurrentUser(user);
    }
    // async function loadProfile() {
    //   const user = await getUser();
    //   const profile = await getProfile(user.user.id);
    //   setCurrentProfile(profile);
    // }
    loadUser();
    // if (currentUser) {
    //   loadProfile();
    // }
  }, []);

  useEffect(() => {
    async function loadProfile() {
      const user = await getUser();
      const profile = await getProfile(user.user.id);
      setCurrentProfile(profile);
    }
    if (currentUser) {
      loadProfile();
    }
  }, [currentUser]);

  // useEffect(() => {
  //   const user = JSON.stringify(currentUser);
  //   const profile = JSON.stringify(currentProfile);
  //   localStorage.setItem('user', user);
  //   localStorage.setItem('profile', profile);
  // }, []);

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
