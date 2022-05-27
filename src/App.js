import './App.css';
import { leagueData } from './services/league-data';
import { useEffect } from 'react';
import { setLeagues, setTeams } from './services/supabase-utils';
import { getTeamData } from './services/fetch-utils';

function App() {
  // const leagueStuff = leagueData.response.map((league) => {
  //   const obj = {
  //     type: league.league.type,
  //     name: league.league.name,
  //     logo: league.league.logo,
  //     id: league.league.id,
  //     country: league.country.name,
  //   };
  //   return obj;
  // });
  // console.log(leagueStuff);

  // useEffect(() => {
  //   async function load() {
  //     const data = await getTeamData(10);
  //     const upload = data.response.map((team) => {
  //       const obj = {
  //         league_id: 10,
  //         team_code: team.team.code,
  //         team_name: team.team.name,
  //         team_logo: team.team.logo,
  //         team_id: team.team.id,
  //         team_founded: team.team.founded,
  //         team_country: team.team.country,
  //         venue_address: team.venue.address,
  //         venue_capacity: team.venue.capacity,
  //         venue_city: team.venue.city,
  //         venue_name: team.venue.name,
  //         venue_surface: team.venue.surface,
  //         venue_image: team.venue.image,
  //         venue_id: team.venue.id,
  //       };
  //       return obj;
  //     });
  //     await setTeams(upload);
  //   }
  //   load();
  // }, []);

  return <div className="App"></div>;
}

export default App;
