import React from 'react';
import {Router, Route} from 'react-router';
import {Header, Body} from './Bookshelf/Bookshelf.jsx';
import axios from 'axios';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      filterString: '',
      loggedIn: false,
      user: ''
    };

    this.validateToken = this.validateToken.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    setInterval(() => this.validateToken(), 10*60*1000);
  }

  async validateToken() {
    let token = localStorage.getItem('token');
    console.log("checking token");
    if (token.length < 10) {
      this.logout();
      return 0;
    }

    await axios.get("/api/books", {headers: {Authorization: token}})
      .then((res) => {
        if (!res.data.status) {
          this.logout();
        }
      });
  }

  logout() {
    localStorage.setItem('token','');
    this.setState({loggedIn: false});
  }

  render() {
    return (
      <div>
        {!this.state.loggedIn ?
          <div><Login loggedIn={(user) => this.setState({loggedIn: true, user})}/></div>
        :
          <div>
            <Header user={this.state.user} logoutHandler={this.logout} filterUpdate={
              (filter) => this.setState({filterString: filter})}/>
            <Body filterString={this.state.filterString} checkSession={() => this.validateToken()}/>
          </div>
       }
     </div>
    );
  }
}

class Login extends React.Component {
  constructor() {
    super();
    this.user = {};

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e) {
    e.preventDefault();
    axios.post('/api/login', {username: this.user.username.value, password: this.user.password.value})
      .then(res => {
        localStorage.setItem('token', 'Bearer ' + res.data.token);
        this.props.loggedIn(res.data.name);
      })
      .catch(err => console.error(err));
  }

  render(){
    return (
      <div className="loginForm">
        <div className="loginLogo">
          <img src="https://www.jobsity.com/themes/custom/jobsity/images/icons/logo2.svg" alt="Jobsity"/><span>JOBSITY</span>
        </div>
        <form onSubmit={this.submitForm}>
          <label for="username">Username:</label><br/>
          <div className="loginBox">
            <i className="fas fa-user"></i>
            <input type="text" ref={(node)=> {this.user.username = node;}} name="username"  className="loginField" placeholder="Username"/><br/>
          </div>
          <label for="password">Password:</label><br/>
          <div className="loginBox">
            <i className="fas fa-key"></i>
            <input type="password" ref={(node)=> {this.user.password = node;}} name="password" className="loginField" placeholder="Password"/><br/>
          </div>
          <input type="submit" value="Log In" className="loginButton"/>
        </form>
      </div>
    );
  }
}

export default App;
