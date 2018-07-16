import React from 'react';
import styled from 'styled-components';

import BookshelfOption from './BookshelfOption.jsx';

const SidebarLeftDiv = styled.div`
  {
    font-family: "PlutoSansCondBold", sans-serif;
    background: #231f20;
    border-right: 1px solid #767e87;
    padding: 10px 8%;
    color: white;
  }
`;

const MenuBookshelf = styled.div`
  {
    position: fixed;

    > h3 {
      font-size: 11px;
      padding-left: 15px;
      padding-top: 9px;
    }

    > ul {
      list-style-type: none;
      margin-left: 3em;
      padding-left: 0;
      margin-top: -4px;
      font-size: 12px;
    }
  }
`;

class SidebarLeft extends React.Component {
  render() {
    let optionList = [
      {name: 'All', icon: 'globe'},
      {name: 'Quito', icon: 'globe'},
      {name: 'Cartagena', icon: 'globe'},
      {name: 'Medellin', icon: 'globe'},
      {name: 'Digital', icon: 'tablet-alt'},
      {name: 'Personal Loans', icon: 'user-tag'},
    ];

    return (
      <SidebarLeftDiv>
        <MenuBookshelf>
          <h3>MAIN</h3>
          <ul className="fa-ul">
            {optionList.map((shelf) =>
              <BookshelfOption shelf={shelf}/>
            )}
          </ul>
        </MenuBookshelf>
      </SidebarLeftDiv>
    );
  }
}

export default SidebarLeft;
