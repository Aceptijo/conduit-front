import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosInstance from "../utils/axiosInstance.js";
import useTagsStore from "../store/tagsStore.js";
import ArticlePreview from "../components/Article/ArticlePreview.jsx";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("global");
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [articlePerPage] = useState(4);
  const {tags, isLoadingTags, fetchTags} = useTagsStore();

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const offset = (currentPage - 1);
        const endpoint = activeTab === "global" ? "/articles" : "/articles/feed";
        const response = await axiosInstance.get(endpoint, {
          params: {
            limit: articlePerPage,
            offset,
          }
        });
        setArticles(response.data.articles);
        setTotalPages(Math.ceil(response.data.articlesCount / articlePerPage));
      } catch (err) {
        console.error("Не удалось загрузить статьи: ", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchArticles();
  }, [activeTab, currentPage, articlePerPage]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const handleFavoriteToggle = (updatedArticle) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.slug === updatedArticle.slug ? updatedArticle : article)
    )
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

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
                  <a
                    className={`nav-link ${activeTab === 'global' ? 'active' : ''}`}
                    onClick={() => setActiveTab('global')}
                  >
                    Global Feed
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 'feed' ? 'active' : ''}`}
                    onClick={() => setActiveTab('feed')}
                  >
                    Your Feed
                  </a>
                </li>
              </ul>
            </div>

            {isLoading ? (
              <div>Загрузка статей...</div>
            ) : (
              articles.map(article => (
                <ArticlePreview
                  article={article}
                  key={article.slug}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))
            )}


            <ul className="pagination">
              {Array.from({length: totalPages}).map((_, index) => (
                <li
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                  key={index}
                >
                  <a className="page-link" href="#" onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </a>
                </li>
              ))}


            </ul>
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              {isLoadingTags ? (
                <div>Загрузка тэгов...</div>
              ) : (
                <div className="tag-list">
                  {tags?.map(tag => (
                    <Link
                      to={`/?tag=${tag}`}
                      key={tag}
                      className="tag-pill tag-default"
                    >
                      {tag}
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