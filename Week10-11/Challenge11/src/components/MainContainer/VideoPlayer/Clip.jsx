import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {ClipDiv} from "../../styles/StyledComponents.js";
import EditClip from './EditClip.jsx';

import {IconButton, Collapse} from '@material-ui/core';

import { changeClip } from "../../../actions/clipChangeAction.js";

class Clip extends Component {
  constructor() {
    super();

    this.state = {
      edit: false,
      delete: false
    };

    this.toggleDelete = this.toggleDelete.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toDuration(time) {
    let hours   = '';
    let minutes = '';
    let seconds = ((time % 3600) % 60);
    let units = 's';

    if (time > 60) {
      minutes = Math.floor((time % 3600) / 60)+':';
      units = 'm';

      if (seconds < 10) {
        seconds = "0"+seconds;
      }
  
      if (time > 3600) {
        hours = Math.floor(time / 3600)+':';
        units = 'h';
      }
    }

    return hours+minutes+seconds+units;
  }

  toHHMMSS(time) {
    let hours   = '';
    let minutes = '0:';
    let seconds = ((time % 3600) % 60);

    if (time > 60) {
      minutes = Math.floor((time % 3600) / 60)+':';

      if (time > 3600) {
        hours = Math.floor(time / 3600)+':';
      }
    }

    if (seconds < 10) {
      seconds = "0"+seconds;
    }

    return hours+minutes+seconds;
  }

  toggleEdit() {
    this.setState({edit: !this.state.edit, delete: false});
  }

  toggleDelete() {
    this.setState({delete: !this.state.delete, edit: false});
  }

  render() {
    let start = this.props.clip.start, end = this.props.clip.end;
    let duration = end - start;

    let waiting = true;

    return (
      <ClipDiv>
        <div>
          <div className="clipTitle" onClick={() => this.props.changeClip(this.props.clip)}>{this.props.clip.name}</div>
          <div className="clipTime">Duration: {this.toDuration(duration)} ({this.toHHMMSS(this.props.clip.start)}<span className="separator">-</span>{this.toHHMMSS(this.props.clip.end)})</div>
          {this.props.clip.tags.length ?
          <div className="clipTags">Tags: <span>{this.props.clip.tags.join(', ')}</span></div>
          :null}
        </div>
        {this.props.clip.id != 0 &&
          <span className="clipOptions">
            <IconButton onClick={this.toggleEdit}>
              <i class="fas fa-edit"></i>
            </IconButton>
            <IconButton onClick={this.toggleDelete}>
              <i class="fas fa-trash"></i>
            </IconButton>
          </span>}
        <Collapse in={this.state.edit}>
          <EditClip clip={this.props.clip} toggleEdit={this.toggleEdit}/>
        </Collapse>
        <Collapse in={this.state.delete}>
        </Collapse>
      </ClipDiv>
    );
  }
}

function mapStateToProps(state) {
  return {
    
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({changeClip}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Clip);