import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e2b714',
      light: '#d1d0c5',
      dark: '#d1d0c5',
      contrastText: '#2c2e31',
    },
    secondary: {
      main: '#d1d0c5',
      dark: '#2c2e31',
      light: '#646669',
      contrastText: '#2c2e31',
    },
  },
  error: {
    main: '#dc3545',
  },
  typography: {
    fontFamily: '"Roboto Mono", monospace ',
    fontWeightBold: '400',
    fontWeightMedium: '400',
    fontWeightLight: '400',
    fontWeightRegular: '400',
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: '#d1d0c5',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiFilledInput-root': {
            backgroundColor: '#2c2e31',
            '&:hover': {
              backgroundColor: '#2c2e31',
            },
            '&.Mui-focused': {
              backgroundColor: '#2c2e31',
            },
            '& .MuiInputBase-input': {
              color: '#d1d0c5',
              caretColor: '#e2b714',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#646669',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#646669',
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: '#d1d0c5',
          '&:hover': {
            backgroundColor: '#2c2e31',
          },
        },
      },
    },
  },
});
// bg: #323437
// main yellow: #e2b714
// text color: #d1d0c5
// sub text color: #646669
// bg dark: #2c2e31

export default theme;
