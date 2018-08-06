import React, {Component} from 'react';
import {Button, LinearProgress, CircularProgress} from '@material-ui/core';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import width from 'text-width';
import {HotKeys} from 'react-hotkeys';

import {changeClip} from "../../../actions/clipChangeAction.js";

import {PlayerDiv, ControlsDiv} from "../../styles/StyledComponents.js";


class Player extends Component {
  constructor(){
    super();
    this.state = {
      paused: true,
      progress: 0,
      time: 0,
      duration: 0,
      playingNext: false,
      completed: 0,
      counter: 3,
    };
  
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
    this.playPause = this.playPause.bind(this);
    this.handleAutoPlay = this.handleAutoPlay.bind(this);
    this.handleControls = this.handleControls.bind(this);
    this.handleDuration = this.handleDuration.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
  }

  pause() {
    this.refs.player.pause();
    this.setState({paused: this.refs.player.paused});
    if (Math.floor(this.refs.player.currentTime) == this.props.clip.end) {
      this.handleAutoPlay();
    };
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

  handleAutoPlay() {
    if (this.props.autoPlay) {
      this.setState({playingNext: true, counter: 3, completed: 0});
      let countDown = setInterval(()=>{
        this.setState({completed: this.state.completed+=3});
      },100);
  
      let countDownNumber = setInterval(()=>{
        this.setState({counter: --this.state.counter});
      },1000);
  
      setTimeout(() =>{
        clearInterval(countDown);
        clearInterval(countDownNumber);
        this.setState({completed: 100, playingNext: false});
        this.handleControls('next');
      }, 3666);
    }
  }

  handleSeek(e) {
    let seekTime = e.pageX - e.target.offsetLeft;

    seekTime = seekTime/e.target.offsetWidth * this.refs.player.duration;
    this.refs.player.currentTime = seekTime;
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

  handleControls(selector) {
    let clipList, clip, index;

    switch (selector) {
      case 'voldown':
        this.refs.player.volume - 0.10 < 0 ?0:this.refs.player.volume-=0.10;
        break;
      case 'volup':
        this.refs.player.volume + 0.10 > 1 ?1:this.refs.player.volume+=0.10;
        break;
      case 'volmute':
        this.refs.player.muted = !this.refs.player.muted;
        this.setState({muted: this.refs.player.muted});
        break;
      case 'previous':
        clipList = this.props.clipList;
        clip = clipList.list.filter((clip) => clip.id === this.props.clip.id)[0];
        index = Math.max(clipList.list.indexOf(clip)-1,0);
        
        this.props.changeClip(clipList.list[index]);
        this.refs.player.load();
        break;
      case 'next':
        clipList = this.props.clipList;
        clip = clipList.list.filter((clip) => clip.id === this.props.clip.id)[0];
        index = clipList.list.indexOf(clip)+1;
        if (!(clipList.list.indexOf(clip)+1>clipList.list.length-1)) {
          this.props.changeClip(clipList.list[index]);
          this.refs.player.load();
        }
        break;
      case 'fullscreen':
        if (this.refs.player.requestFullscreen) {
          this.refs.player.requestFullscreen();
        } else if (this.refs.player.mozRequestFullScreen) {
          this.refs.player.mozRequestFullScreen();
        } else if (this.refs.player.webkitRequestFullscreen) {
          this.refs.player.webkitRequestFullscreen();
        }
        break;
    
      default:
        break;
    }
  }

  render() {
    let vidUrl = this.props.video.url+'#t='+this.props.clip.start+','+this.props.clip.end;
    let hoverable = width(this.props.clip.name, {family: 'roboto', size: '2em'}) > 394 ? '':'nohover';
    const handlers = {
      'playPause': this.playPause,
      'next': () => this.handleControls('next'),
      'previous': () => this.handleControls('previous'),
    };
    const hotkeysMap = {
      'playPause': 'k',
      'next': 'l',
      'previous': 'j',
    };

    return (
      <HotKeys keyMap={hotkeysMap} handlers={handlers} focused style={{outline: 0}}>
        <PlayerDiv>
          <div className="videoTitle"><p className={hoverable}>{this.props.video.title} {this.props.clip.id != 0? <span>- {this.props.clip.name}</span>:null}</p></div>
          {this.state.playingNext&&
          <span className="autoplay">
            <Button
              variant="fab">
              {this.state.counter}
            </Button>
            <CircularProgress
              variant="static"
              value={this.state.completed}
              size={89}
              />
          </span>}
          <video 
            ref="player" 
            src={vidUrl}
            autoPlay={this.props.autoPlay}
            onTimeUpdate={() => this.handleProgress()}
            onClick={this.playPause}
            onPlay={this.play}
            onPause={this.pause}
            onEnded={this.pause}
            onLoadedMetadata={this.handleDuration}/>
          <ControlsDiv>
            <Button variant="flat" size="small" onClick={() => this.handleControls('previous')}><i class="fas fa-step-backward"></i></Button>
            <Button variant="flat" size="small" onClick ={this.playPause}><i class={this.state.paused?"fas fa-play":"fas fa-pause"}></i></Button>
            <Button variant="flat" size="small" onClick={() => this.handleControls('next')}><i class="fas fa-step-forward"></i></Button>
            <span className="time">{this.toHHMMSS(this.state.time)}/{this.toHHMMSS(this.state.duration)}</span>
            <div className="progress">
              <LinearProgress 
              ref="progress"
              variant="determinate" 
              value={this.state.progress} 
              className="progressBar"
              onClick={(e) => this.handleSeek(e)}>
              </LinearProgress>
              {this.props.clip.id == 0 ? this.props.clipList.list.map((clip) => clip.id != 0?<span className="marker" style={{left: (17.8+(clip.start/this.refs.player.duration)*32.4)+'em'}}><i class="fas fa-map-marker" onClick={() => this.props.changeClip(clip)}></i></span>:null):null}
            </div>
            <Button variant="flat" size="small" onClick={() => this.handleControls('voldown')}><i class="fas fa-volume-down"></i></Button>
            <Button variant="flat" size="small" onClick={() => this.handleControls('volup')}><i class="fas fa-volume-up"></i></Button>
            <Button variant="flat" size="small" color={this.state.muted?'primary':null} onClick={() => this.handleControls('volmute')}><i class="fas fa-volume-off"></i></Button>
            <Button variant="flat" size="small" onClick={() => this.handleControls('fullscreen')}><i class="fas fa-expand"></i></Button>
          </ControlsDiv>
        </PlayerDiv>
      </HotKeys>
    );
  }
}

function mapStateToProps(state) {
  return {
    clip: state.clip,
    video: state.video,
    clipList: state.clipList,
    autoPlay: state.autoPlay
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({changeClip}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Player);