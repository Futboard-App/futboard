import { useParams } from 'react-router-dom';
import BroadageWidget from 'broadage-widget-react';
import Header from '../Header';


export default function TeamPage() {
  const { id } = useParams();
  return <div>
    <Header />
    {/* you use this widget about 10 times in your app with a ton of repeated props. I'm realizing now that the best solution is to have a CustomWidget component that renders the BroadageWidget with some default props that get overridden in specific cases. That way your Page components would be way less bloated with configuration */}
    <BroadageWidget
      requiredFields={{ teamId: id }}
      options={{
        webNotification: true,
        sportFilter: false,
        regionalMatchViewType: 'american',
        matchRedirectUrl: '/match/{matchId}',
        theme: 'black',
        redirectType: '_self'
      }}
      widget="soccerTeamSchedule"
      bundleId="soccer-ts"
      accountId="0c3f42cf-082d-4d23-a935-660b656c78ee"
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
      accountId="0c3f42cf-082d-4d23-a935-660b656c78ee"
      className="widget-wrapper"
    />
  </div>;
}
