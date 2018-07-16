import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {selectShelf} from '../../actions/selectShelfAction.js';

const ShelfOption = styled.li`
  {
    font-family: "PlutoSansCondLight", sans-serif;
    color: #7fccea;
    padding: 9.5px 8px;
    cursor: pointer;
    user-select: none;

    &.active {
      color: white;
    }
  }
`;

class BookshelfOption extends React.Component {
  render() {
    let itemClass = '';

    if (this.props.shelf.name == this.props.selectedShelf) {
      itemClass = 'active';
    }

    let loaderId = 'loader' + this.props.shelf.name;
    let iconClass = 'fas fa-' + this.props.shelf.icon;

    return (
      <ShelfOption className={itemClass}
        id={loaderId}
        onClick={(event) => this.props.selectShelf(this.props.shelf.name)}>
          <span className="fa-li">
            <i className={iconClass}></i>
          </span>
        {this.props.shelf.name}
      </ShelfOption>
    );
  }
}

function mapStateToProps(state) {
    return {
      selectedShelf: state.selectedShelf
    };
  }
  
  function matchDispatchToProps(dispatch) {
    return bindActionCreators({selectShelf}, dispatch);
  }

export default connect(mapStateToProps, matchDispatchToProps)(BookshelfOption);