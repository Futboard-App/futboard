/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom';
import BroadageWidget from 'broadage-widget-react';
import Header from '../Header';
// import { useEffect, useRef, useState } from 'react';
// import { getYelpData } from '../../services/netlify-utils';

export default function MatchPage() {
  const { id } = useParams();
  // const [stadiumName, setStadiumName] = useState('');
  // const [businessList, setBusinessList] = useState([]);
  // const matchInfo = useRef(null);

  // useEffect(() => {
  //   async function wait() {
  //     const stadiumName = matchInfo.current._reactInternals.child.stateNode.querySelectorAll(
  //       '.broadage-match-info-name'
  //     )[2];
  //     setStadiumName(stadiumName);
  //   }
  //   async function yelp() {
  //     const yelpData = await getYelpData(stadiumName.textContent);
  //     // console.log(yelpData);
  //     setBusinessList(yelpData.data.businesses);
  //   }
  //   setTimeout(wait, 1000);
  //   setTimeout(yelp, 2000);
  // }, []);

  // console.log(businessList);

  return (
    <div>
      <Header />
      <BroadageWidget
        // ref={matchInfo}
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
    </div>
  );
}
