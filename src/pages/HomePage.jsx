import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosInstance from "../utils/axiosInstance.js";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("global");
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [articlePerPage] = useState(4);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const offset = (currentPage - 1) * articlePerPage;
        const endpoint = activeTab === "global" ? "/articles" : "/articles/feed";
        const response = await axiosInstance.get(endpoint, {
          params: {
            limit: articlePerPage,
            offset,
          }
        });
        setArticles(response.data.articles);
        setTotalPages(Math.ceil(response.data.articlesCount / articlePerPage) - 317);
      } catch (err) {
        console.error("Не удалось загрузить статьи: ", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchArticles();
  }, [activeTab, currentPage, articlePerPage]);

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
                <div className="article-preview" key={article.slug}>
                  <div className="article-meta">
                    <Link to={`/profile/${article.author.username}`}>
                      <img
                        src={article.author.image || "https://avatar.iran.liara.run/public/12"}
                        alt={article.author.username}/>
                    </Link>
                    <div className="info">
                      <Link to={`/profile/${article.author.username}`} className="author">
                        {article.author.username}
                      </Link>
                      <span
                        className="date">{new Date(article.createdAt).toLocaleDateString()}</span>
                    </div>
                    <button className="btn btn-outline-primary btn-sm pull-xs-right">
                      <i className="ion-heart"></i>
                      {article.favoritesCount}
                    </button>
                  </div>
                  <Link to={`/article/${article.slug}`} className="preview-link">
                    <h1>{article.title}</h1>
                    <p>{article.description}</p>
                    <span>Read more...</span>
                    <ul className="tag-list">
                      {article.tagList.map((tag, index) => (
                        <li className="tag-default tag-pill tag-outline" key={index}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </Link>
                </div>
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

              <div className="tag-list">
                <a href="" className="tag-pill tag-default">programming</a>
                <a href="" className="tag-pill tag-default">javascript</a>
                <a href="" className="tag-pill tag-default">emberjs</a>
                <a href="" className="tag-pill tag-default">angularjs</a>
                <a href="" className="tag-pill tag-default">react</a>
                <a href="" className="tag-pill tag-default">mean</a>
                <a href="" className="tag-pill tag-default">node</a>
                <a href="" className="tag-pill tag-default">rails</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;