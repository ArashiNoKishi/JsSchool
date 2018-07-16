import React from 'react';
import styled from 'styled-components';

import HeaderContent from './HeaderContent.jsx';
import BookList from './BookList.jsx';

const MainContentDiv = styled.div`
  
    background: #f5f6f8;
    display: grid;
    grid-template-rows: 10% 1fr;
  
`;

class MainContent extends React.Component {
  constructor() {
    super();

  }
  
  render() {
    return (
      <MainContentDiv>
        <HeaderContent/>
        <BookList/>
      </MainContentDiv>
    );
  }
}

export default MainContent;
