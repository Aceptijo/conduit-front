import {useEffect, useState} from "react";
import {addComment, deleteComment, getComments} from "../../../api/articles.js";
import useAuthStore from "../../../store/authStore.js";
import {Link} from "react-router-dom";

const CommentsSection = ({slug}) => {
  const {user} = useAuthStore();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getComments(slug);
        setComments(fetchedComments);
      } catch (err) {
        console.error(`Не удалось загрузить комментарии: `, err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchComments();
  }, [slug]);

  const handleAddComment = async (event) => {
    event.preventDefault();
    if (!newComment.trim()) return;

    try {
      const addedComment = await addComment(slug, newComment);
      setComments((prev) => [addedComment, ...prev]);
      setNewComment('');
    } catch (err) {
      console.error('Не удалось добавить комментарий: ', err);
    }
  }

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(slug, commentId);
      setComments((prev) => prev.filter(comment => comment.id !== commentId));
    } catch (err) {
      console.error('Не удалось удалить комментарий: ', err);
    }
  }

  if (isLoading) return <div>Загрузка комментариев...</div>

  return (
    <div className="row">
      <div className="col-xs-12 col-md-8 offset-md-2">
        {user ? (
          <form className="card comment-form" onSubmit={handleAddComment}>
            <div className="card-block">
            <textarea
              className="form-control"
              placeholder="Write a comment..."
              rows="3"
              value={newComment}
              onChange={event => setNewComment(event.target.value)}
            ></textarea>
            </div>
            <div className="card-footer">
              <img
                src={user.image || 'https://avatar.iran.liara.run/public/48'}
                className="comment-author-img"/>
              <button className="btn btn-sm btn-primary" type={"submit"}>
                Post Comment
              </button>
            </div>
          </form>
        ) : (
          <div>
            <Link to={'/login'}>Sign in</Link> or <Link to={'/register'}>Sign up</Link> to add
            comments.
          </div>
        )}
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div className="card" key={index}>
              <div className="card-block">
                <p className="card-text">
                  {comment.body}
                </p>
              </div>
              <div className="card-footer">
                <Link to={`/profile/${comment.author?.username}`} className="comment-author">
                  <img
                    src={comment.author?.image || "https://avatar.iran.liara.run/public/48"}
                    className="comment-author-img"/>
                </Link>
                &nbsp;
                <Link to={`/profile/${comment.author?.username}`} className="comment-author">
                  {comment.author?.username}
                </Link>
                <span className="date-posted">{comment.createdAt}</span>
                {user && user.username === comment.author?.username && (
                  <span className="mod-options" onClick={() => handleDeleteComment(comment.id)}>
                    <i className="ion-trash-a">Delete</i>
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>No comments yet...</div>
        )}

      </div>
    </div>
  );
};

export default CommentsSection;