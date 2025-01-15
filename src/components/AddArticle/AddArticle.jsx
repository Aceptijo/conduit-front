import useArticleStore from "../../store/articleStore.js";
import {useState} from "react";
import axiosInstance from "../../utils/axiosInstance.js";

const AddArticle = () => {
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

  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState(null);

  const handlePublish = async () => {
    try {
      const response = await axiosInstance.post('/articles', {
        article: {title, description, body, tagList: tags}
      })
      console.log('Published: ', response.data.article)
      resetForm();
    } catch (err) {
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
                         placeholder="Article Title"
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
                        <i className="ion-close-round" onClick={() => removeTag(tag)}></i>
                      </span>
                    ))}

                  </div>
                </fieldset>
                <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddArticle;