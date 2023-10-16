import React, { useState, useEffect } from 'react'
import {
    Box,
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    useTheme,
  } from '@mui/material';
  import logoimg from "../../assets/logo_blue.png"
  import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from 'state/usersApi';
import { setCredentials } from 'state/authSlice';

const Login = () => {

    const theme = useTheme();

    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  // const login = useLoginQuery({femail, fpassword}, { skip: femail === undefined && fpassword === undefined});
  // console.log("🚀 ~ file: index.jsx:28 ~ Login ~ login:", login)

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo !== null || userInfo?.length) {
      console.log("🚀 ~ file: index.jsx:37 ~ useEffect ~ userInfo:", userInfo)
      navigate('/dashboard');
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/dashboard');

    } catch (err) {
      console.log(err);
      
    }
  };

  return (
    <Container
    component="main"
    maxWidth="xs"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
    }}
  >
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 3,
        width: '100%',
        margin: 'auto',
        backgroundColor: `${theme.palette.background.alt}`
      }}
    >
      <Box
                component="img"
                alt="profile"
                src={logoimg}
                height="5rem"
              />
      <Typography component="h1" variant="h4" sx={{ marginTop: 2 }}>
        Login
      </Typography>
      <form
        onSubmit={handleSubmit}
        sx={{
          width: '100%', // Fix IE 11 issue.
          marginTop: 1,
        }}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.getContrastText(theme.palette.primary.main),
            marginTop: 2,
          }}
        >
          Login
        </Button>
      </form>
    </Paper>
  </Container>

  )
}

export default Login