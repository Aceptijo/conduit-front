import { Link } from 'react-router-dom';
import LikeIcon from '../icons/LikeIcon/LikeIcon.jsx';
import DeleteIcon from '../icons/DeleteIcon/DeleteIcon.jsx';
import FollowIcon from '../icons/FollowIcon/FollowIcon.jsx';
import EditIcon from '../icons/EditIcon/EditIcon.jsx';

const ArticleActions = ({
  article,
  onDelete,
  isFavorited,
  onFavorite,
  isAuthor,
  isFollowing,
  onFollow,
}) => {
  return (
    <div className="article-actions">
      <div className="article-meta">
        <Link to={`/profile/${article?.author?.username}`}>
          <img src={article?.author?.image || 'https://avatar.iran.liara.run/public/48'} />
        </Link>
        <div className="info">
          <Link to={`/profile/${article?.author?.username}`} className="author">
            {article?.author?.username}
          </Link>
          <span className="date">{new Date(article?.createdAt).toLocaleDateString()}</span>
        </div>

        {!isAuthor && (
          <button
            className={`btn btn-sm btn-outline-secondary ${isFollowing ? 'active' : ''}`}
            onClick={onFollow}
          >
            <FollowIcon />
            {isFollowing
              ? `Unfollow ${article?.author?.username}`
              : `Follow ${article?.author?.username}`}
            <span className="counter"> ({article?.author?.followersCount})</span>
          </button>
        )}

        <button
          className={`btn btn-sm btn-outline-primary ${isFavorited ? 'active' : ''} `}
          onClick={onFavorite}
        >
          <LikeIcon />
          {isFavorited ? `Unfavorite` : `Favorite`}
          <span className="counter">({article?.favoritesCount})</span>
        </button>

        {isAuthor && (
          <>
            <Link to={`/editor/${article.slug}`} className="btn btn-sm btn-outline-secondary">
              <EditIcon /> Edit Article
            </Link>
            <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>
              <DeleteIcon />
              Delete Article
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ArticleActions;
