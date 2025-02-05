'use client'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../Copyright';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import postLogin from './loginHandler';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';

export default function LoginPage() {
  const router = useRouter()
  const [alertDisplay, setAlertDisplay] = useState("none")
  const [alertText, setAlertText] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      identity: data.get("identity"), 
    });
    const email = data.get("email")?.toString()
    const password = data.get("password")?.toString()
    const identity = data.get("identity")?.toString()
    if (email && password && identity) {
      const responseText = await postLogin({ 
        email: email, 
        password: password, 
        identity: identity
      })
      if (responseText === "success!") {
        console.log("route!")
        router.push("/dashboard")
      } else {
        setAlertText(responseText)
        setAlertDisplay("flex")
      }
    } else {
      setAlertText("All fields should not be empty!")
      setAlertDisplay("flex")
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address/ID"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            select
            id="identity"
            label="Identity"
            name="identity"
            defaultValue=""
            autoComplete="off"
            sx={{ mb: 2 }}
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
            <MenuItem value="SA">Student Assistant</MenuItem>
          </TextField>
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Alert 
            variant="outlined" 
            severity="error" 
            onClose={() => { setAlertDisplay("none") }}
            sx={{
              display: alertDisplay
            }}>
            {alertText}
          </Alert>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography variant="body2" component={Link} href="/forgotPassword">
                Forgot password?
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" component={Link} href="/register">
                Don&apos;t have an account? Sign Up
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}