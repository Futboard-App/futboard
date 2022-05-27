export async function getTeamData(leagueId) {
  const rawResponse = await fetch(`/.netlify/functions/team-endpoint?leagueId=${leagueId}`);
  const data = await rawResponse.json();

  return data;
}
