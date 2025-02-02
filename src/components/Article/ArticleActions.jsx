import { Link } from 'react-router-dom';
import { Avatar, Box, Button, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AddOutlined, FavoriteBorder, RemoveOutlined } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ArticleActions = ({
  article,
  onDelete,
  isFavorited,
  onFavorite,
  isAuthor,
  isFollowing,
  onFollow,
}) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Typography component={Link} to={`/profile/${article?.author.username}`}>
          <Avatar src={article?.author.image || 'broken-image.jpg'} />
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            component={Link}
            to={`/profile/${article?.author.username}`}
            color="primary"
            sx={{ textDecoration: 'none' }}
          >
            {article?.author.username}
          </Typography>
          <Typography component="span" variant="caption" color="secondary">
            {new Date(article?.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
        {!isAuthor && (
          <Button
            variant={isFollowing ? 'contained' : 'outlined'}
            startIcon={isFollowing ? <RemoveOutlined /> : <AddOutlined />}
            onClick={onFollow}
            color="secondary"
          >
            {isFollowing
              ? `Unfollow ${article?.author.username}`
              : `Follow ${article?.author.username}`}
          </Button>
        )}
        <Button
          variant={isFavorited ? 'contained' : 'outlined'}
          startIcon={isFavorited ? <FavoriteIcon /> : <FavoriteBorder />}
          onClick={onFavorite}
        >
          {isFavorited ? 'Unfavorite' : 'Favorite'}
        </Button>
        {isAuthor && (
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            color="secondary"
            component={Link}
            to={`/editor/${article.slug}`}
          >
            Edit Article
          </Button>
        )}
        {isAuthor && (
          <Button variant="outlined" startIcon={<DeleteIcon />} color="error" onClick={onDelete}>
            Delete Article
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ArticleActions;
