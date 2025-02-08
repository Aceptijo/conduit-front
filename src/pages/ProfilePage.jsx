import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useProfileStore from '../store/profileStore.js';
import useAuthStore from '../store/authStore.js';
import ArticlePreview from '../components/Article/ArticlePreview.jsx';
import useArticlesStore from '../store/articlesStore.js';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Fade,
  LinearProgress,
  Pagination,
  PaginationItem,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { AddOutlined, RemoveOutlined, Settings } from '@mui/icons-material';
import useSnackbarStore from '../store/snackbarStore.js';

const ProfilePage = () => {
  const { user } = useAuthStore();
  const { showSnackbar } = useSnackbarStore();
  const { profile, fetchProfile, followUser, unfollowUser, setProfile, error, profileIsLoading } =
    useProfileStore();
  const { articles, fetchArticles, articlesCount, isLoading } = useArticlesStore();
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState('author');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;
  const totalPages = Math.ceil(articlesCount / articlesPerPage);

  useEffect(() => {
    if (user?.username === username) {
      setProfile(user);
    } else {
      fetchProfile(username);
    }
  }, [username, fetchProfile, setProfile, user]);

  useEffect(() => {
    const offset = currentPage - 1;
    fetchArticles(username, activeTab, offset, articlesPerPage);
  }, [activeTab, fetchProfile, currentPage, username]);

  useEffect(() => {
    if (error) {
      showSnackbar(error, 'error');
    }
  }, [error]);

  const handleFollow = async () => {
    profile.following ? unfollowUser(username) : followUser(username);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleTabChange = (event, tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return profileIsLoading ? (
    <LinearProgress />
  ) : (
    <Fade in={!profileIsLoading}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Box sx={{ p: '2rem 0', bgcolor: 'secondary.dark' }}>
          <Container
            maxWidth="lg"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <Avatar
              src={profile?.image || 'broken-image.jpg'}
              sx={{ width: '100px', height: '100px' }}
            />
            <Typography variant="h4" color="primary" sx={{ mt: '1rem' }}>
              {profile?.username}
            </Typography>
            <Typography color="secondary">{profile?.bio || 'Description is missing'}</Typography>
            {user && user?.username === profile?.username ? (
              <Button
                variant="outlined"
                component={Link}
                to={`/settings`}
                startIcon={<Settings />}
                color="secondary"
                sx={{ alignSelf: 'end' }}
              >
                Edit Profile Settings
              </Button>
            ) : (
              <Button
                variant={profile?.following ? 'contained' : 'outlined'}
                onClick={handleFollow}
                startIcon={profile?.following ? <RemoveOutlined /> : <AddOutlined />}
                sx={{ alignSelf: 'end' }}
              >
                {profile?.following
                  ? `Unfollow ${profile?.username}`
                  : `Follow ${profile?.username}`}
              </Button>
            )}
          </Container>
        </Box>
        <Container maxWidth="md" sx={{ mt: '1rem', display: 'flex', flexDirection: 'column' }}>
          <Tabs
            value={activeTab}
            textColor="primary"
            indicatorColor="primary"
            onChange={handleTabChange}
          >
            <Tab
              value="author"
              label="My Articles"
              component={Link}
              to={`/profile/${profile?.username}/?feed=author`}
            />
            <Tab
              value="favorited"
              label="Favorited Articles"
              component={Link}
              to={`/profile/${profile?.username}/?feed=favorited`}
            />
          </Tabs>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: '4rem 0' }}>
              <CircularProgress size={60} />
            </Box>
          ) : (
            articles?.map((article) => <ArticlePreview article={article} key={article.slug} />)
          )}
          <Pagination
            page={currentPage}
            count={totalPages}
            color="primary"
            sx={{ mt: '1.5rem', alignSelf: 'center' }}
            onChange={handlePageChange}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/profile/${profile?.username}/?feed=${activeTab}${item.page === 1 ? '' : `&page=${item.page}`}`}
                {...item}
              />
            )}
          />
        </Container>
      </Box>
    </Fade>
  );
};

export default ProfilePage;
