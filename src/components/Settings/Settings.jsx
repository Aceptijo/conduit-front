import useAuthStore from '../../store/authStore.js';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance.js';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { Logout } from '@mui/icons-material';

const Settings = () => {
  const { user, setUser, clearUser, token } = useAuthStore();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
    image: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
        image: user.image || '',
        password: '',
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedData = {};

    updatedData.username = formData.username ?? '';
    updatedData.email = formData.email ?? '';
    updatedData.password = formData.password ?? '';
    updatedData.bio = formData.bio ?? '';
    updatedData.image = formData.image ?? '';

    try {
      const response = await axiosInstance.put('/user', {
        user: updatedData,
      });
      const updatedUser = response.data.user;
      setUser(updatedUser, token);
      navigate(`/profile/${updatedUser.username}`);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Не удалось обновить профиль. Повторите вход.');
        navigate('/login');
      } else {
        console.error('Ошибка обновления профиля: ', err);
        setError('Не удалось обновить профиль. Проверьте данные и попробуйте снова.');
      }
    }
  };

  const handleLogout = () => {
    clearUser();
    navigate('/');
  };

  return (
    <Box>
      <Container maxWidth="sm">
        <Typography variant="h5" color="secondary" align="center" sx={{ p: '2rem' }}>
          Your Settings
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <TextField
            id="image"
            label="URL of profile picture"
            variant="filled"
            fullWidth
            color="secondary"
            value={formData.image}
            onChange={(event) => handleChange(event)}
          />
          <TextField
            id="username"
            label="Your name"
            variant="filled"
            fullWidth
            color="secondary"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            id="bio"
            label="Short bio about you"
            variant="filled"
            fullWidth
            color="secondary"
            multiline
            rows={5}
            value={formData.bio}
            onChange={handleChange}
          />
          <TextField
            id="email"
            label="Your Email example@gmail.com"
            variant="filled"
            fullWidth
            color="secondary"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            id="password"
            label="New Password"
            variant="filled"
            fullWidth
            color="secondary"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            sx={{ p: '0.75rem 1.25rem', alignSelf: 'end' }}
            onClick={handleSubmit}
          >
            Update Settings
          </Button>
        </Box>
        <Box>
          <hr />
          <Button variant="outlined" color="error" startIcon={<Logout />} onClick={handleLogout}>
            Log out
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Settings;
