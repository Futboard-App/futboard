const fetch = require('node-fetch');
require('dotenv').config();

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
};

exports.handler = async (event, context) => {
  try {
    const response = await fetch(
      `https://api.yelp.com/v3/businesses/search?location=${event.queryStringParameters.stadium}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.YELP_KEY}`,
        },
      }
    );
    const data = await response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ data }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }