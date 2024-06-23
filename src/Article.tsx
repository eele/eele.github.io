import "vditor/dist/index.css";
import "./Article.css"
import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ArticleEdit from "./ArticleEdit";
import ArticleView from "./ArticleView";

class Article extends Component<{}, {}> {

  articleId!: String;
  
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.articleId = window.location.pathname.split("/")[2];
  }

  deleteArticle = () => {
    if (!window.confirm('Are you sure ?')) {
      return;
    }
    fetch("https://api.github.com/gists/" + this.articleId, {
      method: 'DELETE',
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": "Bearer " + localStorage.getItem('t'),
        "X-GitHub-Api-Version": "2022-11-28",
      }
    })
    .then(res=> {
      window.location.href = '/';
    })
  }
  
  render(): React.ReactNode {
    return (
      <div>
        <Link className="btn" to={{ pathname: `/` }}>Home</Link>
        <Link className="btn" to={{ pathname: `/articles/${this.articleId}/edit` }}>Edit</Link>
        <Link className="btn" to={{ pathname: `/articles/${this.articleId}` }}>View</Link>
        <Link className="btn" to={""} onClick={this.deleteArticle}>Delete</Link>
        <Routes>
          <Route path = '/' element = {<ArticleView/>} />
          <Route path = '/edit' element = {<ArticleEdit/>} />
        </Routes>
      </div>
    );
  }

}

export default Article;
