/* eslint-disable no-debugger */
/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom';
import BroadageWidget from 'broadage-widget-react';
import Header from '../Header';
import { useEffect, useRef, useState } from 'react';
import { getYelpData } from '../../services/netlify-utils';
import './MatchPage.scss';

export default function MatchPage() {
  const { id } = useParams();
  const [stadiumName, setStadiumName] = useState('');
  const [businessList, setBusinessList] = useState([]);
  const matchInfo = useRef(null);

  useEffect(() => {
    async function wait() {
      const stadium = matchInfo.current._reactInternals.child.stateNode.querySelectorAll(
        '.broadage-match-info-name'
      )[2];
      setStadiumName(stadium);
    }
    async function yelp() {
      const yelpData = await getYelpData(stadiumName.textContent);
      setBusinessList(yelpData.data.businesses);
    }
    setTimeout(wait, 1000);
    setTimeout(yelp, 3000);
  }, [stadiumName]);


  return (
    <div>
      <Header />
      <BroadageWidget
        ref={matchInfo}
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
      <div className="yelp-businesses">
        <h3>Near by restaurants</h3>
        <div className="businesses-list">
          {businessList.map((business) => (
            <a key={business.id} href={business.url}>
              <div className="business">
                <img src={business.image_url} alt={business.name} />
                <div className="business-info">
                  <div className="business-name">{business.name}</div>
                  <div className="business-rating">
                    {business.rating}⭐
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
