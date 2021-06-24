import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import Login from './Login';
import Welcome from './Welcome';
import { RootContainer } from '../../components/common';

/**
 * Styles
 */
const useStyles = makeStyles(() => ({
  itemFit: {
    height: '100%',
    '@media screen and (max-width: 600px)': {
      height: 'fit-content'
    },
  },
  itemNoFit: {
    height: '100%',
  },
}))

/**
 * Main Component
 */
const LoginPage = () => {
  const classes = useStyles();
 
  const [email, setEmail] = useState('');
  const [openForgotPasswordSubmit, setOpenForgotPasswordSubmit] = useState(false);

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const handleSignIn = (email: string, password: string) => {

    if (!email || !password) {
      setErrors({
        email: !email,
        password: !password,
      });

      return;
    }

    setErrors({
      email: false,
      password: false,
    });
    window.location.href = '/verification';
  }

  const handleForgotPassword = async (_email: string) => {
    setEmail(_email);
    setOpenForgotPasswordSubmit(true);
  }

  return (
    <RootContainer>
      <Grid container item sm={7} className={classes.itemFit}>
        <Welcome />
      </Grid>
      <Grid container item sm={5} className={classes.itemNoFit}>
        <Login
          errors={errors}
          handleSignIn={handleSignIn}
          openForgotPassword={handleForgotPassword}
        />
      </Grid>
    </RootContainer>
  );
}

export default LoginPage;