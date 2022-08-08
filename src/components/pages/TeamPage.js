import { useParams } from 'react-router-dom';
import BroadageWidget from 'broadage-widget-react';
import Header from '../Header';

export default function TeamPage() {
  const { id } = useParams();
  return (
    <div>
      <Header />
      <BroadageWidget
        requiredFields={{ teamId: id }}
        options={{
          webNotification: true,
          sportFilter: false,
          regionalMatchViewType: 'american',
          matchRedirectUrl: '/match/{matchId}',
          theme: 'black',
          redirectType: '_self',
        }}
        widget="soccerTeamSchedule"
        bundleId="soccer-ts"
        accountId="6bf0cf44-e13a-44e1-8008-ff17ba6c2128"
        className="widget-wrapper"
      />
      <BroadageWidget
        requiredFields={{ teamId: id }}
        options={{
          webNotification: true,
          sportFilter: false,
          regionalMatchViewType: 'american',
          teamInfo: false,
          tournamentNavigationType: 'navigation',
          theme: 'black',
        }}
        widget="soccerTeamGoalsLeaderboard"
        bundleId="soccer-tglb"
        accountId="6bf0cf44-e13a-44e1-8008-ff17ba6c2128"
        className="widget-wrapper"
      />
    </div>
  );
}
