import "vditor/dist/index.css";
import "./Article.css"
import React, { Component } from "react";
import Vditor from "vditor";

class ArticleView extends Component<{}, {}> {
  viewDOM: any;
  
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    let articleId = window.location.pathname.split("/")[2];
    fetch("https://one.byte.art/api/articles/" + articleId)
    .then(res=>res.text()) 
    .then(data => {
      Vditor.preview(this.viewDOM, data, {
        mode: 'dark',
        hljs: {
          style: "monokai"
        }
      });
    })
    .catch(err => console.log(err))
  }

  render(): React.ReactNode {
    return (
      <div className="content">
        <br/>
        <div ref={(ele)=>{this.viewDOM=ele}} id="article-view" className="article-view" />
      </div>
    );
  }

}

export default ArticleView;
