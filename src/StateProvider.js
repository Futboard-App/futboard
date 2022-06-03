import { useState, createContext, useContext } from 'react';

const StateContext = createContext();

export function StateProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [currentProfile, setCurrentProfile] = useState({});

  const stateAndSetters = {
    currentUser,
    setCurrentUser,
    currentProfile,
    setCurrentProfile,
  };

  return <StateContext.Provider value={stateAndSetters}>{children}</StateContext.Provider>;
}

export function useStateContext() {
  return useContext(StateContext);
}
