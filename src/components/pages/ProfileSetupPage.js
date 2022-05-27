import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getAllLeagues, getAllTeamsByLeague } from '../../services/supabase-utils';
import { Grid, InputLabel, MenuItem, Select } from '@mui/material';

const steps = ['Select Favorite Team', 'Select Leagues to Follow', 'Other Favorite Teams'];

export default function ProfileSetupPage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [teams, setTeams] = React.useState([]);
  const [leagueID, setLeagueID] = React.useState(61);
  const [leagues, setLeagues] = React.useState([]);
  const [profileForm, setProfileForm] = React.useState({});

  React.useEffect(() => {
    async function load() {
      const response = await getAllTeamsByLeague(leagueID);
      setTeams(response);
    }
    load();
  }, [leagueID]);

  React.useEffect(() => {
    async function load2() {
      const response = await getAllLeagues();
      setLeagues(response);
    }
    load2();
  }, []);

  const isStepOptional = (step) => {
    return step === 2;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleLeagueChange = (event) => {
    setLeagueID(event.target.value);

    async function loadTeams(leagueID) {
      const response = await getAllTeamsByLeague(leagueID);
      setTeams(response);
    }
    loadTeams(event.target.value);

  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === 0 && (
        <div>
          <InputLabel id="demo-simple-select-label">Select a league</InputLabel>
          <Select id='league' labelId="demo-simple-select-label" label={'Select a league'} value={leagueID} onChange={handleLeagueChange}>
            {leagues.filter(item => item.league_type === 'League').map((league) => {
              return (
                <MenuItem key={league.supabase_id} value={league.league_id}>{league.league_name}</MenuItem>
              );})}
          </Select>
          <div>
            {teams.map((team) => {
              return (
                <Box key={team.team_id}>
                  <Typography>{team.team_name}</Typography>
                </Box>
              );
            })}
          </div>
        </div>
      )}
      {activeStep === 1 && (
        <div>Step 2</div>
      )}
      {activeStep === 2 && (
        <div>Step 3</div>
      )}
      <Grid container justifyContent="center" alignItems="center" direction="row" rows={1} columns={2}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}>
              Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        {isStepOptional(activeStep) && (
          <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
          </Button>
        )}
        <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Grid>
    </Box>
  );
}