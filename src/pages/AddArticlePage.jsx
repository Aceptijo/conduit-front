import useArticleStore from "../store/articleStore.js";
import {useEffect, useState} from "react";
import axiosInstance from "../utils/axiosInstance.js";
import {useNavigate, useParams} from "react-router-dom";
import {getArticle} from "../api/articles.js";

const AddArticlePage = () => {
  const {
    title,
    description,
    body,
    tags,
    setTitle,
    setDescription,
    setBody,
    addTag,
    removeTag,
    resetForm
  } = useArticleStore();

  const {slug} = useParams();
  const navigate = useNavigate();
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (slug) {
        try {
          const response = await getArticle(slug);
          setTitle(response.title);
          setDescription(response.description);
          setBody(response.body);
        } catch (err) {
          console.error('Не удалось загрузить статью: ', err);
        }
      }
    }
    fetchArticle();
  }, [slug, setTitle, setDescription, setBody]);

  const handlePublish = async () => {
    try {
      if (slug) {
        await axiosInstance.put(`/articles/${slug}`, {
          article: {title, description, body, tagList: tags}
        })
        navigate(`/article/${slug}`);
        resetForm();
      } else {
        await axiosInstance.post('/articles', {
          article: {title, description, body, tagList: tags}
        })
        resetForm();
      }
    } catch (err) {
      console.error('Ошибка при сохранении стьатьи: ', err)
      setError('Не получилось добавить статью')
    }
  }


  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {error && (
              <ul className="error-messages">
                <li>{error}</li>
              </ul>
            )}

            <form onSubmit={event => {
              event.preventDefault();
              handlePublish();
            }}>
              <fieldset>
                <fieldset className="form-group">
                  <input type="text"
                         className="form-control form-control-lg"
                         placeholder="ArticlePage Title"
                         value={title}
                         onChange={event => setTitle(event.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input type="text"
                         className="form-control"
                         placeholder="What's this article about?"
                         value={description}
                         onChange={event => setDescription(event.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea className="form-control" rows="8"
                            placeholder="Write your article (in markdown)"
                            value={body}
                            onChange={event => setBody(event.target.value)}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    value={tagInput}
                    onChange={event => setTagInput(event.target.value)}
                    onKeyDown={event => {
                      if (event.key === 'Enter' && tagInput.trim()) {
                        addTag(tagInput.trim());
                        setTagInput('');
                        event.preventDefault();
                      }
                    }}
                  />
                  <div className="tag-list">
                    {tags?.map((tag, index) => (
                      <span key={index} className="tag-default tag-pill">
                        {tag}{' '}
                        <i className="ion-close-round" onClick={() => removeTag(tag)}>X</i>
                      </span>
                    ))}

                  </div>
                </fieldset>
                <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
                  {slug ? 'Update Article' : 'Publish Article'}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddArticlePage;