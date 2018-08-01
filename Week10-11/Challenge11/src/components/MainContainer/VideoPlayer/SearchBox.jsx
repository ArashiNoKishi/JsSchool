import React from 'react';
import {TextField, InputAdornment} from '@material-ui/core';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Search} from "../../styles/StyledComponents.js";

import {searchFilter} from '../../../actions/filterStringAction.js';

class SearchBox extends React.Component {
  render() {
    
    return (
      <Search>
        <TextField
          name="search"
          placeholder="Filter..."
          InputProps={{startAdornment: (
            <InputAdornment position="start">
              <i className="fas fa-search"></i>
            </InputAdornment>
            ),
          }}
          onKeyUp={(event) => this.props.searchFilter(event.target.value)}/>
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