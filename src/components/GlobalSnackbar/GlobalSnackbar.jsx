import useSnackbarStore from '../../store/snackbarStore.js';
import { Alert, Snackbar } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import DoneIcon from '@mui/icons-material/Done';

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
      {severity === 'success' ? (
        <Alert
          severity="none"
          icon={<DoneIcon />}
          sx={{ color: 'secondary.dark', bgcolor: 'primary.main', mt: '2rem' }}
        >
          {message}
        </Alert>
      ) : (
        <Alert
          severity={severity}
          onClose={handleClose}
          color="secondary.main"
          icon={<ErrorIcon />}
          sx={{ bgcolor: 'error.main', color: 'secondary.main', mt: '2rem' }}
        >
          {message}
        </Alert>
      )}
    </Snackbar>
  );
};

export default GlobalSnackbar;
