export async function getYelpData(stadium) {
  const rawResponse = await fetch(`/.netlify/functions/yelp-endpoint?stadium=${stadium}`);
  const data = await rawResponse.json();
  // console.log(data);

  return data;
}

export async function getMatchData(matchId) {
  const rawResponse = await fetch(`/.netlify/functions/match-endpoint?matchId=${matchId}`);
  const data = await rawResponse.json();

  return data;
}
