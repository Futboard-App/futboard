import { TextField } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { signInUser, signUpUser, createProfile } from '../../services/supabase-utils';

export default function AuthPage({ setCurrentUser }) {

  const { push } = useHistory();
  const [signInData, setSignInData] = React.useState({
    email: '',
    password: '',
  });
  const [signUpData, setSignUpData] = React.useState({
    email: '',
    password: '',
  });

  async function handleSignIn(e) {
    e.preventDefault();
    const { email, password } = signInData;
    const user = await signInUser(email, password);
    setCurrentUser(user);
    push('/');
  }

  async function handleSignUp(e) {
    e.preventDefault();
    const { email, password } = signUpData;
    const user = await signUpUser(email, password);
    setCurrentUser(user);
    await createProfile(email);
    push('/');
  }


  return <div>
    <form onSubmit={handleSignIn}>
      <p>Sign In</p>
      <label>
        <TextField margin='normal' size='small' id="outlined-basic" label="E-mail" variant="outlined" value={signInData.email} type='email' onChange={(e) => setSignInData({ 
          email: e.target.value, 
          password: signInData.password 
        })}/>
        <TextField margin='normal' size='small' id="outlined-basic" label="Password" variant="outlined" value={signInData.password} type='password' onChange={(e) => setSignInData({ 
          email: signInData.email, 
          password: e.target.value 
        })}/>
      </label>
      <button> Submit</button>
    </form>
    <form onSubmit={handleSignUp}>
      <p>Sign Up</p>
      <label>
        <TextField margin='normal' size='small' id="outlined-basic" label="E-mail" variant="outlined" value={signUpData.email} type='email' onChange={(e) => setSignUpData({ 
          email: e.target.value, 
          password: signUpData.password 
        })} />
          
        <TextField margin='normal' size='small' id="outlined-basic" label="Password" variant="outlined" value={signUpData.password} type='password' onChange={(e) => setSignUpData({ 
          email: signUpData.email, 
          password: e.target.value
        })}/>
      </label>
      <button> Submit </button>
    </form>
  </div>;
}