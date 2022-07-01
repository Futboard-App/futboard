/* eslint-disable no-debugger */
/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom';
import BroadageWidget from 'broadage-widget-react';
import Header from '../Header';
import { useEffect, useRef, useState } from 'react';
import { getYelpData } from '../../services/netlify-utils';
import './MatchPage.scss';

// seems like this encapsulates the differences among your widgets, so now we can map over and reduce duplication
const widgetData = [
  {
    options: { teamRedirectUrl: '/team/{teamId}' },
    widget: "soccerMatchCenter",
    bundleId: "soccer-mc"
  },
  { options: { tournamentNavigationType: 'navigation' } },
  { options: { tournamentNavigationType: 'navigation' } }
];

export default function MatchPage() {
  const { id } = useParams();
  const [stadiumName, setStadiumName] = useState('');
  const [businessList, setBusinessList] = useState([]);
  const matchInfo = useRef(null);

  useEffect(() => {
    async function wait() {
      // seems like there should be a better way to do this. it's always a little icky when you see explicity DOM manipulation inside a react component. 
      // are you digging into the DOM widget here, i guess? and had no access to the JSON directly? that's a pretty good excuse, if so :)
      const stadium = matchInfo.current._reactInternals.child.stateNode.querySelectorAll(
        '.broadage-match-info-name'
      )[2];
      setStadiumName(stadium);
    }
    async function yelp() {
      const yelpData = await getYelpData(stadiumName.textContent);
      setBusinessList(yelpData.data.businesses);
    }
    // this is something it seems like could have just been done with async/await and a while loop? setTimeouts are usually a code smell. we should try to wait for the actual event, not our estimate of how long the actual event "usually" takes? i'd give more details on how to proceed, but i'm not sure what the 2000 and 4000 milliseconds are waiting for (a good reason to name these numbers in const WIDGET_LOADING_TIME = 2000, or whatever)
    setTimeout(wait, 2000);
    setTimeout(yelp, 4000);
  }, [stadiumName]);

  return (
    <div>
      <Header />
      {
      widgetData.map((item, i) =>       
        <BroadageWidget
          key={item.bundleId + i}
          ref={matchInfo}
          requiredFields={{ matchId: id }}
          options={{
            webNotification: true,
            sportFilter: false,
            regionalMatchViewType: 'american',
            theme: 'black',
            ...item.options,
          }}
          widget={item.widget || "soccerH2hStats"}
          bundleId={item.bundleId || "soccer-hs"}
          accountId="0c3f42cf-082d-4d23-a935-660b656c78ee"
          className="widget-wrapper"
      />
    )}
      <div className="yelp-businesses">
        <h3>Nearby Restaurants</h3>
        <div className="businesses-list">
          {businessList.map((business) => (
            <a key={business.id} href={business.url}>
              <div className="business">
                <img src={business.image_url} alt={business.name} />
                <div className="business-info">
                  <div className="business-name">{business.name}</div>
                  <div className="business-rating">{business.rating}⭐</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
