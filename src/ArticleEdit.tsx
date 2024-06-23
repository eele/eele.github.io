import "vditor/dist/index.css";
import React, { Component } from "react";
import Vditor from "vditor";

class ArticleEdit extends Component<{}, {isSaved: Boolean}> {
  
  articleId!: String;
  vd!: Vditor;
  timer: any;
  
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.articleId = window.location.pathname.split("/")[2];
    this.state = {isSaved: false};
  }


  padTo2Digits(num: { toString: () => string; }) {
    return num.toString().padStart(2, '0');
  }
  
  formatDate(date: { getFullYear: () => any; getMonth: () => number; getDate: () => any; getHours: () => any; getMinutes: () => any; getSeconds: () => any; }) {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        this.padTo2Digits(date.getHours()),
        this.padTo2Digits(date.getMinutes()),
        this.padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }
  

  componentDidMount() {
    let editor = this;
    const vditor = new Vditor("vditor", {
      after: () => {
        editor.vd = vditor;
        if (this.articleId === 'new') {
          let now = editor.formatDate(new Date())
          vditor.setValue(`
---
title: 
date: ${now}
tags:
- Codes
- Robot Models
- Airplane Models
- Railway Models
- Paper Models
---
          `);
        } else {
          fetch("https://api.github.com/gists/" + this.articleId, {
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
            vditor.setValue(content);
          })
          .catch(err => console.log(err))
        }
      },
      cdn:'/vditor',
      cache: {
        enable: false,
      },
      upload: {
        accept: 'audio/*,video/*,image/*',
        max: 1024 * 1024 * 1024 * 6,
        // token: 'test',
        url: '/api/files',
        // linkToImgUrl: '/api/upload/fetch',
        // filename (name) {
        //   return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '').
        //     replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '').
        //     replace('/\\s/g', '')
        // },
      },
      value: 'Waiting ...',
      minHeight: 600,
      preview: {
        maxWidth: 1000,
        theme: {
          current: 'light',
          path: '/vditor/dist/css/content-theme'
        }
      }
    });

    document.addEventListener("keydown", this.onKeyDown)
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.onKeyDown)
  }

  onKeyDown = (event: {
    preventDefault(): unknown; 
    key: String; 
    ctrlKey: Boolean; 
    metaKey: Boolean; }) => {
      
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      console.log(event)
      this.saveArticle();
      event.preventDefault();
    }
  }

  saveArticle = () => {
    const content = this.vd.getValue();
    const aId = this.articleId === 'new' ? '' : '/' + this.articleId
    const method = this.articleId === 'new' ? 'POST' : 'PATCH'
    const editor = this;
    fetch("https://api.github.com/gists" + aId, {
      method: method,
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": "Bearer " + localStorage.getItem('t'),
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({
        "description": content.match(/title:( )*(.*)\n/)![2],
        "files": {
          "README.md": {
            "content": content
          }
        }
      })
    })
    .then(res=>res.json()) 
    .then(data => {
      console.log(data);
      editor.setState({isSaved: true})
      if(editor.timer){
        clearTimeout(this.timer);
      }
      editor.timer = setTimeout(() => editor.setState({isSaved: false}), 3000); 
    })
    .catch(err => {
      console.log(err);
      alert('Error saving data.');
    })
  }

  render(): React.ReactNode {
    return (
      <div>
        <br/>
        <button onClick={this.saveArticle}>Save</button>
        {(() => {
          if (this.state.isSaved) {
            return <span>&nbsp;&nbsp;&nbsp;Saved.</span>;
          }
        })()}
        
        <div id="vditor" className="vditor" />
      </div>
    );
  }

}

export default ArticleEdit;
