import { useState } from 'react';
import RegisterForm from '../components/RegisterForm/RegisterForm.jsx';
import useAuthStore from '../store/authStore.js';
import { registerUser } from '../api/auth.js';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);

  const handleRegister = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await registerUser(username, email, password);
      setUser(data.user, data.user.token);
      navigate('/');
    } catch (err) {
      setError(err.errors.body);
      console.error('Ошибка регистрации', err);
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
          borderRadius: '4px',
        }}
      >
        <Typography variant="h4" color="secondary" sx={{ p: '1rem 0' }}>
          Sign up
        </Typography>
        <Typography variant="subtitle2" color="secondary">
          Welcome, please Sign up to continue
        </Typography>
        <Typography
          component={Link}
          to={'/login'}
          variant="subtitle2"
          color="primary"
          sx={{ textDecoration: 'none' }}
        >
          Have an account?
        </Typography>

        <RegisterForm
          username={username}
          email={email}
          password={password}
          handleRegister={handleRegister}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onUsernameChange={setUsername}
          loading={loading}
          error={error}
          setError={setError}
        />
      </Container>
    </Box>
  );
};

export default RegisterPage;
