import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Chip, Container, LinearProgress, TextField, Typography } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import axiosInstance from '../utils/axiosInstance.js';
import { getArticle } from '../api/articles.js';
import ClearIcon from '@mui/icons-material/Clear';
import useSnackbarStore from '../store/snackbarStore.js';

const AddArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [articleData, setArticleData] = useState(null);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      tags: [],
      tagInput: '',
    },
  });
  const { fields, remove, append } = useFieldArray({ control, name: 'tags' });
  const { showSnackbar } = useSnackbarStore();

  useEffect(() => {
    const fetchArticle = async () => {
      if (slug) {
        setIsLoading(true);
        try {
          const article = await getArticle(slug);
          setArticleData(article);
          reset({
            title: article.title,
            description: article.description,
            body: article.body,
            tags: article.tagList.map((tag) => ({ name: tag })),
          });
        } catch (err) {
          console.error('Не удалось загрузить статью: ', err);
        } finally {
          setIsLoading(false);
        }
      } else {
        reset();
        setIsLoading(false);
      }
    };
    fetchArticle();
  }, [slug, reset]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const articleData = {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: fields.map((field) => field.name),
      };

      if (slug) {
        const response = await axiosInstance.put(`/articles/${slug}`, {
          article: articleData,
        });
        navigate(`/article/${response.data.article.slug}`);
      } else {
        await axiosInstance.post('/articles', {
          article: articleData,
        });
      }
      showSnackbar('The article has been published', 'success');
      reset();
    } catch (err) {
      console.error('Ошибка при сохранении стьатьи: ', err);
      setError(err.response.data.errors.body);
      showSnackbar(err.response.data.errors.body, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTag = () => {
    const tagInputValue = getValues('tagInput').trim();
    if (tagInputValue && !fields.some((field) => field.name === tagInputValue)) {
      append({ name: tagInputValue });
      setValue('tagInput', '');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" color="secondary" align="center" sx={{ p: '3rem 0' }}>
        {slug ? 'Update article' : 'Add new article'}
      </Typography>
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            mt: '10rem',
          }}
        >
          <Typography color="secondary">
            {slug ? 'Loading article for update' : 'The article is being published'}
          </Typography>
          <LinearProgress sx={{ width: '50%', alignSelf: 'center' }} />
        </Box>
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
        >
          <TextField
            error={!!errors.title}
            label="ArticlePage Title"
            variant="filled"
            fullWidth
            color="secondary"
            helperText={errors?.title?.message}
            {...register('title', {
              required: 'Title is required',
              minLength: {
                value: 10,
                message: 'Article title must be at least 10 characters long',
              },
              maxLength: {
                value: 80,
                message: 'Article title must be no more than 80 characters long',
              },
            })}
          />
          <TextField
            label="What's this article about?"
            variant="filled"
            fullWidth
            color="secondary"
            error={!!errors.description}
            helperText={errors?.description?.message}
            {...register('description', {
              required: 'Description is required',
              minLength: {
                value: 10,
                message: 'Description must be at least 10 characters long',
              },
              maxLength: {
                value: 80,
                message: 'Description must be no more than 80 characters long',
              },
            })}
          />
          <TextField
            label="Write your article (in markdown)"
            variant="filled"
            fullWidth
            color="secondary"
            multiline
            rows={7}
            error={!!errors.body}
            helperText={errors?.body?.message}
            sx={{
              '& .MuiInputBase-root': {
                resize: 'vertical',
                overflow: 'auto',
                minHeight: '194px',
                boxSizing: 'border-box',
              },
              '& textarea': {
                height: '100% !important',
              },
            }}
            {...register('body', {
              required: 'Content is required',
              minLength: {
                value: 10,
                message: 'Content must be at least 10 characters long',
              },
              maxLength: {
                value: 1000,
                message: 'Content must be no more than 1000 characters long',
              },
            })}
          />
          <TextField
            label="Enter tags (press Enter to add)"
            variant="filled"
            fullWidth
            color="secondary"
            error={!!errors.tagInput}
            helperText={errors.tagInput?.message}
            {...register('tagInput', {
              maxLength: {
                value: 10,
                message: 'Tag must be no more than 10 characters long',
              },
              minLength: {
                value: 1,
                message: 'Tag name must not be empty',
              },
            })}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && fields.length <= 4 && !errors.tagInput) {
                event.preventDefault();
                handleAddTag();
              }
            }}
          />
          <Box sx={{ display: 'flex', gap: '5px' }}>
            {fields.map((field, index) => (
              <Chip
                label={field.name}
                key={field.id}
                onDelete={() => remove(index)}
                color="secondary.light"
                sx={{ color: 'secondary.light', border: '1px solid' }}
                deleteIcon={<ClearIcon />}
                clickable
              />
            ))}
          </Box>
          <Button
            loading={isLoading}
            variant="contained"
            sx={{ alignSelf: 'end', p: '0.75rem 1.25rem' }}
            type="submit"
            disabled={!isValid}
          >
            {slug ? 'Update Article' : 'Publish Article'}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default AddArticlePage;
