import './App.css';
import {Component} from 'react'
import {Link} from 'react-router-dom'

class App extends Component<{}, {articles: Array<{description: String, id: String}>}> {

  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {articles: []};
  }

  componentDidMount() {
    fetch("https://api.github.com/gists", {
      method: "GET",
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": "Bearer " + localStorage.getItem('t'),
        "X-GitHub-Api-Version": "2022-11-28",
      }
    })
    .then(res=>res.json()) 
    .then(data => {
      console.log(data)
      this.setState({articles: data})
    })
    .catch(err => console.log(err))
  }
 
  render() {
    return (
      <div>
        <h1>Byte Art</h1>
        <h6 className='sub-title'>One Byte, One World.</h6>
        <br/>
        <Link to={{ pathname: `/articles/new/edit` }}>New</Link>
        <ul>
          {this.state.articles &&
            this.state.articles.map((item, index) => (
              <li key={index.toString()}>
                <Link to={{ pathname: `/articles/${item.id}` }}>{item.description ? item.description : item.id}</Link>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default App;
