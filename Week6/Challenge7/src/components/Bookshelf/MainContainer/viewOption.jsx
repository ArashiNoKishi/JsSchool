import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {selectView} from '../../../actions/selectViewAction.js';

class ViewOption extends React.Component {
    render() {
      let viewClass = '';
  
      if (this.props.option.view == this.props.selectedView) {
        viewClass = 'active';
      }
  
      let viewId = this.props.option.view;
      let iconClass = 'fas fa-th-' + this.props.option.icon;
      return (
        <span className={viewClass}
          id={viewId}
          onClick={(event) => this.props.selectView(this.props.option.view)}>
            <i className={iconClass}></i>
        </span>
      );
    }
  }
  
  function mapStateToProps(state) {
    
    return {
      selectedView: state.selectedView
    };
  }
  
  function matchDispatchToProps(dispatch) {
    return bindActionCreators({selectView}, dispatch);
  }
  
  export default connect(mapStateToProps, matchDispatchToProps)(ViewOption);
  