import "vditor/dist/index.css";
import React, { Component } from "react";
import Vditor from "vditor";

class ArticleEdit extends Component<{}, {}> {
  
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    let text = '# aa\nqwe`qwe`';
    const vditor = new Vditor("vditor", {
      after: () => {
        vditor.setValue(text);
      }
    });
  }

  editArticle() {

  }

  render(): React.ReactNode {
    return (
      <div className="content">
        <br/>
        <button>Save</button>
        <div id="vditor" className="vditor" />
      </div>
    );
  }

}

export default ArticleEdit;
