import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useProfileStore from "../store/profileStore.js";
import useAuthStore from "../store/authStore.js";
import ArticlePreview from "../components/Article/ArticlePreview.jsx";

const ProfilePage = () => {
  const {user} = useAuthStore();
  const {username} = useParams();
  const [activeTab, setActiveTab] = useState("author");
  const [articlesPerPage] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    profile,
    articles,
    isLoading,
    fetchProfile,
    fetchArticles,
    followUser,
    unfollowUser,
    setProfile,
  } = useProfileStore();

  useEffect(() => {
    if (user && user.username === username) {
      setProfile(user);
    } else {
      fetchProfile(username);
    }
    fetchArticles(username, activeTab);
  }, [username, activeTab, fetchProfile, fetchArticles]);

  const handleFollow = async () => {
    profile.following ? unfollowUser(username) : followUser(username);
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={profile?.image || "https://avatar.iran.liara.run/public/12"}
                   className="user-img"/>
              <h4>{profile?.username}</h4>
              <p>{profile?.bio || "Описание отсутствует"}</p>
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
              articles.map(article => (
                <ArticlePreview article={article} key={article.slug}/>
              ))
            )}

            <ul className="pagination">
              <li className="page-item active">
                <a className="page-link" href="">1</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="">2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;