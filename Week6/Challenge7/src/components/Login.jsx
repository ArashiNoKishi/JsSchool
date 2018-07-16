import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {logIn} from '../actions/loginAction.js';

const LoginForm = styled.div`
  {
    background: #f5f6f8;
    width: 20%;
    position: fixed;
    top: 15%;
    left: 37%;
    padding: 40px;
    border-radius: 5px;

    > form {
      font-size: 15px;
    }
  }
`;

const LoginTitle = styled.div`
  {
    text-align: center;
    font-family: "PlutoSansHeavy", sans-serif;
    box-sizing: border-box;
    padding: 2px;
    height: 67px;

    > span {
      left: 4px;
      position: relative;
      top: 15px;
      vertical-align: top;
      font-size: 23.5px;
      letter-spacing: -0.6px;
      font-weight: bold;
    }
  }
`;

const LoginBox = styled.div`
  {
    position: relative;
    vertical-align: middle;
    border-radius: 15px;
    border: 1px solid #6ec1e4;
    padding: 2.5px 10px;
    background: white;
    box-sizing: border-box;
    display: flex;

    > i {
      padding-top: 4px;
    }

    > input {
      position: relative;
      vertical-align: middle;
      border: 0;
      padding: 5px 0px;
      padding-left: 1.1px;
      letter-spacing: 0.2px;
      font-size: 11px;
      color: black;
      font-family: "PlutoSansLight", sans-serif;
      flex: 1;
    }
  }
`;

const LoginButton = styled.input`
  {
    background: black;
    border: 1px solid #6ec1e4;
    color: white;
    padding: 4px 10px;
    margin-top: 11px;
    border-radius: 12px;
    align-self: center;
    cursor: pointer;

    &:hover {
      background: #191919;
    }

    &:active {
      background: #323232;
    }
  }
`;

class Login extends React.Component {
  constructor() {
    super();
    this.user = {};

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e) {
    e.preventDefault();
    axios.post('/api/login', {username: this.user.username.value, password: this.user.password.value})
      .then((res) => {
        let user = {name: res.data.name, username: this.user.username.value, logIn: true};
        localStorage.setItem('token', 'Bearer ' + res.data.token);
        localStorage.setItem('user', JSON.stringify(user));
        this.props.logIn(user);
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <LoginForm>
        <LoginTitle>
          <img src="https://www.jobsity.com/themes/custom/jobsity/images/icons/logo2.svg" alt="Jobsity"/>
          <span>JOBSITY</span>
        </LoginTitle>
        <form onSubmit={this.submitForm}>
          <label for="username">Username:</label><br/>
          <LoginBox>
            <i className="fas fa-user"></i>
            <input type="text"
              ref={(node)=> {
                this.user.username = node;
              }}
              name="username"
              className="loginField"
              placeholder="Username"/>
            <br/>
          </LoginBox>
          <label for="password">Password:</label><br/>
          <LoginBox>
            <i className="fas fa-key"></i>
            <input type="password"
              ref={(node)=> {
                this.user.password = node;
              }}
              name="password"
              className="loginField"
              placeholder="Password"/>
            <br/>
          </LoginBox>
          <LoginButton type="submit" value="Log In"/>
        </form>
      </LoginForm>
    );
  }
}

function mapStateToProps(state) {

}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({logIn}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);
