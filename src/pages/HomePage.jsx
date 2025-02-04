import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useTagsStore from '../store/tagsStore.js';
import ArticlePreview from '../components/Article/ArticlePreview.jsx';
import useArticlesStore from '../store/articlesStore.js';
import {
  Box,
  Chip,
  Container,
  Pagination,
  PaginationItem,
  Skeleton,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import useAuthStore from '../store/authStore.js';

const HomePage = () => {
  const { articles, totalPages, fetchGlobalArticles, fetchArticlesByTag, isLoading } =
    useArticlesStore();
  const { user } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tagFromUrl = queryParams.get('tag');
  const tabFromUrl = queryParams.get('feed') || 'global';
  const pageFromUrl = parseInt(queryParams.get('page'), 10) || 1;
  const { tags, isLoadingTags, fetchTags } = useTagsStore();
  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [articlePerPage] = useState(4);

  useEffect(() => {
    setActiveTab(tabFromUrl);
  }, [tabFromUrl]);

  useEffect(() => {
    if (tagFromUrl) {
      setActiveTab('tag');
      const offset = currentPage - 1;
      fetchArticlesByTag(tagFromUrl, articlePerPage, offset);
    }
  }, [tagFromUrl, currentPage]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  useEffect(() => {
    if (activeTab === 'global' || activeTab === 'your') {
      const offset = currentPage - 1;
      fetchGlobalArticles(activeTab, articlePerPage, offset);
    }
  }, [activeTab, currentPage]);

  const handleTagClick = (selectedTag) => {
    navigate(`/?feed=tag&tag=${selectedTag}`);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleTabChange = (event, tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          padding: '2rem',
          bgcolor: 'secondary.dark',
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          mt: '4rem',
          zIndex: -1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          maxWidth="lg"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" component="h1" color="primary" sx={{ pb: '0.5rem' }}>
            conduit
          </Typography>
          <Typography variant="h5" component="p" color="primary">
            A place to share your knowledge.
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '12.5rem' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '72%' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab value="global" label="Global Feed" component={Link} to={`/?feed=global`} />
            {user && <Tab value="your" label="Your Feed" component={Link} to={`/?feed=your`} />}
            {tagFromUrl && (
              <Tab
                value="tag"
                label={tagFromUrl}
                component={Link}
                to={`/?feed=tag&tag=${tagFromUrl}`}
              />
            )}
          </Tabs>
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  variant="rounded"
                  height={212}
                  key={index}
                  animation="wave"
                  sx={{ bgcolor: 'secondary', mb: '1rem' }}
                />
              ))
            : articles?.map((article, index) => (
                <ArticlePreview article={article} handleTagClick={handleTagClick} key={index} />
              ))}

          <Pagination
            page={currentPage}
            count={totalPages}
            onChange={handlePageChange}
            color="primary"
            sx={{ display: 'flex', justifyContent: 'center', mt: '24px' }}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={
                  tagFromUrl
                    ? `/?feed=${activeTab}&tag=${tagFromUrl}${item.page === 1 ? '' : `&page=${item.page}`}`
                    : `/?feed=${activeTab}${item.page === 1 ? '' : `&page=${item.page}`}`
                }
                {...item}
              />
            )}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            maxWidth: '25%',
            width: '100%',
            flexDirection: 'column',
            p: '5px 16px',
          }}
        >
          <Typography variant="h6" color="primary" sx={{ mb: '10px' }}>
            Popular Tags
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '5px',
            }}
          >
            {isLoadingTags
              ? Array.from({ length: tags.length || 99 }).map((_, index) => (
                  <Skeleton
                    variant="rounded"
                    width={55}
                    height={24}
                    key={index}
                    sx={{ bgcolor: 'secondary', borderRadius: '16px' }}
                  />
                ))
              : tags.map((tagItem) => (
                  <Chip
                    component={Link}
                    to={`/?feed=tag&tag=${tagItem}`}
                    label={tagItem}
                    key={tagItem}
                    size="small"
                    color="secondary.dark"
                    onClick={() => handleTagClick(tagItem)}
                    sx={{ color: 'secondary.light' }}
                    clickable
                  />
                ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
