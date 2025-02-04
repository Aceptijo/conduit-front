import useSnackbarStore from '../../store/snackbarStore.js';
import { Alert, Snackbar } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

const GlobalSnackbar = () => {
  const { open, message, closeSnackbar, severity } = useSnackbarStore();

  const handleClose = () => {
    closeSnackbar();
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        severity={severity}
        onClose={handleClose}
        color="secondary.main"
        icon={<ErrorIcon />}
        sx={{ bgcolor: 'error.main', color: 'secondary.main' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
