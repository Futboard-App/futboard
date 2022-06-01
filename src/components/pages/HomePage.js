import { useStateContext } from '../../StateProvider';
import { useState, useEffect } from 'react';
import { MenuItem, Select } from '@mui/material';
import { getLeagueById } from '../../services/supabase-utils';
import { useHistory } from 'react-router-dom';
import LeagueFixtures from '../widgets/LeagueFixtues.js';

import Header from '../Header';
import './HomePage.scss';

export default function HomePage() {
  const { currentUser, currentProfile, searchQuery, setSearchQuery } = useStateContext();
  const [leagues, setLeagues] = useState([]);
  const [leagueId, setLeagueId] = useState('');
  const { push } = useHistory();

  async function getAllLeagueNames(leagueId) {
    const response = await getLeagueById(leagueId);
    leagues.push(response);
    setLeagues([...leagues]);
  }
  useEffect(() => {
    currentProfile.followed_leagues.map((league) => {
      getAllLeagueNames(league);
    });
  }, [leagueId]);

  function handleLeagueChange(e) {
    setLeagueId(e.target.value);
  }

  console.log(leagueId);
  return (
    <div>
      <Header />
      <div className="fixturesContainer">
        hi
        <Select onChange={(e) => handleLeagueChange(e)}>
          {leagues.map((league) => {
            return (
              <MenuItem key={league.league_id} value={league.league_id}>
                {league.league_name}
              </MenuItem>
            );
          })}
        </Select>
        {/* <div
          id="wg-api-football-fixtures"
          data-host="v3.football.api-sports.io"
          data-refresh="60"
          data-league={leagueId}
          data-season="2021"
          data-key={process.env.REACT_APP_API_FOOTBALL_KEY}
          data-show-errors="true"
          className="api_football_loader fixtures"
        /> */}
        <LeagueFixtures leagueId={leagueId} />
      </div>
    </div>
  );
}
