import React, {Component} from 'react';
import {Button, LinearProgress} from '@material-ui/core';
import {connect} from 'react-redux';

import {PlayerDiv, ControlsDiv} from "../../styles/StyledComponents.js";


class Player extends Component {
  constructor(){
    super();
    this.state = {
      paused: true,
      progress: 0,
      time: 0,
      duration: 0
    };
  
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
    this.playPause = this.playPause.bind(this);
    this.handleDuration = this.handleDuration.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
    this.handleFullScreen = this.handleFullScreen.bind(this);
  }

  pause() {
    this.refs.player.pause();
    this.setState({paused: this.refs.player.paused});
  }

  play() {
    this.refs.player.play();
    this.setState({paused: this.refs.player.paused});
  }

  playPause() {
    this.state.paused?
    this.play():
    this.pause();
  }

  handleProgress() {
    let progress;
    progress = this.refs.player.currentTime==0?0:this.refs.player.currentTime/this.refs.player.duration*100;
    
    this.setState({progress, time: this.refs.player.currentTime});
  }

  handleSeek(e) {
    let seekTime = e.pageX - e.target.offsetLeft;

    seekTime = seekTime/e.target.offsetWidth * this.refs.player.duration;
    this.refs.player.currentTime = seekTime;
  }

  handleFullScreen() {
    if (this.refs.player.requestFullscreen) {
      this.refs.player.requestFullscreen();
    } else if (this.refs.player.mozRequestFullScreen) {
      this.refs.player.mozRequestFullScreen();
    } else if (this.refs.player.webkitRequestFullscreen) {
      this.refs.player.webkitRequestFullscreen();
    }
  }

  handleDuration() {
    this.setState({duration: this.refs.player.duration});
  }

  toHHMMSS(time) {
    let hours   = '';
    let minutes = '0:';
    let seconds = Math.floor((time % 3600) % 60);

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

  render() {
    let vidUrl = this.props.video.url+'#t='+this.props.clip.start+','+this.props.clip.end;
    let duration;
    return (
      <PlayerDiv>
        <video 
          ref="player" 
          src={vidUrl} 
          onTimeUpdate={() => this.handleProgress()} 
          onClick={this.playPause}
          onPlay={this.play}
          onPause={this.pause}
          onEnded={this.pause}
          onLoadedMetadata={this.handleDuration}/>
        <ControlsDiv>
          <Button variant="flat" size="small"><i class="fas fa-fast-backward"></i></Button>
          <Button variant="flat" size="small" onClick ={this.playPause}><i class={this.state.paused?"fas fa-play":"fas fa-pause"}></i></Button>
          <Button variant="flat" size="small"><i class="fas fa-fast-forward"></i></Button>
          <span className="time">{this.toHHMMSS(this.state.time)}/{this.toHHMMSS(this.state.duration)}</span>
          <LinearProgress 
            ref="progress"
            variant="determinate" 
            value={this.state.progress} 
            onClick={(e) => this.handleSeek(e)}/>
          <Button variant="flat" size="small"><i class="fas fa-volume-down"></i></Button>
          <Button variant="flat" size="small"><i class="fas fa-volume-up"></i></Button>
          <Button variant="flat" size="small"><i class="fas fa-volume-off"></i></Button>
          <Button variant="flat" size="small" onClick={this.handleFullScreen}><i class="fas fa-expand"></i></Button>
        </ControlsDiv>
        <span>{this.props.video.title} {this.props.clip.id != 0? '- '+this.props.clip.name:null}</span>
      </PlayerDiv>
    );
  }
}

function mapStateToProps(state) {
  return {
    clip: state.clip,
    video: state.video
  };
}

export default connect(mapStateToProps)(Player);