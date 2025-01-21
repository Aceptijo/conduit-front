import {Link} from "react-router-dom";
import {addToFavorites, removeFromFavorites} from "../../api/articles.js";

const ArticlePreview = ({article, onFavoriteToggle}) => {
  const handleFavorite = async () => {
    try {
      const updatedArticle = article.favorited
        ? await removeFromFavorites(article.slug)
        : await addToFavorites(article.slug);

      if (onFavoriteToggle) {
        onFavoriteToggle(updatedArticle);
      }
    } catch (err) {
      console.error('Не удалось изменить список избранных: ', err)
    }
  }

  return (
    <div className="article-preview">
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
        <button
          className={`btn btn-sm btn-outline-primary pull-xs-right ${article.favorited ? 'active' : ''}`}
          onClick={handleFavorite}
        >
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
  );
};

export default ArticlePreview;