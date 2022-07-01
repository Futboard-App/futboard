/* Nice work integrating the plain JS widget into the rest of your react app. I would have liked to see more effort put into addressing code duplication--specifically, the widget component should have been refactored into its own file, since you pass it the same props over and over again through the app, with small differences that should have been encapsulatedd as props. You had a great final product for the user, but maintainability issues would come up here if the project got much bigger. Nice work!
 */
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
import AboutUsPage from './components/pages/AboutUsPage';

function App() {
  // very cool that you dug into context for this! 
  // It's a great idea to dump user data in context, since it's used throught any app
  const { currentUser, setCurrentUser, currentProfile, setCurrentProfile } = useStateContext();

  useEffect(() => {
    async function loadUser() {
      const user = await getUser();
      setCurrentUser(user);
    }
    loadUser();
  }, []);

  useEffect(() => {
    async function loadProfile() {
      const profile = await getProfile(currentUser.id);
      setCurrentProfile(profile);
    }
    if (currentUser) {
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
