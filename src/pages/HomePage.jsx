import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useTagsStore from '../store/tagsStore.js';
import ArticlePreview from '../components/Article/ArticlePreview.jsx';
import useArticlesStore from '../store/articlesStore.js';
import {
  Box,
  Chip,
  Container,
  List,
  Pagination,
  PaginationItem,
  Skeleton,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';

const HomePage = () => {
  const { articles, totalPages, fetchGlobalArticles, fetchArticlesByTag, isLoading } =
    useArticlesStore();
  const { tags, isLoadingTags, fetchTags } = useTagsStore();
  const [activeTab, setActiveTab] = useState('global');
  const [currentPage, setCurrentPage] = useState(1);
  const [articlePerPage] = useState(4);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlTag = queryParams.get('tag');

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  useEffect(() => {
    if (urlTag) {
      setActiveTab(urlTag);
      const offset = currentPage - 1;
      fetchArticlesByTag(urlTag, articlePerPage, offset);
    }
  }, [urlTag, tags]);

  useEffect(() => {
    if (activeTab === 'global' || activeTab === 'feed') {
      const offset = currentPage - 1;
      fetchGlobalArticles(activeTab, articlePerPage, offset);
    }
  }, [activeTab, currentPage]);

  const handleTagClick = (selectedTag) => {
    setActiveTab(selectedTag);
    navigate(`/?tag=${selectedTag}`);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleTabChange = (event, tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="home-page">
      <Box sx={{ padding: '2rem', bgcolor: 'primary.main' }}>
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h2" component="h1" sx={{ pb: '0.5rem', fontWeight: 'bold' }}>
            conduit
          </Typography>
          <Typography variant="h5" component="p">
            A place to share your knowledge.
          </Typography>
        </Container>
      </Box>
      <Container
        maxWidth="lg"
        sx={{ mt: '1.5rem', display: 'flex', justifyContent: 'space-between' }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab value="global" label="Global Feed" component={Link} to={`/?global=feed`} />
            <Tab value="feed" label="Your Feed" component={Link} to={`/?your=feed`} />
            {urlTag && tags.includes(urlTag) && <Tab value={urlTag} label={urlTag} />}
          </Tabs>

          <List sx={{ width: '100%' }}>
            {isLoading ? (
              <Skeleton variant="rounded" height={211} animation="wave" />
            ) : (
              articles.map((article, index) => (
                <ArticlePreview article={article} key={article.slug + index} />
              ))
            )}
          </List>
          <Pagination
            page={currentPage}
            count={totalPages}
            onChange={handlePageChange}
            color="primary"
            sx={{ display: 'flex', justifyContent: 'center', mt: '24px' }}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/?${activeTab}=feed/inbox${item.page === 1 ? '' : `?page=${item.page}`}`}
                {...item}
              />
            )}
          />
        </Box>
        <Box sx={{ display: 'flex', maxWidth: '25%', flexDirection: 'column', p: '5px 16px' }}>
          <Typography variant="h6" color="primary" sx={{ m: '15px 0' }}>
            Popular Tags
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '5px',
            }}
          >
            {isLoadingTags ? (
              <div>Loading...</div>
            ) : (
              tags.map((tagItem) => (
                <Chip
                  component={Link}
                  to={`/?tag=${tagItem}`}
                  label={tagItem}
                  key={tagItem}
                  size="small"
                  color="secondary"
                  onClick={() => handleTagClick(tagItem)}
                  clickable
                />
              ))
            )}
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default HomePage;
