import { Box, Chip, Typography } from '@mui/material';
import { Stack } from '@mui/system';

const ArticleContent = ({ article }) => {
  return (
    <Box>
      <Typography variant="body1" color="secondary">
        {article.body}
      </Typography>
      <Box>
        <Stack
          spacing={5}
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'end', gap: '5px' }}
        >
          {article.tagList.map((tag, index) => (
            <Chip
              label={tag}
              key={index}
              clickable
              color="secondary"
              size="small"
              variant="filled"
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default ArticleContent;
