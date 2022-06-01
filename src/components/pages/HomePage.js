/* eslint-disable react-hooks/exhaustive-deps */
import { useStateContext } from '../../StateProvider';
import { useState, useEffect } from 'react';
import { MenuItem, Select } from '@mui/material';
import { getLeagueById } from '../../services/supabase-utils';
// import { useHistory } from 'react-router-dom';
import LeagueFixtures from '../widgets/LeagueFixtues.js';
import BroadageWidget from 'broadage-widget-react';

import Header from '../Header';
import './HomePage.scss';

export default function HomePage() {
  const {
    // currentUser,
    currentProfile,
    // searchQuery,
    // setSearchQuery
  } = useStateContext();
  const [leagues, setLeagues] = useState([]);
  const [leagueId, setLeagueId] = useState('2');
  // const { push } = useHistory();

  async function getAllLeagueNames(leagueId) {
    const response = await getLeagueById(leagueId);
    leagues.push(response);
    setLeagues([...leagues]);
  }
  useEffect(() => {
    currentProfile.followed_leagues.map((league) => {
      getAllLeagueNames(league);
    });
  }, []);

  function handleLeagueChange(e) {
    setLeagueId(e.target.value);
  }

  // console.log(leagueId);
  return (
    <div>
      <Header />
      <div className="fixturesContainer">
        <Select onChange={(e) => handleLeagueChange(e)}>
          {leagues.map((league) => {
            return (
              <MenuItem key={league.league_id} value={league.league_id}>
                {league.league_name}
              </MenuItem>
            );
          })}
        </Select>
        <BroadageWidget
          requiredFields={{ tournamentId: leagueId }}
          options={{
            webNotification: true,
            sportFilter: false,
            regionalMatchViewType: 'american',
            teamRedirectUrl: '/team/{teamId}',
          }}
          widget="soccerStandings"
          bundleId="soccer-st"
          accountId="0c3f42cf-082d-4d23-a935-660b656c78ee"
          queryStringParse={{ tournamentId: 'tid' }}
          className="widget-wrapper"
        />

        <LeagueFixtures leagueId={leagueId} />
      </div>
    </div>
  );
}
