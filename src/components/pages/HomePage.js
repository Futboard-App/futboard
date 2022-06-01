/* eslint-disable react-hooks/exhaustive-deps */
import { useStateContext } from '../../StateProvider';
import { useState, useEffect } from 'react';
import { MenuItem, Select } from '@mui/material';
import { getLeagueById } from '../../services/supabase-utils';
import { useHistory } from 'react-router-dom';
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
  const [leagueId, setLeagueId] = useState(currentProfile.favorite_league);
  const { push } = useHistory();
  const viewOptions = [
    'Standings',
    'Matches',
    'Goals Leaderboard',
    'Assists Leaderboard',
    'Cards Leaderboard',
  ];
  const [view, setView] = useState('Standings');

  async function getAllLeagueNames(leagueId) {
    const response = await getLeagueById(leagueId);
    leagues.push(response);
    leagues.sort((a, b) => {
      return a.league_id > b.league_id ? 1 : -1;
    });
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

  function handleViewChange(e) {
    setView(viewOptions[e.target.value]);
  }

  return (
    <div>
      <Header />
      <div className="fixturesContainer">
        <div className="select-container">
          {/* select league */}
          <Select
            onChange={(e) => handleLeagueChange(e)}
            defaultValue={currentProfile.favorite_league}
          >
            {leagues.map((league) => {
              return (
                <MenuItem key={league.league_id} value={league.league_id}>
                  {league.league_name}
                </MenuItem>
              );
            })}
          </Select>
          {/* select view */}
          <Select onChange={(e) => handleViewChange(e)} defaultValue={0}>
            {viewOptions.map((viewOption, index) => {
              return (
                <MenuItem key={viewOption} value={index}>
                  {viewOption}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        {/* standings view */}
        {view === 'Standings' && (
          <BroadageWidget
            requiredFields={{ tournamentId: leagueId }}
            options={{
              webNotification: true,
              sportFilter: false,
              regionalMatchViewType: 'american',
              teamRedirectUrl: '/team/{teamId}',
              redirectType: '_self',
            }}
            widget="soccerStandings"
            bundleId="soccer-st"
            accountId="0c3f42cf-082d-4d23-a935-660b656c78ee"
            queryStringParse={{ tournamentId: 'tid' }}
            className="widget-wrapper"
          />
        )}
        {/* matches view */}
        {view === 'Matches' && (
          <BroadageWidget
            requiredFields={{ tournamentId: leagueId }}
            options={{
              webNotification: true,
              sportFilter: false,
              regionalMatchViewType: 'american',
              matchInfo: 'below',
              teamRedirectUrl: '/team/{teamId}',
              matchRedirectUrl: '/match/{matchId}',
              redirectType: '_self',
            }}
            widget="soccerFixture"
            bundleId="soccer-fx"
            accountId="0c3f42cf-082d-4d23-a935-660b656c78ee"
            queryStringParse={{ tournamentId: 'tid' }}
            className="widget-wrapper"
          />
        )}
        {/* goals leaderboard view */}
        {view === 'Goals Leaderboard' && (
          <BroadageWidget
            requiredFields={{ tournamentId: leagueId }}
            options={{
              webNotification: true,
              sportFilter: false,
              regionalMatchViewType: 'american',
            }}
            widget="soccerLeaderboardGoals"
            bundleId="soccer-lbg"
            accountId="0c3f42cf-082d-4d23-a935-660b656c78ee"
            queryStringParse={{ tournamentId: 'tid' }}
            className="widget-wrapper"
          />
        )}
        {/* assists leaderboard view */}
        {view === 'Assists Leaderboard' && (
          <BroadageWidget
            requiredFields={{ tournamentId: leagueId }}
            options={{
              webNotification: true,
              sportFilter: false,
              regionalMatchViewType: 'american',
            }}
            widget="soccerLeaderboardAssists"
            bundleId="soccer-lba"
            accountId="0c3f42cf-082d-4d23-a935-660b656c78ee"
            queryStringParse={{ tournamentId: 'tid' }}
            className="widget-wrapper"
          />
        )}
        {/* cards leaderboard view */}
        {view === 'Cards Leaderboard' && (
          <BroadageWidget
            requiredFields={{ tournamentId: leagueId }}
            options={{
              webNotification: true,
              sportFilter: false,
              regionalMatchViewType: 'american',
            }}
            widget="soccerLeaderboardCards"
            bundleId="soccer-lbc"
            accountId="0c3f42cf-082d-4d23-a935-660b656c78ee"
            queryStringParse={{ tournamentId: 'tid' }}
            className="widget-wrapper"
          />
        )}
        <LeagueFixtures leagueId={leagueId} />
      </div>
    </div>
  );
}
