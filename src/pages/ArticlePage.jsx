import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addToFavorites, deleteArticle, getArticle, removeFromFavorites } from '../api/articles.js';
import ArticleActions from '../components/Article/ArticleActions.jsx';
import ArticleContent from '../components/Article/ArticleContent.jsx';
import useAuthStore from '../store/authStore.js';
import { followUser, unfollowUser } from '../api/user.js';
import CommentsSection from '../components/Article/Comments/CommentsSection.jsx';

const ArticlePage = () => {
  const { slug } = useParams();
  const { user } = useAuthStore();
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
        console.error('Не удалось получить данные о статье: ', err);
      } finally {
        setIsLoading(false);
      }
    };
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
      console.error('Не удалось обновить избранное: ', err);
    }
  };

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(article.author.username);
        setIsFollowing(false);
        setArticle((prevArticle) => ({
          ...prevArticle,
          author: {
            ...prevArticle.author,
            following: false,
          },
        }));
      } else {
        await followUser(article.author.username);
        setIsFollowing(true);
        setArticle((prevArticle) => ({
          ...prevArticle,
          author: {
            ...prevArticle.author,
            following: true,
          },
        }));
      }
    } catch (err) {
      console.error('Не удалось обновить подписку: ', err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteArticle(slug);
      navigate('/');
    } catch (err) {
      console.error('Не удалось удалить статью: ', err);
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article?.title}</h1>
          <ArticleActions
            article={article}
            onFavorite={handleFavorite}
            isFavorited={isFavorited}
            onDelete={handleDelete}
            isAuthor={isAuthor}
            isFollowing={isFollowing}
            onFollow={handleFollow}
          />
        </div>
      </div>

      <div className="container page">
        <ArticleContent article={article} />
        <hr />
        <CommentsSection slug={slug} />
      </div>
    </div>
  );
};

export default ArticlePage;
