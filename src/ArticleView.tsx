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
    let text = '# aa\nqwe`qwe`';
    Vditor.preview(this.viewDOM, text);
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
