import useAuthStore from '../../store/authStore.js';
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { styled } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LightModeIcon from '@mui/icons-material/LightMode';
import useThemeStore from '../../store/themeStore.js';
import Brightness3Icon from '@mui/icons-material/Brightness3';

const AuthHeader = () => {
  const { user } = useAuthStore();
  const { setThemeMode, themeMode } = useThemeStore();

  const StyledButton = styled(Button)(({ theme }) => ({
    '&.active': {
      color: theme.palette.primary.main,
    },
  }));

  return (
    <AppBar position="static" color="transparent" sx={{ boxShadow: 'none' }}>
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            color="primary"
            variant="h5"
            component={Link}
            to="/"
            sx={{ textTransform: 'none', textDecoration: 'none' }}
          >
            conduit
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton color="secondary" onClick={() => setThemeMode()}>
              {themeMode === 'dark' ? <LightModeIcon /> : <Brightness3Icon />}
            </IconButton>
            <StyledButton
              color="secondary"
              component={NavLink}
              to="/"
              sx={{ textTransform: 'none' }}
              startIcon={<HomeIcon />}
            >
              Home
            </StyledButton>
            <StyledButton
              color="secondary"
              component={NavLink}
              to="/editor"
              sx={{ textTransform: 'none' }}
              startIcon={<EditIcon />}
            >
              New Article
            </StyledButton>
            <StyledButton
              color="secondary"
              component={NavLink}
              to="/settings"
              sx={{ textTransform: 'none' }}
              startIcon={<SettingsIcon />}
            >
              Settings
            </StyledButton>
            <StyledButton
              color="secondary"
              component={NavLink}
              to={`/profile/${user.username}`}
              sx={{ textTransform: 'none' }}
              startIcon={<PersonIcon />}
            >
              <Typography>{user.username}</Typography>
            </StyledButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AuthHeader;
