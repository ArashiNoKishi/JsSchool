import React from 'react';
import styled from 'styled-components';
import SearchBox from './SearchBox.jsx';
import UserAvatar from './UserAvatar.jsx';

const HeaderDiv = styled.div`
  border-bottom: 1px solid #6ec1e4;
  height: 67px;
  background: #fcf8f3;
  top: 0;
  right: 0;
  left: 0;
  display: grid;
  grid-template-columns: 15% 1fr 1fr 13.6%;
  font-family: "PlutoSansRegular", sans-serif;
  position: sticky;
  z-index: 2;

  @media (max-width: 1200px) {
    grid-template-columns: 180px 1fr 1fr 13.6%;
  }

  @media (max-width: 860px) {
    grid-template-columns: 180px 1fr 3fr 120px;
  }

  @media (max-width: 620px) {
    grid-template-columns: 180px 100px 1fr 120px;
  }
`;

const Logo = styled.div`
  
    background: white;
    text-align: center;
    font-family: "PlutoSansHeavy", sans-serif;
    border-right: 1px solid #d6dee5;
    box-sizing: border-box;
    padding: 13px;
    height: 67px;

    > img {
      height: 39px;
      padding-top: 0;
      padding-right: 10px;
    }

    > span {
      left: -2px;
      position: relative;
      top: 7px;
      vertical-align: top;
      font-size: 23.5px;
      letter-spacing: -0.6px;
      font-weight: bold;
    }
  
`;
const Title = styled.div`
  
    height: 67px;
    font-size: 1.3em;
    height: inherit;
    padding-top: 20px;
    padding-left: 16.7px;
    letter-spacing: -0.5px;
    box-sizing: border-box;

    > span {
      vertical-align: middle;
      font-weight: bold;
    }
  
`;

export class Header extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <HeaderDiv>
        <Logo>
          <img src="https://www.jobsity.com/themes/custom/jobsity/images/icons/logo2.svg" alt="Jobsity"/><span>JOBSITY</span>
        </Logo>
        <Title>
          <span>Bookshelf</span>
        </Title>
        <SearchBox/>
        <UserAvatar/>
      </HeaderDiv>
    );
  }
}

export default Header;
