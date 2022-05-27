const fetch = require('node-fetch');
require('dotenv').config();

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
};

exports.handler = async (event, context) => {
  const leagueId = event.queryStringParameters.leagueId;
  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/teams?league=${leagueId}&season=${season}`,
      {
        headers: {
          'x-rapidapi-key': `${process.env.API_FOOTBALL_KEY}`,
        },
      }
    );
    const data = await response.json();
    const json = JSON.stringify(data);

    return {
      statusCode: 200,
      headers,
      body: json,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};
