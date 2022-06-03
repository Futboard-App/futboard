/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { getAllLeagues, getProfile, updateProfile } from '../../services/supabase-utils';
import { Grid } from '@mui/material';
import { useStateContext } from '../../StateProvider';
import './profile-setup.scss';
import { useHistory } from 'react-router-dom';
import Header from '../Header.js';

const steps = ['Select favorite league', 'Select other leagues to follow'];

export default function ProfileSetupPage({ step }) {
  const [activeStep, setActiveStep] = React.useState(step);
  const [skipped, setSkipped] = React.useState(new Set());
  const [leagues, setLeagues] = React.useState([]);
  const [nextButtonOn, setNextButtonOn] = React.useState(false);
  const { currentProfile, setCurrentProfile, currentUser } = useStateContext();
  const { push } = useHistory();

  React.useEffect(() => {
    async function load() {
      const response = await getAllLeagues();
      setLeagues(response);
      if (currentUser.id) {
        const profile = await getProfile(currentUser.id);
        setCurrentProfile(profile);
      }
    }
    load();
  }, []);

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if (activeStep === 0) {
      currentProfile.step_1_complete = true;
    }
    if (activeStep === 1) {
      currentProfile.step_2_complete = true;
      push('/home');
    }
    await updateProfile(currentProfile, currentProfile.id);

    const profile = await getProfile(currentUser.id);
    setCurrentProfile(profile);

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function handleStep1(league_id) {
    currentProfile.favorite_league = league_id;
    currentProfile.followed_leagues = [league_id];
    setNextButtonOn(true);
  }

  function handleStep2(league_id) {
    if (currentProfile.followed_leagues.includes(league_id)) {
      const index = currentProfile.followed_leagues.findIndex(
        (currentValue) => currentValue === league_id
      );
      currentProfile.followed_leagues.splice(index, 1);
    } else {
      currentProfile.followed_leagues.push(league_id);
    }
  }

  return (
    <div className="profile_setup">
      <Header profileSetup={true} />
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep} className="stepper">
          {steps.map((label) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps} className="step">
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === 0 && (
          <div className="card_container">
            <div className="card_div">
              {leagues.map((league) => {
                if (currentProfile.favorite_league === league.league_id) {
                  return (
                    <label className="setup_card" key={league.league_id}>
                      <input
                        name="leagues"
                        checked
                        type="radio"
                        value={league.league_id}
                        onChange={(e) => handleStep1(e.target.value)}
                      />
                      {league.league_name}
                      <span>
                        <img alt={league.league_name} src={league.league_logo} />
                      </span>
                    </label>
                  );
                } else {
                  return (
                    <label className="setup_card" key={league.league_id}>
                      <input
                        name="leagues"
                        type="radio"
                        value={league.league_id}
                        onChange={(e) => handleStep1(e.target.value)}
                      />
                      {league.league_name}
                      <span>
                        <img alt={league.league_name} src={league.league_logo} />
                      </span>
                    </label>
                  );
                }
              })}
            </div>
          </div>
        )}
        {activeStep === 1 && (
          <div className="card_container">
            <div className="card_div">
              {leagues.map((league) => {
                if (currentProfile.favorite_league === league.league_id) {
                  return (
                    <label className="setup_card" key={league.league_id}>
                      <input
                        checked
                        disabled
                        type="checkbox"
                        value={league.league_id}
                        onChange={(e) => handleStep2(e.target.value)}
                      />
                      {league.league_name}
                      <span>
                        <img alt={league.league_name} src={league.league_logo} />
                      </span>
                    </label>
                  );
                } else {
                  return (
                    <label className="setup_card" key={league.league_id}>
                      <input
                        type="checkbox"
                        value={league.league_id}
                        onChange={(e) => {
                          handleStep2(e.target.value);
                        }}
                      />
                      {league.league_name}
                      <span>
                        <img alt={league.league_name} src={league.league_logo} />
                      </span>
                    </label>
                  );
                }
              })}
            </div>
          </div>
        )}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="row"
          rows={1}
          columns={2}
          className="button-container"
        >
          <Button
            className="back-button"
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          {nextButtonOn ? (
            <Button className="next-button" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          ) : (
            <Button className="next-button" disabled onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          )}
        </Grid>
      </Box>
    </div>
  );
}
