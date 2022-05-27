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

export function getUser() {
  return client.auth.session();
}

// Creating & Updating Rows in User Info Table
export async function createProfile() {
  const response = await client.from('profiles').insert({});
  return checkError(response);
}

export async function getProfile() {
  const user = getUser();
  const response = await client.from('profiles').select().match({ user_id: user.id }).single();

  return checkError(response);
}

export async function updateProfile() {
  const user = getUser();
  const response = await client.from('profiles').update({}).match({ user_id: user.id });

  return checkError(response);
}

// Other Supabase Functions
