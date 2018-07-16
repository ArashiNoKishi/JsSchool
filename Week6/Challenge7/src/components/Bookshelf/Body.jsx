import React from 'react';
import styled from 'styled-components';
import MainContent from './MainContainer/MainContent.jsx';
import SidebarLeft from './SidebarLeft.jsx';

const MainContainer = styled.div`
  
    width: 100%;
    display: grid;
    grid-template-columns: 15% 1fr 13.6%;
    background: #231f20;

    @media (max-width: 1200px) {
      grid-template-columns: 180px 1fr 13.6%;
    }

    @media (max-width: 900px) {
      grid-template-columns: 180px 1fr;
    }
`;

const SidebarRight = styled.div`
  
    background: #231f20;
    border-left: 1px solid #767e87;

    @media (max-width: 900px) {
      display: none;
    }
  
`;

export class Body extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedShelf: 'All',
    };
  }

  render() {
    return (
        <MainContainer>
          <SidebarLeft/>
          <MainContent/>
          <SidebarRight>

          </SidebarRight>
      </MainContainer>
    );
  }
}

export default Body;
