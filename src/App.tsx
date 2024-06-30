import './App.css';
import {Component} from 'react'
import {Link} from 'react-router-dom'

class App extends Component<{}, {articles: Array<{description: String, id: String}>, isNotLogin: Boolean}> {

  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {articles: [], isNotLogin: false};
  }

  componentDidMount() {
    if (localStorage.getItem('t')) {
      this.fetchArticle(true);
    } else {
      this.fetchArticle(false);
    }
  }
  
  fetchArticle(retry: boolean) {
    this.setState({isNotLogin: !retry});
    fetch("https://api.github.com/users/eele/gists", {
      method: "GET",
      headers: retry ? {
        "Accept": "application/vnd.github+json",
        "Authorization": "Bearer " + localStorage.getItem('t'),
        "X-GitHub-Api-Version": "2022-11-28",
      } : {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      }
    })
    .then(res => {
      if (res.status === 401 && retry) {
        this.fetchArticle(false);
        return false;
      }
      return res.json();
    }) 
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
        &nbsp;&nbsp;&nbsp;
        {
          this.state.isNotLogin ? (
            <Link to="https://github.com/login/oauth/authorize?client_id=Ov23liq5tBJoIutYNXsq&allow_signup=true&state=1&scope=gist">Login</Link>
          ) : null
        }
        
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
