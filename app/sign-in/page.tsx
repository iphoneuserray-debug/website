'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Container } from '../shared-theme/customizations/container.tsx';
import { Card } from '../shared-theme/customizations/card';
import Notification, { NotificationSeverity } from './notification';

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [alertopen, setNotificationOpen] = React.useState(false);
  const [alertseverity, setNotificationSeverity] = React.useState<NotificationSeverity>('error');
  const [alertMessage, setNotificationMessage] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailError || passwordError) {
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    setNotificationOpen(true);
    setNotificationMessage("Account doesn't exist");
    setNotificationSeverity('error');
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value){
            setEmailError(true);
            setEmailErrorMessage('Please enter an email address.');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email.value)) {
          setEmailError(true);
          setEmailErrorMessage('Please enter a valid email address.');
          isValid = false;
        } else {
          setEmailError(false);
          setEmailErrorMessage('');
        }

    if (!password.value) {
          setPasswordError(true);
          setPasswordErrorMessage('Please Enter the password.');
          isValid = false;
        } else if (!/\w{8,16}/.test(password.value)){
            setPasswordError(true);
            setPasswordErrorMessage('Password length must be between 8 to 16 characters or numbers.')
            isValid = false;
        }else {
          setPasswordError(false);
          setPasswordErrorMessage('');
        }

    return isValid;
  };

  return (
      <Container direction="column" justifyContent="space-between">
        <Notification open={alertopen} severity={alertseverity} message={alertMessage} setNotificationOpen={setNotificationOpen}/>
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign in
            </Button>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link
                href="/sign-up"
                variant="body2"
                sx={{ alignSelf: 'center' }}
            >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </Container>
  );
}
