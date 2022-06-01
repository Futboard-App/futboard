
export default function LeagueFixtures({ leagueId }) {
  
  return (
    <div id="wg-api-football-fixtures"
      data-host="v3.football.api-sports.io"
      data-refresh="60"
      data-league={leagueId}
      data-season="2021"
      data-key={process.env.REACT_APP_API_FOOTBALL_KEY}
      data-show-errors="true"
      className="api_football_loader fixtures">
    </div>
  );
}