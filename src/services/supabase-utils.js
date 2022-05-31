import { client, checkError } from './client.js';

//Auth stuff
export async function signUpUser(email, password) {
  const response = await client.auth.signUp({ email, password });

  return response.user;
}

export async function signInUser(email, password) {
  const response = await client.auth.signIn({ email, password });

  return response.user;
}

export async function logout() {
  await client.auth.signOut();

  return (window.location.href = '../');
}

export async function getUser() {
  return client.auth.session();
}

// Creating & Updating Rows in User Info Table
export async function createProfile(email) {
  const response = await client.from('profiles').insert({ username: email });
  return checkError(response);
}

export async function getProfile(id) {
  const response = await client.from('profiles').select().match({ user_id: id }).single();

  return checkError(response);
}

export async function updateProfile(profile, id) {
  const response = await client.from('profiles').update(profile).match({ id });

  return checkError(response);
}

// Other Supabase Functions

export async function getAllTeamsByLeague(id) {
  const response = await client.from('teams').select().match({ league_id: id });
  return checkError(response);
}

export async function getAllLeagues() {
  const response = await client.from('leagues').select();
  return checkError(response);
}
