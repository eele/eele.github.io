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
      },
      cache: {
        enable: false,
      },
      value: 'ir',
      minHeight: 600,
      preview: {
        maxWidth: 1000
      }
    });
  }

  render(): React.ReactNode {
    return (
      <div>
        <br/>
        <button>Save</button>
        <div id="vditor" className="vditor" />
      </div>
    );
  }

}

export default ArticleEdit;
