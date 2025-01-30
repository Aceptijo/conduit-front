import { Box, Button, TextField } from '@mui/material';

const LoginForm = ({ email, password, handleLogin, onEmailChange, onPasswordChange, loading }) => {
  return (
    <Box
      component="form"
      sx={{ width: '100%', mt: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <TextField
        label="Email"
        placeholder="example@gmail.com"
        fullWidth
        value={email}
        onChange={(event) => onEmailChange(event.target.value)}
      />
      <TextField
        label="Password"
        placeholder="****"
        fullWidth
        value={password}
        onChange={(event) => onPasswordChange(event.target.value)}
      />
      <Button
        loading={loading}
        variant="contained"
        onClick={handleLogin}
        sx={{ m: '2rem 0', p: '1rem' }}
      >
        Log In
      </Button>
    </Box>
  );
};

export default LoginForm;
