import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {searchFilter} from '../../actions/filterStringAction.js';

const Search = styled.div`
  
    height: 67px;
    box-sizing: border-box;

    > div {
      position: relative;
      vertical-align: middle;
      border-radius: 15px;
      border: 1px solid #6ec1e4;
      padding: 2.5px 10px;
      margin: 19px;
      background: white;
      box-sizing: border-box;
      width: 52%;
      margin-left: auto;
      margin-right: 17px;
      display: flex;

      > i {
        font-size: 15px;
        position: relative;
        top: 1px;
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

        @media (max-width: 970px) {
          width: 50%;
        }
      }
    }
  
`;

class SearchBox extends React.Component {
  render() {
    
    return (
      <Search>
        <div>
          <i className="fas fa-search"></i>
          <input type="text"
            name="search"
            placeholder="Search..."
            onKeyUp={(event) => this.props.searchFilter(event.target.value)}/>
        </div>
      </Search>
    );
  }
}

function mapStateToProps(state) {
  return {
    
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({searchFilter}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SearchBox);
