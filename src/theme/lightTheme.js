import { createTheme } from '@mui/material';

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#444444',
      light: '#444444',
      dark: '#444444',
      contrastText: '#dddddd',
    },
    secondary: {
      main: '#444444',
      dark: '#dddddd',
      light: '#b2b2b2',
      contrastText: '#dddddd',
    },
    background: {
      default: '#eeeeee',
    },
  },
  error: {
    main: '#d70000',
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
            color: '#444444',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiFilledInput-root': {
            backgroundColor: '#dddddd',
            '&:hover': {
              backgroundColor: '#dddddd',
            },
            '&.Mui-focused': {
              backgroundColor: '#dddddd',
            },
            '& .MuiInputBase-input': {
              color: '#444444',
              caretColor: '#444444',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#b2b2b2',
          },
          '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #dddddd inset',
            WebkitTextFillColor: '#444444',
            transition: 'background-color 5000s ease-in-out 0s',
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
          color: '#444444',
          '&:hover': {
            backgroundColor: '#dddddd',
          },
        },
      },
    },
  },
});
// bg: #eeeeee;
// main: #444444;
// text color: #444444;
// sub text color: #b2b2b2;
// bg dark: #dddddd;
export default lightTheme;
