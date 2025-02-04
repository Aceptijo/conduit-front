import { Alert, Box, Button, IconButton, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

const RegisterForm = ({
  username,
  password,
  email,
  loading,
  handleRegister,
  onEmailChange,
  onPasswordChange,
  onUsernameChange,
  error,
  setError,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      sx={{
        width: '100%',
        mt: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {error && (
        <Alert
          variant="filled"
          severity="error"
          onClose={() => setError(null)}
          sx={{ color: 'secondary.main' }}
        >
          {error}
        </Alert>
      )}
      <TextField
        label="Username"
        placeholder="nickname"
        fullWidth
        color="secondary"
        variant="filled"
        autoComplete="off"
        value={username}
        onChange={(event) => onUsernameChange(event.target.value)}
      />

      <TextField
        label="Email"
        placeholder="example@gmail.com"
        fullWidth
        color="secondary"
        variant="filled"
        autoComplete="off"
        value={email}
        onChange={(event) => onEmailChange(event.target.value)}
      />
      <TextField
        label="Password"
        placeholder="****"
        fullWidth
        type={showPassword ? 'text' : 'password'}
        color="secondary"
        variant="filled"
        value={password}
        autoComplete="off"
        onChange={(event) => onPasswordChange(event.target.value)}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton
                aria-label={showPassword ? 'hide the password' : 'display the password'}
                onClick={handleClickShowPassword}
              >
                {showPassword ? (
                  <Visibility sx={{ color: 'secondary.main' }} />
                ) : (
                  <VisibilityOff sx={{ color: 'secondary.main' }} />
                )}
              </IconButton>
            ),
          },
        }}
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
