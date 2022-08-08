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
        accountId="43229b19-7057-40c2-9b1f-5c919bf35b09"
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
        accountId="43229b19-7057-40c2-9b1f-5c919bf35b09"
        className="widget-wrapper"
      />
    </div>
  );
}
