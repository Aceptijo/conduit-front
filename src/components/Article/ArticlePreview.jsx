import { Link } from 'react-router-dom';
import { addToFavorites, removeFromFavorites } from '../../api/articles.js';
import LikeIcon from '../icons/LikeIcon/LikeIcon.jsx';
import '/src/styles/global.css';

const ArticlePreview = ({ article, onFavoriteToggle, handleTagClick }) => {
  const handleFavorite = async () => {
    try {
      const updatedArticle = article.favorited
        ? await removeFromFavorites(article.slug)
        : await addToFavorites(article.slug);

      if (onFavoriteToggle) {
        onFavoriteToggle(updatedArticle);
      }
    } catch (err) {
      console.error('Не удалось изменить список избранных: ', err);
    }
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${article.author.username}`}>
          <img
            src={
              article.author.image ||
              `https://api.dicebear.com/6.x/micah/svg?seed=${article.author.username}`
            }
            alt={article.author.username}
          />
        </Link>
        <div className="info">
          <Link to={`/profile/${article.author.username}`} className="author">
            {article.author.username}
          </Link>
          <span className="date">{new Date(article.createdAt).toLocaleDateString()}</span>
        </div>
        <button
          className={`btn btn-sm btn-outline-primary pull-xs-right ${article.favorited ? 'active' : ''}`}
          onClick={handleFavorite}
        >
          <LikeIcon />
          <i className="ion-heart"></i>
          {article.favoritesCount}
        </button>
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
      <ul className="tag-list" style={{ float: 'right' }}>
        {article.tagList.map((tag, index) => (
          <Link
            className="tag-default tag-pill tag-outline"
            onClick={() => handleTagClick(tag)}
            key={index}
            to={`/?tag=${tag}`}
          >
            {tag}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ArticlePreview;
