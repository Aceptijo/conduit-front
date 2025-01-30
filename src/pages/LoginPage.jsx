import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuthStore from '../store/authStore.js';
import LoginForm from '../components/LoginForm/LoginForm.jsx';
import { loginUser } from '../api/auth.js';
import { Alert, Box, Container, Typography } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);

  console.log(email, password);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      setUser(data.user, data.user.token);
      navigate('/');
    } catch (error) {
      setError(error.errors);
      console.error('Ошибка авторизации', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'secondary.dark',
          p: '1rem 0',
          mt: '10rem',
        }}
      >
        <Typography variant="h4" color="secondary" sx={{ p: '1rem 0' }}>
          Sign In
        </Typography>
        <Typography variant="subtitle2" color="secondary">
          Welcome, please sign in to continue
        </Typography>
        <Typography
          component={Link}
          to={'/register'}
          variant="subtitle2"
          color="primary"
          sx={{ textDecoration: 'none' }}
        >
          Need an account?
        </Typography>
        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}
        <LoginForm
          email={email}
          password={password}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          handleLogin={handleLogin}
          loading={loading}
        />
      </Container>
    </Box>
  );
};

export default LoginPage;
