/* eslint-disable no-debugger */
/* eslint-disable react-hooks/exhaustive-deps */
import { useStateContext } from '../../StateProvider';
import { useState, useEffect } from 'react';
import { MenuItem, Select } from '@mui/material';
import { getLeagueById, getUser, getProfile } from '../../services/supabase-utils';
import BroadageWidget from 'broadage-widget-react';

import Header from '../Header';
import './HomePage.scss';

export default function HomePage() {
  const { currentProfile, setCurrentProfile } = useStateContext();
  const [leagues, setLeagues] = useState([]);
  const [leagueId, setLeagueId] = useState(currentProfile.favorite_league);
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
    if (leagues.length < currentProfile.followed_leagues.length) {
      leagues.push(response);
      leagues.sort((a, b) => {
        return a.league_id > b.league_id ? 1 : -1;
      });
      setLeagues([...leagues]);
    }
  }

  useEffect(() => {
    async function loadProfileHome() {
      const user = await getUser();
      const profile = await getProfile(user.user.id);
      setCurrentProfile(profile);
      setLeagueId(profile.favorite_league);
    }
    loadProfileHome();
  }, []);

  useEffect(() => {
    if (currentProfile.username) {
      currentProfile.followed_leagues.map((league) => {
        getAllLeagueNames(league);
      });
    }
  }, [currentProfile]);

  function handleLeagueChange(e) {
    setLeagueId(e.target.value);
  }

  function handleViewChange(e) {
    setView(viewOptions[e.target.value]);
  }

  return (
    <div className="home-page">
      <Header />
      <div className="fixturesContainer">
        <div className="select-container">
          {/* select league */}
          {currentProfile.username && (
            <Select
              sx={{ background: 'lightgrey' }}
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
          )}
          {/* select view */}
          <Select
            sx={{ background: 'lightgrey' }}
            onChange={(e) => handleViewChange(e)}
            defaultValue={0}
          >
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
              theme: 'black',
            }}
            widget="soccerStandings"
            bundleId="soccer-st"
            accountId="43229b19-7057-40c2-9b1f-5c919bf35b09"
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
              theme: 'black',
            }}
            widget="soccerFixture"
            bundleId="soccer-fx"
            accountId="43229b19-7057-40c2-9b1f-5c919bf35b09"
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
              theme: 'black',
            }}
            widget="soccerLeaderboardGoals"
            bundleId="soccer-lbg"
            accountId="43229b19-7057-40c2-9b1f-5c919bf35b09"
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
              theme: 'black',
            }}
            widget="soccerLeaderboardAssists"
            bundleId="soccer-lba"
            accountId="43229b19-7057-40c2-9b1f-5c919bf35b09"
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
              theme: 'black',
            }}
            widget="soccerLeaderboardCards"
            bundleId="soccer-lbc"
            accountId="43229b19-7057-40c2-9b1f-5c919bf35b09"
            queryStringParse={{ tournamentId: 'tid' }}
            className="widget-wrapper"
          />
        )}
      </div>
    </div>
  );
}
