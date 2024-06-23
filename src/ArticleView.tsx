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
    fetch("https://api.github.com/gists/" + articleId, {
      method: "GET",
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": "Bearer " + localStorage.getItem('t'),
        "X-GitHub-Api-Version": "2022-11-28",
      }
    })
    .then(res=>res.json()) 
    .then(data => {
      const content = data.files['README.md'].content;
      Vditor.preview(this.viewDOM, content, {
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
