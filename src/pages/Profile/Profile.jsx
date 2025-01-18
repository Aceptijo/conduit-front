import {Link, NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useProfileStore from "../../store/profileStore.js";
import useAuthStore from "../../store/authStore.js";

const Profile = () => {
  const {user} = useAuthStore();
  const {username} = useParams();
  const [activeTab, setActiveTab] = useState("author");
  const {
    profile,
    articles,
    isLoading,
    fetchProfile,
    fetchArticles,
    followUser,
    unfollowUser
  } = useProfileStore();

  useEffect(() => {
    fetchProfile(username);
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
              <img src={profile?.image || "https://avatar.iran.liara.run/public/48"}
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
                <div key={article.slug} className="article-preview">
                  <div className="article-meta">
                    <Link to={`/profile/${article.author.username}`}>
                      <img src={article.author.image || "https://avatar.iran.liara.run/public/48"}
                           alt={article.author.username}/>
                    </Link>
                    <div className="info">
                      <Link to={`/profile/${article.author.username}`} className="author">
                        {article.author.username}
                      </Link>
                      <span className="date">{new Date(article.createdAt).toDateString()}</span>
                    </div>
                    <button className="btn btn-outline-primary btn-sm pull-xs-right">
                      <i className="ion-heart"></i> {article.favoritesCount}
                    </button>
                  </div>
                  <NavLink to={`/article/${article.slug}`} className="preview-link">
                    <h1>{article.title}</h1>
                    <p>{article.description}</p>
                    <span>Read more...</span>
                  </NavLink>
                </div>
              ))
            )}

            {/*<ul className="pagination">*/}
            {/*   <li className="page-item active">*/}
            {/*      <a className="page-link" href="">1</a>*/}
            {/*   </li>*/}
            {/*   <li className="page-item">*/}
            {/*      <a className="page-link" href="">2</a>*/}
            {/*   </li>*/}
            {/*</ul>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;