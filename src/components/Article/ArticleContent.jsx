import { Box, Chip, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

marked.setOptions({
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: true,
  xhtml: false,
});

const ArticleContent = ({ article }) => {
  const createMarkup = (markdown) => {
    if (!markdown) return { __html: '' };
    const html = marked.parse(markdown);
    const sanitizedHtml = DOMPurify.sanitize(html);
    return { __html: sanitizedHtml };
  };

  return (
    <Box>
      <Typography
        dangerouslySetInnerHTML={createMarkup(article?.body)}
        variant="body1"
        component="div"
        sx={{
          wordWrap: 'break-word',
          '& h2': { color: 'primary.main' },
          '& h3': { color: 'primary.main' },
          '& p': { color: 'secondary.main' },
          // '& strong': { color: 'white' },
          '& ul': { color: 'secondary.main' },
          '& li': { color: 'secondary.main' },
          '& code': {
            color: 'secondary.main',
          },
        }}
      />
      <Box>
        <Stack
          spacing={5}
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'end', gap: '5px' }}
        >
          {article?.tagList.map((tag, index) => (
            <Chip
              label={tag}
              key={index}
              clickable
              color="secondary.dark"
              size="small"
              variant="filled"
              sx={{ color: 'secondary.light' }}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default ArticleContent;
