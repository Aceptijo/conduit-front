import {Link} from "react-router-dom";

const ArticleActions = ({
                          article,
                          onDelete,
                          isFavorited,
                          onFavorite,
                          isAuthor,
                          isFollowing,
                          onFollow
                        }) => {
  return (
    <div className={'article-actions'}>
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

        {!isAuthor && (
          <button
            className={`btn btn-sm btn-outline-secondary`}
            onClick={onFollow}
          >
            <i className="ion-plus-round"></i>
            {isFollowing
              ? `Unfollow ${article?.author?.username}`
              : `Follow ${article?.author?.username}`}
            <span className="counter">({article?.author.followersCount})</span>
          </button>
        )}

        <button
          className={`btn btn-sm btn-outline-primary ${isFavorited ? 'active' : ''} `}
          onClick={onFavorite}
        >
          <i className="ion-heart"></i>
          {isFavorited ? `Unfavorite` : `Favorite`}
          <span className="counter">({article?.favoritesCount})</span>
        </button>

        {isAuthor && (
          <>
            <Link to={`/editor/${article.slug}`} className="btn btn-sm btn-outline-secondary">
              <i className="ion-edit"></i> Edit Article
            </Link>
            <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>
              <i className="ion-trash-a"></i> Delete Article
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ArticleActions;