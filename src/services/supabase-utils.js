import { client, checkError } from './client.js';
export async function setTeams(team) {
  const response = await client.from('teams').insert(team);

  return checkError(response);
}
