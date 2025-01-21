const ArticleContent = ({article}) => {
  return (
    <div className="row article-content">
      <div className="col-md-12">
        {/*<h2 id="introducing-ionic">{article?.title}</h2>*/}
        <p>{article?.body}</p>
        {/*<p> It's a great solution for learning how other frameworks work.</p>*/}
        <ul className="tag-list">
          {article?.tagList?.map((tag, index) => (
            <li className="tag-default tag-pill tag-outline" key={index}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArticleContent;