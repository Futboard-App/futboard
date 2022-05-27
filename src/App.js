import './App.css';
import { useEffect } from 'react';
import { useStateContext } from './StateProvider';
import { getUser } from './services/supabase-utils';
import { BrowserRouter as Router, Switch, Route, Redirect, NavLink } from 'react-router-dom';
import AuthPage from './components/pages/AuthPage';
import ProfileSetupPage from './components/pages/ProfileSetupPage';
import HomePage from './components/pages/HomePage';
import SearchPage from './components/pages/SearchPage';
import LeaguePage from './components/pages/LeaguePage';
import TeamPage from './components/pages/TeamPage';

function App() {
  const { currentUser, setCurrentUser } = useStateContext();

  useEffect(() => {
    async function load() {
      const user = getUser();
      setCurrentUser(user);
    }
    load();
  }, []);

  return (
    <Router>
      <div className="App">
        {/* <header>
          <nav>
            <NavLink>Home</NavLink>
            <NavLink>Home</NavLink>
            <NavLink>Home</NavLink>
            <NavLink>Home</NavLink>
          </nav>
        </header> */}
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
              {currentUser ? <ProfileSetupPage /> : <Redirect to="/" />}
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
      ;
    </Router>
  );
}

export default App;
