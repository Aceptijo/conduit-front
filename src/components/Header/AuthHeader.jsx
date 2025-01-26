import useAuthStore from '../../store/authStore.js';
import { AppBar, Avatar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/system';

const AuthHeader = () => {
  const { user } = useAuthStore();

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
              to="/editor"
              sx={{ textTransform: 'none' }}
            >
              New Article
            </StyledButton>
            <StyledButton
              color="secondary"
              component={NavLink}
              to="/settings"
              sx={{ textTransform: 'none' }}
            >
              Settings
            </StyledButton>
            <StyledButton
              color="secondary"
              component={NavLink}
              to={`/profile/${user.username}`}
              sx={{ textTransform: 'none' }}
            >
              <Avatar src={`${user.image}`} sx={{ width: 36, height: 36, mr: 1 }} />
              <Typography>{user.username}</Typography>
            </StyledButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AuthHeader;
