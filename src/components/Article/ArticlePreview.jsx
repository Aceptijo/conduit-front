import { Link } from 'react-router-dom';
import { addToFavorites, removeFromFavorites } from '../../api/articles.js';
import FavoriteIcon from '@mui/icons-material/Favorite';
import useArticlesStore from '../../store/articlesStore.js';
import { Avatar, Box, Button, Card, CardContent, Chip, Typography } from '@mui/material';
import { Stack } from '@mui/system';

const ArticlePreview = ({ article, handleTagClick }) => {
  const { favoriteToggle } = useArticlesStore();

  const handleFavorite = async () => {
    try {
      const updatedArticle = article.favorited
        ? await removeFromFavorites(article.slug)
        : await addToFavorites(article.slug);

      favoriteToggle(updatedArticle);
    } catch (err) {
      console.error('Не удалось изменить список избранных: ', err);
    }
  };

  return (
    <Card
      sx={{
        bgcolor: 'secondary.dark',
        width: '100%',
        mb: '1rem',
        boxShadow: 'none',
        borderRadius: '4px',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              sx={{ textTransform: 'none', borderRadius: '4px', p: '0.25rem 0.5rem' }}
              component={Link}
              to={`/profile/${article.author.username}`}
            >
              <Avatar
                src={article.author.image || 'broken-image.jpg'}
                alt={article.author.username}
                sx={{ mr: '10px' }}
              />
              <Box>
                <Typography alt={article.author.username} sx={{ fontSize: '16px' }}>
                  {article.author.username}
                </Typography>
                <Typography
                  component="span"
                  alt={new Date(article.createdAt)}
                  sx={{ fontSize: '12px' }}
                  color="secondary.light"
                >
                  {new Date(article.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button
              variant={article.favorited ? 'contained' : 'outlined'}
              onClick={handleFavorite}
              startIcon={<FavoriteIcon />}
              sx={{ mr: '8px' }}
              color="primary"
            >
              {article.favoritesCount}
            </Button>
          </Box>
        </Box>
        <Button
          component={Link}
          to={`/article/${article.slug}`}
          fullWidth
          sx={{
            textDecoration: 'none',
            fontSize: '20px',
            justifyContent: 'flex-start',
          }}
          color="secondary"
        >
          <Typography
            variant="h5"
            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {article.title}
          </Typography>
        </Button>
        <Typography variant="body1" color="secondary.light" sx={{ padding: '6px 8px' }}>
          {article.description}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 8px 0 8px',
          }}
        >
          <Stack direction="row" spacing={1}>
            {article.tagList.map((tag, index) => (
              <Chip
                component={Link}
                to={`/?tag=${tag}`}
                label={`${tag}`}
                size="small"
                key={index}
                color="secondary.dark"
                onClick={() => handleTagClick(tag)}
                clickable
                sx={{ color: 'secondary.light', border: 'none' }}
              />
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ArticlePreview;
