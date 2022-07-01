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

  // hooks typically go at the top
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
      currentProfile.followed_leagues
        .map((league) => getAllLeagueNames(league));
    }
  }, [currentProfile]);

  async function getAllLeagueNames(leagueId) {
    const response = await getLeagueById(leagueId);
    if (leagues.length < currentProfile.followed_leagues.length) {
      leagues.push(response);
      leagues.sort((a, b) => a.league_id > b.league_id ? 1 : -1);
      setLeagues([...leagues]);
    }
  }

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
              onChange={handleLeagueChange}
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
            onChange={handleViewChange}
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
        {/* i'm not going to puzzle through it, but there is a lot of duplicate code here that could have been reduced with a hashMap whose keys correspond to each of these views: { Standings: { wigdet: 'soccerStandings", bundleId }, etc, etc }. */}
        {/* Then you'd be able to just dump the props in according to what's in viewMap[view].options, or whatever */}
        {/* another option would be to move these Widgets to their own HomepagWidgets component so that the duplication is at least hidden away from the rest of this component */}
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
              theme: 'black',
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
              theme: 'black',
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
              theme: 'black',
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
              theme: 'black',
            }}
            widget="soccerLeaderboardCards"
            bundleId="soccer-lbc"
            accountId="0c3f42cf-082d-4d23-a935-660b656c78ee"
            queryStringParse={{ tournamentId: 'tid' }}
            className="widget-wrapper"
          />
        )}
      </div>
    </div>
  );
}
