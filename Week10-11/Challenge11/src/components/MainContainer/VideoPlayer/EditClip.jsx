import React, {Component} from 'react';
import {TextField, Button} from '@material-ui/core';

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
  }

  componentDidMount() {
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
      clipTags: this.props.clip.tags.join(', ')
    });
  }
  
  render() {
    return (
      <EditClipDiv>
        <div className="formTitle">
          Edit Clip
        </div>
        <form autoComplete="off">
          <TextField
            id="clipName"
            label="Clip Name"
            name="clipName"
            required
            className="clipName"
            value={this.state.clipName}
            onChange={(e) => this.handleChange(e, 'name')}
            margin="normal"
          />
          <TextField
            id="clipStart"
            label="Start time"
            name="clipStart"
            required
            className="clipTime"
            helperText="hh:mm:ss"
            value={this.toHHMMSS(this.state.clipStart)}
            onChange={(e) => this.handleChange(e, 'start')}
            margin="normal"
          />
          <span className="separator">-</span>
          <TextField
            id="clipEnd"
            label="End time"
            name="clipEnd"
            required
            className="clipTime"
            helperText="hh:mm:ss"
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
        </form>
      </EditClipDiv>
    );
  }
}

export default EditClip;