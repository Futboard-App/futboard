import { useParams } from 'react-router-dom';
import BroadageWidget from 'broadage-widget-react';
import Header from '../Header';


export default function MatchPage() {
  const { id } = useParams();
  return <div>
    <Header />
    <BroadageWidget
      requiredFields={{ matchId: id }}
      options={{
        webNotification: true,
        sportFilter: false,
        regionalMatchViewType: 'american',
        teamRedirectUrl: '/team/{teamId}',
        theme: 'black',
      }}
      widget="soccerMatchCenter"
      bundleId="soccer-mc"
      accountId="0c3f42cf-082d-4d23-a935-660b656c78ee"
      className="widget-wrapper"
    />
    <BroadageWidget
      requiredFields={{ matchId: id }}
      options={{
        webNotification: true,
        sportFilter: false,
        regionalMatchViewType: 'american',
        tournamentNavigationType: 'navigation',
        theme: 'black',
      }}
      widget="soccerMissingPlayers"
      bundleId="soccer-mp"
      accountId="0c3f42cf-082d-4d23-a935-660b656c78ee"
      className="widget-wrapper"
    />
    <BroadageWidget
      requiredFields={{ matchId: id }}
      options={{
        webNotification: true,
        sportFilter: false,
        regionalMatchViewType: 'american',
        tournamentNavigationType: 'navigation',
        theme: 'black',
      }}
      widget="soccerH2hStats"
      bundleId="soccer-hs"
      accountId="0c3f42cf-082d-4d23-a935-660b656c78ee"
      className="widget-wrapper"
    />
  </div>;
}