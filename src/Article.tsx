import "vditor/dist/index.css";
import "./Article.css"
import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ArticleEdit from "./ArticleEdit";
import ArticleView from "./ArticleView";

class Article extends Component<{}, {}> {

  articleId!: String;
  
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.articleId = window.location.pathname.split("/")[2];
  }
  
  componentDidMount() {
  }

  editArticle() {

  }

  render(): React.ReactNode {
    return (
      <div>
        <Link className="btn" to={{ pathname: `/` }}>Home</Link>
        <Link className="btn" to={{ pathname: `/articles/${this.articleId}/edit` }}>Edit</Link>
        <Link className="btn" to={{ pathname: `/articles/${this.articleId}` }}>View</Link>
        <Routes>
          <Route path = '/' element = {<ArticleView/>} />
          <Route path = '/edit' element = {<ArticleEdit/>} />
        </Routes>
      </div>
    );
  }

}

export default Article;
