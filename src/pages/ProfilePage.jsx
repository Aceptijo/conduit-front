import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useProfileStore from '../store/profileStore.js';
import useAuthStore from '../store/authStore.js';
import ArticlePreview from '../components/Article/ArticlePreview.jsx';
import useArticlesStore from '../store/articlesStore.js';
import LeftIcon from '../components/icons/LeftIcon/LeftIcon.jsx';
import RightIcon from '../components/icons/RightIcon/RightIcon.jsx';

const ProfilePage = () => {
  const { user } = useAuthStore();
  const { profile, isLoading, fetchProfile, followUser, unfollowUser, setProfile } =
    useProfileStore();
  const { articles, fetchArticles, articlesCount } = useArticlesStore();
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState('author');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;
  const totalPages = Math.ceil(articlesCount / articlesPerPage);

  useEffect(() => {
    if (user.username === username) {
      setProfile(user);
    } else {
      fetchProfile(username);
    }
    const offset = currentPage - 1;
    fetchArticles(username, activeTab, offset, articlesPerPage);
  }, [username, activeTab, fetchProfile, currentPage, setProfile, user]);

  const handleFollow = async () => {
    profile.following ? unfollowUser(username) : followUser(username);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img
                src={
                  profile?.image ||
                  `https://api.dicebear.com/6.x/micah/svg?seed=${encodeURIComponent(profile?.author?.username)}`
                }
                className="user-img"
                alt={'profile image'}
              />
              <h4>{profile?.username}</h4>
              <p>{profile?.bio || 'Описание отсутствует'}</p>
              {user && user.username === profile?.username ? (
                <Link to={'/settings'} className="btn btn-sm btn-outline-secondary action-btn">
                  Edit Profile Settings
                </Link>
              ) : (
                <button
                  className="btn btn-sm btn-outline-secondary action-btn"
                  onClick={handleFollow}
                >
                  {profile?.following
                    ? `Unfollow ${profile?.username}`
                    : `Follow ${profile?.username}`}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 'author' ? 'active' : ''}`}
                    onClick={() => setActiveTab('author')}
                  >
                    My Articles
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 'favorited' ? 'active' : ''}`}
                    onClick={() => setActiveTab('favorited')}
                  >
                    Favorited Articles
                  </a>
                </li>
              </ul>
            </div>

            {isLoading ? (
              <div>Загрузка статей...</div>
            ) : (
              articles?.map((article) => <ArticlePreview article={article} key={article.slug} />)
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
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
