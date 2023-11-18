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
    fetch("http://article.byte.art:8080/api/articles/" + this.articleId, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res=>res.json()) 
    .then(data => {
      console.log(data);
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
