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
    fetch("/api/articles/" + articleId)
    .then(res=>res.text()) 
    .then(data => {
      Vditor.preview(this.viewDOM, data, {
        cdn:'/vditor',
        emojiPath: '/vditor/dist/images/emoji',
        mode: 'dark',
        hljs: {
          style: "monokai"
        },
        theme: {
          current: 'light',
          path: '/vditor/dist/css/content-theme'
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
