import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {addToFavorites, deleteArticle, getArticle, removeFromFavorites} from "../api/articles.js";
import ArticleActions from "../components/Article/ArticleActions.jsx";
import ArticleContent from "../components/Article/ArticleContent.jsx";
import useAuthStore from "../store/authStore.js";
import {followUser, unfollowUser} from "../api/user.js";

const ArticlePage = () => {
  const {slug} = useParams();
  const {user} = useAuthStore();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const isAuthor = user && user.username === article?.author?.username;

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await getArticle(slug);
        setArticle(response);
        setIsFavorited(response.favorited);
        setIsFollowing(response.author.following);
        setIsLoading(false);
      } catch (err) {
        console.error('Не удалось получить данные о статье: ', err)
      } finally {
        setIsLoading(false);
      }
    }
    fetchArticle();
  }, [slug]);

  const handleFavorite = async () => {
    try {
      if (isFavorited) {
        const updatedArticle = await removeFromFavorites(slug);
        setArticle(updatedArticle);
        setIsFavorited(false);
      } else {
        const updatedArticle = await addToFavorites(slug);
        setArticle(updatedArticle);
        setIsFavorited(true);
      }
    } catch (err) {
      console.error('Не удалось обновить избранное: ', err)
    }
  }

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        const updateArticle = await unfollowUser(article.author.username);
        setArticle(updateArticle);
        setIsFollowing(false);
      } else {
        const updateArticle = await followUser(article.author.username);
        setArticle(updateArticle);
        setIsFollowing(true);
      }
    } catch (err) {
      console.error('Не удалось обновить подписку: ', err);
    }
  }

  const handleDelete = async () => {
    try {
      await deleteArticle(slug);
      navigate('/');
    } catch (err) {
      console.error('Не удалось удалить статью: ', err)
    }
  }


  if (isLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article?.title}</h1>
          <div className="article-meta">
            <Link to={`/profile/${article?.author?.username}`}>
              <img src={article?.author?.image || "https://avatar.iran.liara.run/public/48"}/>
            </Link>
            <div className="info">
              <Link to={`/profile/${article?.author?.username}`} className="author">
                {article?.author?.username}
              </Link>
              <span className="date">
                {new Date(article?.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container page">
        <ArticleContent article={article}/>
        <ArticleActions
          article={article}
          onFavorite={handleFavorite}
          isFavorited={isFavorited}
          onDelete={handleDelete}
          isAuthor={isAuthor}
          isFollowing={isFollowing}
          onFollow={handleFollow}
        />
        <hr/>

        {/*<div className="article-actions">*/}
        {/*  <div className="article-meta">*/}
        {/*    <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg"/></a>*/}
        {/*    <div className="info">*/}
        {/*      <a href="" className="author">Eric Simons</a>*/}
        {/*      <span className="date">January 20th</span>*/}
        {/*    </div>*/}

        {/*    <button className="btn btn-sm btn-outline-secondary">*/}
        {/*      <i className="ion-plus-round"></i>*/}
        {/*      &nbsp; Follow Eric Simons*/}
        {/*    </button>*/}
        {/*    &nbsp;*/}
        {/*    <button className="btn btn-sm btn-outline-primary">*/}
        {/*      <i className="ion-heart"></i>*/}
        {/*      &nbsp; Favorite Article <span className="counter">(29)</span>*/}
        {/*    </button>*/}
        {/*    <button className="btn btn-sm btn-outline-secondary">*/}
        {/*      <i className="ion-edit"></i> Edit Article*/}
        {/*    </button>*/}
        {/*    <button className="btn btn-sm btn-outline-danger">*/}
        {/*      <i className="ion-trash-a"></i> Delete Article*/}
        {/*    </button>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/*<div className="row">*/}
        {/*  <div className="col-xs-12 col-md-8 offset-md-2">*/}
        {/*    <form className="card comment-form">*/}
        {/*      <div className="card-block">*/}
        {/*        <textarea className="form-control" placeholder="Write a comment..."*/}
        {/*                  rows="3"></textarea>*/}
        {/*      </div>*/}
        {/*      <div className="card-footer">*/}
        {/*        <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img"/>*/}
        {/*        <button className="btn btn-sm btn-primary">Post Comment</button>*/}
        {/*      </div>*/}
        {/*    </form>*/}

        {/*    <div className="card">*/}
        {/*      <div className="card-block">*/}
        {/*        <p className="card-text">*/}
        {/*          With supporting text below as a natural lead-in to additional content.*/}
        {/*        </p>*/}
        {/*      </div>*/}
        {/*      <div className="card-footer">*/}
        {/*        <a href="/profile/author" className="comment-author">*/}
        {/*          <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img"/>*/}
        {/*        </a>*/}
        {/*        &nbsp;*/}
        {/*        <a href="/profile/jacob-schmidt" className="comment-author">Jacob Schmidt</a>*/}
        {/*        <span className="date-posted">Dec 29th</span>*/}
        {/*      </div>*/}
        {/*    </div>*/}

        {/*    <div className="card">*/}
        {/*      <div className="card-block">*/}
        {/*        <p className="card-text">*/}
        {/*          With supporting text below as a natural lead-in to additional content.*/}
        {/*        </p>*/}
        {/*      </div>*/}
        {/*      <div className="card-footer">*/}
        {/*        <a href="/profile/author" className="comment-author">*/}
        {/*          <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img"/>*/}
        {/*        </a>*/}
        {/*        &nbsp;*/}
        {/*        <a href="/profile/jacob-schmidt" className="comment-author">Jacob Schmidt</a>*/}
        {/*        <span className="date-posted">Dec 29th</span>*/}
        {/*        <span className="mod-options">*/}
        {/*      <i className="ion-trash-a"></i>*/}
        {/*    </span>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default ArticlePage;