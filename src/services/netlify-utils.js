export async function getLeagueTeams(leagueId, season) {
  const rawResponse = await fetch(
    `/.netlify/functions/team-endpoint?leagueId=${leagueId}?season=${season}`
  );
  const data = await rawResponse.json();

  return data;
}
