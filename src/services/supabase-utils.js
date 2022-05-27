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
export async function createUserInfo() {
  const response = await client.from('user_info').insert({});
  return checkError(response);
}

export async function getUserInfo() {
  const user = getUser();
  const response = await client.from('user_info').select().match({ user_id: user.id }).single();

  return checkError(response);
}

export async function updateUserInfo() {
  const user = getUser();
  const response = await client.from('user_info').update({}).match({ user_id: user.id });

  return checkError(response);
}

// Other Supabase Functions
