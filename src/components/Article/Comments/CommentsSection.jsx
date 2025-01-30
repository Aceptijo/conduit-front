import { useEffect, useState } from 'react';
import { addComment, deleteComment, getComments } from '../../../api/articles.js';
import useAuthStore from '../../../store/authStore.js';
import { Link } from 'react-router-dom';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';

const CommentsSection = ({ slug }) => {
  const { user } = useAuthStore();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getComments(slug);
        setComments(fetchedComments);
      } catch (err) {
        console.error(`Не удалось загрузить комментарии: `, err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, [slug]);

  const handleAddComment = async (event) => {
    event.preventDefault();
    if (!newComment.trim()) return;

    try {
      const addedComment = await addComment(slug, newComment);
      setComments((prev) => [addedComment, ...prev]);
      setNewComment('');
    } catch (err) {
      console.error('Не удалось добавить комментарий: ', err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(slug, commentId);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (err) {
      console.error('Не удалось удалить комментарий: ', err);
    }
  };

  if (isLoading) return <div>Загрузка комментариев...</div>;

  return (
    <Box>
      <Box
        maxWidth="66.6%"
        sx={{ ml: '16.6%', display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        {user ? (
          <Box component="form" sx={{ padding: '1rem', bgcolor: 'secondary.dark' }}>
            <TextField
              id="outlined-basic"
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
              multiline
              rows={3}
              label="Write a comment"
              fullWidth
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                pt: '1rem',
              }}
            >
              <Avatar src={user.image || 'broken-image.jpg'} />
              <Button onClick={handleAddComment}>Post comment</Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
            <Typography
              variant="subtitle1"
              component={Link}
              to={`/login`}
              color="primary"
              sx={{ textDecoration: 'none' }}
            >
              Login
            </Typography>
            <Typography variant="subtitle1" color="secondary">
              or
            </Typography>
            <Typography
              variant="subtitle1"
              component={Link}
              to={`/register`}
              color="primary"
              sx={{ textDecoration: 'none' }}
            >
              Register
            </Typography>
            <Typography variant="subtitle1" color="secondary">
              to add comments.
            </Typography>
          </Box>
        )}
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <Box sx={{ width: '100%', bgcolor: 'secondary.dark' }} key={index}>
              <Typography
                variant="body1"
                noWrap={false}
                color="secondary"
                sx={{ padding: '1rem', overflowWrap: 'break-word', wordWrap: 'break-word' }}
              >
                {comment.body}
              </Typography>
              <Box
                sx={{
                  bgcolor: 'secondary.main',
                  padding: '0.5rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <Avatar
                  component={Link}
                  to={`/profile/${comment.author.username}`}
                  src={comment.author.image || 'broken-image.jpg'}
                />
                <Typography
                  variant="subtitle2"
                  component={Link}
                  to={`/profile/${comment.author.username}`}
                  color="primary"
                  sx={{ textDecoration: 'none' }}
                >
                  {comment.author.username}
                </Typography>
                <Typography variant="subtitle2" color="secondary">
                  {new Date(comment.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Typography>
                {user && user.username === comment.author?.username && (
                  <Button
                    variant="outlined"
                    onClick={() => handleDeleteComment(comment.id)}
                    startIcon={<DeleteOutlined />}
                    color="error"
                    sx={{ ml: 'auto' }}
                  >
                    Delete
                  </Button>
                )}
              </Box>
            </Box>
          ))
        ) : (
          <Typography align="center" color="primary">
            No comment yet
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CommentsSection;
