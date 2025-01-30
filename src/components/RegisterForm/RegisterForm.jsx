import { Box, Button, TextField } from '@mui/material';

const RegisterForm = ({
  username,
  password,
  email,
  loading,
  handleRegister,
  onEmailChange,
  onPasswordChange,
  onUsernameChange,
}) => {
  return (
    <Box
      component="form"
      sx={{ width: '100%', mt: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <TextField
        label="Username"
        placeholder="nickname"
        fullWidth
        value={username}
        onChange={(event) => onUsernameChange(event.target.value)}
      />
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
        sx={{ m: '2rem 0', p: '1rem' }}
        onClick={handleRegister}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default RegisterForm;
