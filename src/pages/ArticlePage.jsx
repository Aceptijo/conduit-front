import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addToFavorites, deleteArticle, getArticle, removeFromFavorites } from '../api/articles.js';
import ArticleContent from '../components/Article/ArticleContent.jsx';
import useAuthStore from '../store/authStore.js';
import { followUser, unfollowUser } from '../api/user.js';
import CommentsSection from '../components/Article/Comments/CommentsSection.jsx';
import { Box, Container, Fade, LinearProgress, Typography } from '@mui/material';
import ArticleActions from '../components/Article/ArticleActions.jsx';
import useSnackbarStore from '../store/snackbarStore.js';

const ArticlePage = () => {
  const { slug } = useParams();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [error, setError] = useState(null);
  const { showSnackbar } = useSnackbarStore();

  const isAuthor = user && user.username === article?.author?.username;
  useEffect(() => {
    if (error) {
      showSnackbar(error, 'error');
    }
  }, [error]);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        const response = await getArticle(slug);
        setArticle(response);
        setIsFavorited(response.favorited);
        setIsFollowing(response.author.following);
        setIsLoading(false);
      } catch (err) {
        console.error('Не удалось получить данные о статье: ', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  const handleFavorite = async () => {
    try {
      if (isFavorited) {
        const updatedArticle = await removeFromFavorites(slug);
        setArticle(updatedArticle);
        setIsFavorited(false);
      } else {
        const updatedArticle = await addToFavorites(slug);
        setArticle(updatedArticle);
        setIsFavorited(true);
      }
    } catch (err) {
      setError(err.response.data.errors.body);
      console.error('Не удалось обновить избранное: ', err);
    }
  };

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(article.author.username);
        setIsFollowing(false);
        setArticle((prevArticle) => ({
          ...prevArticle,
          author: {
            ...prevArticle.author,
            following: false,
          },
        }));
      } else {
        await followUser(article.author.username);
        setIsFollowing(true);
        setArticle((prevArticle) => ({
          ...prevArticle,
          author: {
            ...prevArticle.author,
            following: true,
          },
        }));
      }
    } catch (err) {
      setError(err.response.data.errors.body);
      console.error('Не удалось обновить подписку: ', err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteArticle(slug);
      navigate('/');
    } catch (err) {
      console.error('Не удалось удалить статью: ', err);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Fade in={!isLoading}>
          <Box>
            <Box sx={{ p: '2rem 0', bgcolor: 'secondary.dark' }}>
              <Container maxWidth="lg">
                <Typography
                  variant="h3"
                  color="secondary"
                  sx={{ mb: '2rem', wordWrap: 'break-word' }}
                >
                  {article?.title}
                </Typography>
                <ArticleActions
                  article={article}
                  onFavorite={handleFavorite}
                  isFavorited={isFavorited}
                  onDelete={handleDelete}
                  isAuthor={isAuthor}
                  isFollowing={isFollowing}
                  onFollow={handleFollow}
                />
              </Container>
            </Box>
            <Container maxWidth="lg" sx={{ mt: '2rem' }}>
              <ArticleContent article={article} />
              <hr />
              <CommentsSection slug={slug} />
            </Container>
          </Box>
        </Fade>
      )}
    </Box>
  );
};

export default ArticlePage;
