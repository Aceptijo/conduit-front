import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useTagsStore from '../store/tagsStore.js';
import ArticlePreview from '../components/Article/ArticlePreview.jsx';
import LeftIcon from '../components/icons/LeftIcon/LeftIcon.jsx';
import RightIcon from '../components/icons/RightIcon/RightIcon.jsx';
import useArticlesStore from '../store/articlesStore.js';
import { Box, Container, List, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

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
  const tag = queryParams.get('tag');

  useEffect(() => {
    if (activeTab === 'global' || activeTab === 'feed') {
      const offset = currentPage - 1;
      fetchGlobalArticles(activeTab, articlePerPage, offset);
    }
  }, [activeTab, currentPage]);

  const handleTagClick = (selectedTag) => {
    setActiveTab(selectedTag);
    navigate(`/?tag=${selectedTag}`);
    const offset = currentPage - 1;
    fetchArticlesByTag(selectedTag, articlePerPage, offset);
  };

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTabChange = (event, tab) => {
    setActiveTab(tab);
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
          <ToggleButtonGroup
            value={activeTab}
            exclusive
            onChange={handleTabChange}
            aria-label="articles list"
            sx={{ padding: '0 16px' }}
          >
            <ToggleButton
              value="global"
              component={Link}
              to="/?feed=global"
              aria-label="global articles"
              color="primary"
            >
              Global Feed
            </ToggleButton>
            <ToggleButton
              value="feed"
              component={Link}
              to="/?feed=your"
              aria-label="your articles"
              color="primary"
            >
              Your Feed
            </ToggleButton>
            {tag && (
              <ToggleButton
                value={tag}
                components={Link}
                to={`/?tag=${tag}`}
                aria-label="article by tag"
                color="primary"
              >
                {tag}
              </ToggleButton>
            )}
          </ToggleButtonGroup>
          <List sx={{ width: '100%' }}>
            {isLoading ? (
              <div>Загрузка статей...</div>
            ) : (
              articles.map((article, index) => (
                <ArticlePreview article={article} key={article.slug + index} />
              ))
            )}
          </List>
        </Box>
        <div className="col-md-3">
          <div className="sidebar">
            <p>Popular Tags</p>
            {isLoadingTags ? (
              <div>Загрузка тэгов...</div>
            ) : (
              <div className="tag-list">
                {tags?.map((tagItem) => (
                  <Link
                    to={`/?tag=${tagItem}`}
                    onClick={() => {
                      handleTagClick(tagItem);
                    }}
                    key={tagItem}
                    className="tag-pill tag-default"
                  >
                    {tagItem}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {/*{isLoading ? (*/}
            {/*  <div>Загрузка статей...</div>*/}
            {/*) : (*/}
            {/*  articles.map((article, index) => (*/}
            {/*    <ArticlePreview article={article} key={article.slug + index} />*/}
            {/*  ))*/}
            {/*)}*/}

            <ul className="pagination">
              {currentPage > 1 && (
                <li className="page-item">
                  <a
                    className="page-link arrow"
                    href="#"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <LeftIcon />
                  </a>
                </li>
              )}
              {currentPage > 2 && (
                <li className="page-item">
                  <a className="page-link" href="#" onClick={() => handlePageChange(1)}>
                    1
                  </a>
                </li>
              )}
              {currentPage > 3 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}

              {Array.from({ length: 3 }).map((_, index) => {
                const page = currentPage - 1 + index;
                if (page > 0 && page <= totalPages) {
                  return (
                    <li className={`page-item ${currentPage === page ? 'active' : ''}`} key={page}>
                      <a className="page-link" href="#" onClick={() => handlePageChange(page)}>
                        {page}
                      </a>
                    </li>
                  );
                }
                return null;
              })}

              {currentPage < totalPages - 2 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}

              {currentPage < totalPages - 1 && (
                <li className="page-item">
                  <a href="#" className="page-link" onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                  </a>
                </li>
              )}

              {currentPage < totalPages && (
                <li className="page-item">
                  <a
                    href="#"
                    className="page-link arrow"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    <RightIcon />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
