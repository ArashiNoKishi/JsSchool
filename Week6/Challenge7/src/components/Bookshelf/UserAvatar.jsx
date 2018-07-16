import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {logIn} from '../../actions/loginAction.js';

const UserDiv = styled.div`
  
    padding: 11px 0;
    display: table;
    text-align: right;
    height: 43px;
    box-sizing: border-box;
    margin-top: 1px;

    > i {
      position: relative;
      top: 0px;
      right: -7px;
      font-size: 10px;
    }

    > img {
      height: 30px;
      position: relative;
      top: 7px;
      right: 1px;
    }
  
`;

const AvatarDiv = styled.span`
  
    font-size: 10px;
    padding: 16.9px 0px 15px 10px;
    display: table-cell;
    vertical-align: middle;
    border-left: 1px solid #979797;
    position: relative;
    cursor: pointer;

    &:hover {
      color: #979797;
    }
  
`;

const LogoutSpan = styled.span`
  
    position: absolute;
    display: block;
    right: 0px;
    top: 52px;
    background: #edd4b6;
    padding: 10px;
    color: black;
    width: 8.2%;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
    border: 0 1px 1px 1px solid #979797;
    z-index: 3;

    @media (max-width: 750px) {
      width: 80px;
    }

    &:hover {
      background: #f7ecdf;
    }

    &:active {
      background: #f2e0ca;
    }
  
`;

class UserAvatar extends React.Component {
  constructor() {
    super();
    this.state = {
      'displayMenu': false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggleMenu() {
    this.setState({'displayMenu': !this.state.displayMenu});
  }

  logout() {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '{}');
    this.props.logIn({user:{},logIn: false});
  }

  render() {
    return (
      <UserDiv>
        <AvatarDiv onClick={this.toggleMenu}>
          <span>{this.props.user.name}</span><i className="fas fa-angle-down"></i>
        </AvatarDiv>
        <img src='./images/User_avatar.png'/>
        {this.state.displayMenu &&
        <LogoutSpan onClick={this.logout}>Logout <i class="fas fa-sign-out-alt"></i></LogoutSpan>}
      </UserDiv>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.loginReducer.user
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({logIn}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(UserAvatar);
