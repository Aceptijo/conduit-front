import useArticleStore from '../store/articleStore.js';
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance.js';
import { useNavigate, useParams } from 'react-router-dom';
import { getArticle } from '../api/articles.js';
import { Box, Button, Chip, Container, TextField, Typography } from '@mui/material';

const AddArticlePage = () => {
  const {
    title,
    description,
    body,
    tags,
    setTitle,
    setDescription,
    setBody,
    setTags,
    addTag,
    removeTag,
    resetForm,
  } = useArticleStore();

  const { slug } = useParams();
  const navigate = useNavigate();
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setTitle('');
    setDescription('');
    setBody('');
    setTags([]);
  }, [slug]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (slug) {
        try {
          const response = await getArticle(slug);
          setTitle(response.title);
          setDescription(response.description);
          setBody(response.body);
          setTags(response.tagList);
        } catch (err) {
          console.error('Не удалось загрузить статью: ', err);
        }
      }
    };
    fetchArticle();
  }, [slug, setTitle, setDescription, setBody, setTags]);

  const handlePublish = async () => {
    try {
      if (slug) {
        await axiosInstance.put(`/articles/${slug}`, {
          article: { title, description, body, tagList: tags },
        });
        navigate(`/article/${slug}`);
        resetForm();
      } else {
        await axiosInstance.post('/articles', {
          article: { title, description, body, tagList: tags },
        });
        resetForm();
      }
    } catch (err) {
      console.error('Ошибка при сохранении стьатьи: ', err);
      setError('Не получилось добавить статью');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" color="primary" align="center" sx={{ p: '1rem 0' }}>
        {slug ? 'Update article' : 'Add new article'}
      </Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <TextField
          label="ArticlePage Title"
          fullWidth
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          label="What's this article about?"
          fullWidth
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <TextField
          label="Write your article (in markdown)"
          fullWidth
          multiline
          rows={7}
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
        <TextField
          label="Enter tags"
          variant="standard"
          fullWidth
          value={tagInput}
          onChange={(event) => setTagInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && tagInput.trim() && !tags.includes(tagInput)) {
              addTag(tagInput.trim());
              setTagInput('');
            }
          }}
        />
        <Box sx={{ display: 'flex', gap: '5px' }}>
          {tags.map((tag, index) => (
            <Chip label={tag} key={index} onDelete={() => removeTag(tag)} color="secondary" />
          ))}
        </Box>
        <Button
          variant="contained"
          sx={{ alignSelf: 'end', p: '0.75rem 1.25rem' }}
          onClick={() => handlePublish()}
        >
          {slug ? 'Update Article' : 'Publish Article'}
        </Button>
      </Box>
    </Container>
  );
};

export default AddArticlePage;
