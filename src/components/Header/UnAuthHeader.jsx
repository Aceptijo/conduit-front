import { NavLink } from 'react-router-dom';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';

const UnAuthHeader = () => {
  const StyledButton = styled(Button)(({ theme }) => ({
    '&.active': {
      color: theme.palette.primary.main,
      fontWeight: 'bold',
    },
  }));
  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.dark' }}>
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            color="primary"
            variant="h5"
            component="a"
            href="/"
            sx={{ textTransform: 'none', textDecoration: 'none', fontWeight: 'bold' }}
          >
            conduit
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <StyledButton
              color="secondary"
              component={NavLink}
              to="/"
              sx={{ textTransform: 'none' }}
            >
              Home
            </StyledButton>
            <StyledButton
              color="secondary"
              component={NavLink}
              to="/login"
              sx={{ textTransform: 'none' }}
            >
              Log in
            </StyledButton>
            <StyledButton
              color="secondary"
              component={NavLink}
              to="/register"
              sx={{ textTransform: 'none' }}
            >
              Register
            </StyledButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default UnAuthHeader;
