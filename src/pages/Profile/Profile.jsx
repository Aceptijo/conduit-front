import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {followUser, getUserProfile, unfollowUser} from "../../api/user.js";
import {getUserArticles} from "../../api/articles.js";

const Profile = () => {
   const {username} = useParams();
   const [profile, setProfile] = useState(null);
   const [articles, setArticles] = useState([]);
   const [activeTab, setActiveTab] = useState("author");
   const [loadingProfile, setLoadingProfile] = useState(true);
   const [loadingArticles, setLoadingArticles] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchProfile = async () => {
         try {
            const userProfile = await getUserProfile(username);
            setProfile(userProfile)

         } catch (err) {
            setError('Не удалось загрузить профиль')
         } finally {
            setLoadingProfile(false);
         }
      }
      fetchProfile()
   }, [username]);

   useEffect(() => {
      const fetchArticles = async () => {
         try {
            setLoadingArticles(true)
            const userArticles = await getUserArticles(username, activeTab);
            setArticles(userArticles);

         } catch (err) {
            setError('Статей нет')
         } finally {
            setLoadingArticles(false);
         }
      }
      fetchArticles()
   }, [username, activeTab]);

   const handleFollow = async () => {
      try {
         const updateProfile = profile.following
            ? await unfollowUser(username)
            : await followUser(username)
         setProfile(updateProfile)
      } catch (err) {
         setError('Не получилось изменить статус подписки')
      }
   }


   if (loadingProfile) return <div>Загрузка...</div>
   if (error) return <div>{error}</div>

   return (
      <div className="profile-page">
         <div className="user-info">
            <div className="container">
               <div className="row">
                  <div className="col-xs-12 col-md-10 offset-md-1">
                     <img src={profile.image || "https://avatar.iran.liara.run/public/48"}
                          className="user-img"/>
                     <h4>{profile.username}</h4>
                     <p>{profile.bio || "Описание отсутствует"}</p>
                     <button
                        className="btn btn-sm btn-outline-secondary action-btn"
                        onClick={handleFollow}
                     >
                        <i className="ion-plus-round"></i>
                        {profile.following
                           ? `Unfollow ${profile.username}`
                           : `Follow ${profile.username}`}
                     </button>
                     {/*<button className="btn btn-sm btn-outline-secondary action-btn">*/}
                     {/*   <i className="ion-gear-a"></i>*/}
                     {/*   &nbsp; Edit Profile Settings*/}
                     {/*</button>*/}
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

                  {loadingArticles ? (
                     <div>Загрузка статей...</div>
                  ) : (
                     articles.map(article => (
                        <div key={article.slug} className="article-preview">
                           <div className="article-meta">
                              <a href={`/profile/${article.author.username}`}>
                                 <img src={article.author.image} alt={article.author.username}/>
                              </a>
                              <div className="info">
                                 <a href={`/profile/${article.author.username}`} className="author">
                                    {article.author.username}
                                 </a>
                                 <span className="date">{new Date(article.createdAt).toDateString()}</span>
                              </div>
                              <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                 <i className="ion-heart"></i> {article.favoritesCount}
                              </button>
                           </div>
                           <a href={`/article/${article.slug}`} className="preview-link">
                              <h1>{article.title}</h1>
                              <p>{article.description}</p>
                              <span>Read more...</span>
                           </a>
                        </div>
                     ))
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Profile;