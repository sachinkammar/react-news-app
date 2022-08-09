import React from "react";

const Keywords = ({ tags, searchArticles }) => {
    return (
      <>
          {tags.map((tag, i)=>{
              return <button type="button" className="button" key={tag+i} style={{margin:4, background: '#3a4141'}} onClick={()=>{searchArticles(tag.webTitle)}}>
                  {tag.webTitle}
              </button>
          })}
      </>
    );
};

const ArticleItem = ({ article, searchArticles }) => {
    const img = article.fields.thumbnail || 'https://www.nccpimandtip.gov.eg/uploads/newsImages/1549208279-default-news.png';
    const headline = article.fields.headline || 'Article headline';
    const uri = article.webUrl;
    const tags = article.tags;
    return(
        <div className="provider">
            <a href={uri} target="_blank">
                <img className="picture" src={img} alt={headline} />
            </a>
            <div style={{margin:16}}>
                <a href={uri} target="_blank" className="provider-headline">{headline}</a>
                <div id="${article.id}" style={{margin:'8px 16px'}}>
                    <Keywords tags={tags} searchArticles={searchArticles} />
                </div>
            </div>
        </div>
    );
};

const Articles = ({ articles, searchArticles }) => {
    return (
      <>
        {articles.map((article, index) => (
          <ArticleItem article={article} key={article.fields.headline + index} searchArticles={searchArticles} />
        ))}
      </>
    );
  };

export default Articles;