import React from 'react';
import {Router, Route} from 'react-router';
import {injectGlobal} from 'styled-components';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Login from './Login.jsx';
import {logIn} from '../actions/loginAction.js';
import Header from './Bookshelf/Header.jsx';
import Body from './Bookshelf/Body.jsx';

injectGlobal`
  @font-face {
    font-family: "PlutoSansThin";
    src:
      local('PlutoSansThin'),
      url("./fonts/PlutoSansCondThin.otf") format('opentype');
  }

  @font-face {
    font-family: "PlutoSansHeavy";
    src:
      local('PlutoSansHeavy'),
      url("./fonts/PlutoSansHeavy.otf") format('opentype');
  }

  @font-face {
    font-family: "PlutoSansRegular";
    src:
      local('PlutoSansRegular'),
      url("./fonts/PlutoSansRegular.otf") format('opentype');
  }

  @font-face {
    font-family: "PlutoSansLight";
    src:
      local('PlutoSansLight'),
      url("./fonts/PlutoSansLight.otf") format('opentype');
  }

  @font-face {
    font-family: "PlutoSansCondBold";
    src:
      local('PlutoSansCondBold'),
      url("./fonts/PlutoSansCondBold.otf") format('opentype');
  }

  @font-face {
    font-family: "PlutoSansCondLight";
    src:
      local('PlutoSansCondLight'),
      url("./fonts/PlutoSansCondLight.otf") format('opentype');
  }

  @font-face {
    font-family: "PlutoSansCondHeavy";
    src:
      local('PlutoSansCondHeavy'),
      url("./fonts/PlutoSansCondHeavy.otf") format('opentype');
  }
`;

class App extends React.Component {
  constructor() {
    super();

    this.validateToken = this.validateToken.bind(this);
    this.logout = this.logout.bind(this);
  }

   componentDidMount() {
     if (this.validateToken()) {
       this.props.logIn(JSON.parse(localStorage.getItem('user')));
     }
     setInterval(() => this.validateToken(), 10*60*1000);
   }

  async validateToken() {
    let token = localStorage.getItem('token');
    if (token.length < 10) {
      this.logout();
      return false;
    }

    await axios.get('/api/books', {headers: {Authorization: token}})
    .then((res) => {
      if (!res.data.status) {
        this.logout();
        return false;
      }
    });

    return true;
  }

  logout() {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '{}');
    this.props.logIn({user:{},logIn: false});
  }

  render() {
    
    return (
      <div>
        {!this.props.loggedIn ?
          <Login/>
        :
        <div>
          <Header/>
          <Body/>
        </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loginReducer.user.logIn
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({logIn}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
