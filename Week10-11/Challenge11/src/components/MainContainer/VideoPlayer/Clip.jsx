import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import width from 'text-width';

import {ClipDiv} from "../../styles/StyledComponents.js";
import EditClip from './EditClip.jsx';

import {IconButton, Collapse, Button} from '@material-ui/core';

import { changeClip } from "../../../actions/clipChangeAction.js";
import { updateClipList } from "../../../actions/updateClipListAction.js";

class Clip extends Component {
  constructor() {
    super();

    this.state = {
      edit: false,
      delete: false,
      clipNameHeight: 0
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

  handleDelete(e) {
    e.preventDefault();
    
    let clipList = this.props.clipList;
    let selectedClip = clipList.list.filter((clip) => clip.id === this.props.clip.id)[0];
    clipList.list.splice(clipList.list.indexOf(selectedClip), 1);

    if (this.props.clip === this.props.selectedClip) {
      this.props.changeClip();
    }

    localStorage.setItem('clipList', JSON.stringify(clipList));
    this.props.updateClipList(clipList);
    this.toggleDelete();
  }

  render() {
    let start = this.props.clip.start, end = this.props.clip.end;
    let duration = end - start;

    let hoverable = width(this.props.clip.name, {family: 'roboto', size: '1.2em'}) > 150 ? '':'nohover';
    let selected = this.props.clip.id == this.props.selectedClip.id ? 'selected':'';

    return (
      <ClipDiv className={selected}>
        <div>
          <div className="clipTitle" onClick={() => this.props.changeClip(this.props.clip)}>
            <p className={hoverable} ref={ (clipName) => this.clipName = clipName}>{this.props.clip.name}</p>
          </div>
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
        <div className="operations">
          <Collapse in={this.state.edit}>
            <EditClip clip={this.props.clip} toggleEdit={this.toggleEdit}/>
          </Collapse>
          <Collapse in={this.state.delete}>
            <span>Are you sure you want to delete this clip?</span>
            <Button variant="contained" color="secondary" onClick={(e) => this.handleDelete(e)}>
              <i class="fas fa-trash"></i> Delete
            </Button>
            <Button variant="contained" onClick={this.toggleDelete}><i class="fas fa-times"></i> Cancel</Button>
          </Collapse>
        </div>
      </ClipDiv>
    );
  }
}

function mapStateToProps(state) {
  return {
    clipList: state.clipList,
    selectedClip: state.clip
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({changeClip, updateClipList}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Clip);