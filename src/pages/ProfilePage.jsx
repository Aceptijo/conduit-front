import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useProfileStore from '../store/profileStore.js';
import useAuthStore from '../store/authStore.js';
import ArticlePreview from '../components/Article/ArticlePreview.jsx';

const ProfilePage = () => {
  const { user } = useAuthStore();
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState('author');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;
  const {
    profile,
    articles,
    isLoading,
    fetchProfile,
    fetchArticles,
    followUser,
    unfollowUser,
    setProfile,
    articlesCount,
  } = useProfileStore();
  const totalPages = Math.ceil(articlesCount / articlesPerPage);
  const pageNumber = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    if (user && user.username === username) {
      setProfile(user);
    } else {
      fetchProfile(username);
    }
    const offset = currentPage - 1;
    fetchArticles(username, activeTab, offset, articlesPerPage);
  }, [username, activeTab, fetchProfile, fetchArticles, currentPage]);

  const handleFollow = async () => {
    profile.following ? unfollowUser(username) : followUser(username);
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
                  <i className="ion-gear-a"></i>
                  Edit Profile Settings
                </Link>
              ) : (
                <button
                  className="btn btn-sm btn-outline-secondary action-btn"
                  onClick={handleFollow}
                >
                  <i className="ion-plus-round"></i>
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
              articles.map((article) => <ArticlePreview article={article} key={article.slug} />)
            )}

            <ul className="pagination">
              {pageNumber.map((page) => (
                <li className={`page-item ${currentPage === page ? 'active' : ''}`} key={page}>
                  <button className="page-link" onClick={() => setCurrentPage(page)}>
                    {page}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
