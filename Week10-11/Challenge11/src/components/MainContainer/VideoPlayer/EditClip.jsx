import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';  
import {TextField, Button} from '@material-ui/core';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';

import {updateClipList} from '../../../actions/updateClipListAction.js';  
import {EditClipDiv} from '../../styles/StyledComponents.js';

class EditClip extends Component {
  constructor() {
    super();

    this.state = {
      clipName: '',
      clipStart: 0,
      clipEnd: 0,
      clipTags: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({
      clipName: this.props.clip.name,
      clipStart: this.props.clip.start,
      clipEnd: this.props.clip.end,
      clipTags: this.props.clip.tags.join(', ')
    });
  }

  handleChange(e, selector) {
    switch (selector) {
      case 'name':
        this.setState({clipName: e.target.value});
        break;
      
      case 'start':
        if (this.parseTime(e.target.value) > (-1)) {
          this.setState({clipStart: this.parseTime(e.target.value)});
        }
        break;

      case 'end':
        if (this.parseTime(e.target.value) > (-1)) {
          this.setState({clipEnd: this.parseTime(e.target.value)});
        }
        break;

      case 'tags':
        this.setState({clipTags: e.target.value});
        break;

      default:
        break;
    }
  }

  toHHMMSS(time) {
    let hours   = Math.floor(time / 3600);
    let minutes = Math.floor((time - (hours * 3600)) / 60);
    let seconds = time - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
      hours   = "0"+hours;
    }

    if (minutes < 10) {
      minutes = "0"+minutes;
    }

    if (seconds < 10) {
      seconds = "0"+seconds;
    }

    return hours+':'+minutes+':'+seconds;
  }

  parseTime(time) {
    let a = time.split(':');

    let seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    return seconds;
  }

  handleCancel() {
    this.props.toggleEdit();
    this.setState({
      clipName: this.props.clip.name,
      clipStart: this.props.clip.start,
      clipEnd: this.props.clip.end,
      clipTags: this.props.clip.tags.join(',')
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    
    let clipList = this.props.clipList;

    let newClip = {
      id: this.props.clip.id,
      name: this.state.clipName,
      start: this.state.clipStart,
      end: this.state.clipEnd,
      tags: this.state.clipTags.length > 0?this.state.clipTags.split(','):[],
    };

    let oldClip = clipList.list.filter((clip) => clip.id === newClip.id)[0];
    
    clipList.list.splice(clipList.list.indexOf(oldClip), 1, newClip);

    localStorage.setItem('clipList', JSON.stringify(clipList));
    this.props.updateClipList(clipList);
    this.props.toggleEdit();
  }
  
  render() {
    return (
      <EditClipDiv>
        <div className="formTitle">
          Edit Clip
        </div>
        <ValidatorForm autoComplete="off" onSubmit={this.handleSubmit}>
          <TextValidator
            id="clipName"
            label="Clip Name"
            name="clipName"
            className="clipName"
            validators={['required']}
            errorMessages={['this field is required']}
            value={this.state.clipName}
            onChange={(e) => this.handleChange(e, 'name')}
            margin="normal"
          />
          <TextValidator
            id="clipStart"
            label="Start time"
            name="clipStart"
            className="clipTime"
            helperText="hh:mm:ss"
            validators={['isValidTimeRange']}
            errorMessages={['must be a valid time range']}
            value={this.toHHMMSS(this.state.clipStart)}
            onChange={(e) => this.handleChange(e, 'start')}
            margin="normal"
          />
          <span className="separator">-</span>
          <TextValidator
            id="clipEnd"
            label="End time"
            name="clipEnd"
            className="clipTime"
            helperText="hh:mm:ss"
            validators={['isValidTimeRange']}
            errorMessages={['must be a valid time range']}
            value={this.toHHMMSS(this.state.clipEnd)}
            onChange={(e) => this.handleChange(e, 'end')}
            margin="normal"
          />
          <TextField
            id="clipTags"
            label="Tags"
            name="clipTags"
            className="clipTags"
            value={this.state.clipTags}
            onChange={(e) => this.handleChange(e, 'tags')}
            margin="normal"
          />
          <Button type="submit" variant="contained"><i class="fas fa-edit"></i> Edit Clip</Button>
          <Button variant="contained" onClick={this.handleCancel}><i class="fas fa-times"></i> Cancel</Button>
        </ValidatorForm>
      </EditClipDiv>
    );
  }
}

function mapStateToProps(state) {
  return {
    clipList: state.clipList,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({updateClipList}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(EditClip);