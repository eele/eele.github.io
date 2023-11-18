import './App.css';
import {Component} from 'react'
import {Link} from 'react-router-dom'

class App extends Component<{}, {articles: Array<{title: String, id: String}>}> {

  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {articles: []};
  }

  componentDidMount() {
    fetch("http://article.byte.art:8080/api/articles")
    .then(res=>res.json()) 
    .then(data => {
      console.log(data)
      this.setState({articles: data.list})
    })
    .catch(err => console.log(err))
  }
 
  render() {
    return (
      <div>
        <h1>Byte Art</h1>
        <h6 className='sub-title'>One byte, one world.</h6>
        <br/>
        <Link to={{ pathname: `/articles/new/edit` }}>New</Link>
        <ul>
          {this.state.articles &&
            this.state.articles.map((item, index) => (
              <li key={index.toString()}>
                <Link to={{ pathname: `/articles/${item.id}` }}>{item.title ? item.title : item.id}</Link>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default App;
