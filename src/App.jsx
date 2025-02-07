import './App.css';
import Footer from './components/Footer/Footer.jsx';
import AppRouter from './components/AppRouter/AppRouter.jsx';
import UnAuthHeader from './components/Header/UnAuthHeader.jsx';
import useAuthStore from './store/authStore.js';
import AuthHeader from './components/Header/AuthHeader.jsx';
import { useEffect } from 'react';
import GlobalSnackbar from './components/GlobalSnackbar/GlobalSnackbar.jsx';
import { Box, ThemeProvider } from '@mui/material';
import useThemeStore from './store/themeStore.js';
import darkTheme from './theme/darkTheme.js';
import lightTheme from './theme/lightTheme.js';

function App() {
  const { user, isLoading, restoreSession } = useAuthStore();
  const { themeMode } = useThemeStore();
  const currentTheme = themeMode === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <Box sx={{ bgcolor: 'background.default', pb: '100px', minHeight: '100vh' }}>
        <GlobalSnackbar />
        {user ? <AuthHeader /> : <UnAuthHeader />}
        <AppRouter />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
