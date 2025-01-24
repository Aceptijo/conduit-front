import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useTagsStore from '../store/tagsStore.js';
import ArticlePreview from '../components/Article/ArticlePreview.jsx';
import '/src/styles/global.css';
import LeftIcon from '../components/icons/LeftIcon/LeftIcon.jsx';
import RightIcon from '../components/icons/RightIcon/RightIcon.jsx';
import useArticlesStore from '../store/articlesStore.js';

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
            ) : (
              articles.map((article, index) => (
                <ArticlePreview article={article} key={article.slug + index} />
              ))
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
