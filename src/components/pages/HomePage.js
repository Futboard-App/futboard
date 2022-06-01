import { useStateContext } from '../../StateProvider';
import { useState, useEffect } from 'react';
import { MenuItem, Select } from '@mui/material';
import { getLeagueById } from '../../services/supabase-utils';

import Header from '../Header';
import './HomePage.scss';

export default function HomePage() {
  const { currentUser, currentProfile, searchQuery, setSearchQuery } = useStateContext();
  const [leagues, setLeagues] = useState([]);
  const [leagueNames, setLeagueNames] = useState([]);
  
  console.log(leagueNames);

  async function getAllLeagueNames(leagueId) {
    const response = await getLeagueById(leagueId);
    return response;

  }
  useEffect(() => {
    setLeagues(currentProfile.followed_leagues);
    setLeagueNames(currentProfile.followed_leagues.map(league => {
      getAllLeagueNames(league);
    }));
  }, []);

  return (
    <div>
      <Header/>
      <div className="fixturesContainer">
    hi
        <Select>
          {leagueNames.map(leagueName => {
            return (
              <option key={leagueName} value={leagueName}>
                {leagueName}
              </option>
            );
          })}
        </Select>
        <div id="wg-api-football-fixtures2"
          data-host="v3.football.api-sports.io"
          data-refresh="60"
          data-league='140'
          data-season="2021"
          data-key={process.env.REACT_APP_API_FOOTBALL_KEY}
          data-show-errors="true"
          className="api_football_loader fixtures">
        </div>
      </div>
    </div>
  );
}
