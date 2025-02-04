import { Alert, Box, Button, IconButton, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

const LoginForm = ({
  email,
  password,
  handleLogin,
  onEmailChange,
  onPasswordChange,
  loading,
  error,
  setError,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClose = () => {
    setError(null);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      component="form"
      sx={{ width: '100%', mt: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      {error && (
        <Alert
          variant="filled"
          severity="error"
          onClose={() => handleClose()}
          sx={{ color: 'secondary.main' }}
        >
          {error}
        </Alert>
      )}
      <TextField
        label="Email"
        placeholder="example@gmail.com"
        variant="filled"
        color="secondary"
        fullWidth
        value={email}
        onChange={(event) => onEmailChange(event.target.value)}
      />
      <TextField
        label="Password"
        placeholder="******"
        variant="filled"
        color="secondary"
        type={showPassword ? 'text' : 'password'}
        fullWidth
        value={password}
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
        onClick={handleLogin}
        sx={{ m: '2rem 0', p: '1rem' }}
      >
        LOGIN
      </Button>
    </Box>
  );
};

export default LoginForm;
