import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e2b714',
      dark: '#323437',
    },
    secondary: {
      main: '#d1d0c5',
      dark: '#2c2e31',
    },
  },
});

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={'/conduit-front/'}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
