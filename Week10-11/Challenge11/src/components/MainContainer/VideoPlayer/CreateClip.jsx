import React, {Component} from 'react';
import {Button, 
        ExpansionPanel, 
        ExpansionPanelSummary, 
        ExpansionPanelDetails, 
        Typography, 
        TextField} from '@material-ui/core';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';        
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';        

import {CreateClipDiv} from "../../styles/StyledComponents.js";
import {updateClipList} from '../../../actions/updateClipListAction.js';

class CreateClip extends Component {
  constructor() {
    super();

    this.state = {
      clipName: '',
      clipStart: 0,
      clipEnd: 0,
      clipTags: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isValidTimeRange', (value) => {
      let flag = true;
      if (this.state.clipEnd < this.state.clipStart) {
        flag = false;
      }
      
      if (this.state.clipEnd > this.props.video.duration) {
        flag = false;
      }
      
      if (this.state.clipStart < 0) {
        flag = false;
      }

      return flag;
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

  handleSubmit(e) {
    e.preventDefault();
    
    let clipList = this.props.clipList;

    let newClip = {
      id: clipList.length+1,
      name: this.state.clipName,
      start: this.state.clipStart,
      end: this.state.clipEnd,
      tags: this.state.clipTags.length > 0?this.state.clipTags.split(','):[],
    };
    clipList.push(newClip);

    this.props.updateClipList(clipList);
    this.refs.panel.expanded = false;
    this.setState({
      clipName: '',
      clipStart: 0,
      clipEnd: 0,
      clipTags: []
    });
  }

  render() {
    return (
      <CreateClipDiv>
        <ExpansionPanel ref="panel">
          <ExpansionPanelSummary expandIcon={<i class="fas fa-angle-down"></i>}>
            <Typography>Add Clips</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
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
              <Button type="submit" variant="contained"><i class="fas fa-plus"></i> Add Clip</Button>
            </ValidatorForm>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </CreateClipDiv>
    );
  }
}

function mapStateToProps(state) {
  return {
    clipList: state.clipList,
    video: state.video
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({updateClipList}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CreateClip);