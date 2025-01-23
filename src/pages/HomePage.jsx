import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance.js';
import useTagsStore from '../store/tagsStore.js';
import ArticlePreview from '../components/Article/ArticlePreview.jsx';
import '/src/styles/global.css';
import LeftIcon from '../components/icons/LeftIcon/LeftIcon.jsx';
import RightIcon from '../components/icons/RightIcon/RightIcon.jsx';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('global');
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [articlePerPage] = useState(4);
  const { tags, isLoadingTags, fetchTags } = useTagsStore();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tag = queryParams.get('tag');

  const fetchArticleByTags = async (selectedTag) => {
    setIsLoading(true);
    setArticles([]);
    try {
      const offset = currentPage - 1;
      const endpoint = `/articles/?tag=${selectedTag}`;
      const response = await axiosInstance.get(endpoint, {
        limit: articlePerPage,
        offset,
      });
      setArticles(response.data.articles);
      setTotalPages(Math.ceil(response.data.articlesCount / articlePerPage));
    } catch (err) {
      console.error('Не удалось отсортировать статьи по тэгу: ', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchArticles = async () => {
    setIsLoading(true);
    setArticles([]);
    try {
      const offset = currentPage - 1;
      const endpoint = activeTab === 'global' ? '/articles' : '/articles/feed';
      const response = await axiosInstance.get(endpoint, {
        params: {
          limit: articlePerPage,
          offset,
        },
      });
      setArticles(response.data.articles);
      setTotalPages(Math.ceil(response.data.articlesCount / articlePerPage));
    } catch (err) {
      console.error('Не удалось загрузить статьи: ', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (tag === activeTab) {
      setActiveTab(tag);
      fetchArticleByTags(tag);
    } else {
      fetchArticles();
    }
  }, [activeTab, currentPage, articlePerPage, tag]);

  const handleFavoriteToggle = (updatedArticle) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.slug === updatedArticle.slug ? updatedArticle : article
      )
    );
  };

  const handleTagClick = (selectedTag) => {
    setActiveTab(selectedTag);
    navigate(`/?tag=${selectedTag}`);
    fetchArticleByTags(selectedTag);
  };

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${activeTab === 'global' ? 'active' : ''}`}
                    onClick={() => setActiveTab('global')}
                    to="/?feed=global"
                  >
                    Global Feed
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${activeTab === 'feed' ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab('feed');
                      setCurrentPage(1);
                    }}
                    to="/?feed=your"
                  >
                    Your Feed
                  </Link>
                </li>
                {tag && (
                  <li className="nav-item" key={tag}>
                    <Link
                      className={`nav-link ${activeTab === tag ? 'active' : ''}`}
                      onClick={() => handleTagClick(tag)}
                      to={`/?tag=${tag}`}
                    >
                      {tag}
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            {isLoading ? (
              <div>Загрузка статей...</div>
            ) : articles.length > 0 ? (
              articles.map((article, index) => (
                <ArticlePreview
                  article={article}
                  key={article.slug + index}
                  onFavoriteToggle={handleFavoriteToggle}
                  handleTagClick={handleTagClick}
                />
              ))
            ) : (
              <div>Статьи не найдены.</div>
            )}

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
        </div>
      </div>
    </div>
  );
};

export default HomePage;
