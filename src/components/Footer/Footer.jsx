import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" color="primary" sx={{ bgcolor: 'transparent' }}>
      <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Typography
          variant="caption"
          component="a"
          href="/"
          color="primary"
          sx={{ textDecoration: 'none' }}
        >
          conduit
        </Typography>
        <Typography variant="caption" component="span" color="secondary.light">
          An interactive learning project from
          <Typography
            variant="caption"
            component="a"
            href="https://thinkster.io"
            color="primary"
            sx={{ textDecoration: 'none' }}
          >
            {` Thinkster`}
          </Typography>
          . Code design licensed under MIT.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
