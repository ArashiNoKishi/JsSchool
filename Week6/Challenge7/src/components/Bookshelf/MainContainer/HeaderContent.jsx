import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import ViewOption from './viewOption.jsx';

const HeaderContentDiv = styled.div`
  
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 0;
    position: fixed;
    left: 15%;
    z-index: 1;
    background: #f5f6f8;
    right: 13.6%;

    @media (max-width: 1200px) {
      left: 180px;
    }

    @media (max-width: 900px) {
      left: 180px;
      right: 0;
    }
`;

const CurrentLibrary = styled.div`
  
    padding: 10px 65px;
    height: 56px;
    font-size: 13px;
    box-sizing: border-box;
  
`;

const SorterDiv = styled.div`
  
    visibility: hidden;
    text-align: center;
    color: #a8a8a8;
    height: 56px;
    font-size: 10.5px;
    letter-spacing: 0.2px;
    box-sizing: border-box;
    padding: 27px 3px 0px 0;

    > #releaseDate {
      position: relative;
      right: 3px;

      &.active {
        font-weight: bold;
      }
    }

    > #popularity {
      position: relative;
      left: 6px;

      &.active {
        font-weight: bold;
      }
    }
  
`;

const DisplayOption = styled.div`
  
    text-align: right;
    color: #979797;
    height: 56px;
    padding: 25px 66px;
    font-size: 15px;
    box-sizing: border-box;

    > span {
      margin-left: 3px;
      cursor: pointer;

      &.active {
      color: #7fccea
      }
    }
    
    @media (max-width: 900px) {
    display: none;
  }
`;

class HeaderContent extends React.Component {
  render() {
    let viewOptions = [
      {view: 'itemView', icon: 'large'},
      {view: 'listView', icon: 'list'},
    ];

    return (
      <HeaderContentDiv>
        <CurrentLibrary>
          <h3 id="currentLibrary">{this.props.filterString.length > 0 ?
            this.props.selectedShelf + ' - filter: \''+ this.props.filterString+'\'':
            this.props.selectedShelf}</h3>
        </CurrentLibrary>
        <SorterDiv>
          <span className="active" id="releaseDate">Release Date</span> |
          <span id="popularity">Popularity</span>
        </SorterDiv>
        <DisplayOption>
          {viewOptions.map((option)=>
            <ViewOption option={option}/>)}
        </DisplayOption>
      </HeaderContentDiv>
    );
  }
}

function mapStateToProps(state) {
  
  return {
    filterString: state.filterString,
    selectedShelf: state.selectedShelf
  };
}

function matchDispatchToProps(dispatch) {
  
}

export default connect(mapStateToProps, matchDispatchToProps)(HeaderContent);
