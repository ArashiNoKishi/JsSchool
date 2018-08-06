import React, {Component} from 'react';
import {ListItem, Switch} from '@material-ui/core';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {PlaylistDiv} from "../../styles/StyledComponents.js";

import SearchBox from './SearchBox.jsx';
import Clip from './Clip.jsx';
import {updateClipList} from '../../../actions/updateClipListAction.js';
import {autoPlay} from '../../../actions/autoPlayAction.js';

class Playlist extends Component {
  constructor() {
    super();

    this.handleAutoPlay = this.handleAutoPlay.bind(this);
  }

  componentWillMount() {
    let clipList = JSON.parse(localStorage.getItem('clipList'))?
    JSON.parse(localStorage.getItem('clipList')):
    {
      idCounter: 3,
      list: [
        {id: 0, name: 'Full Video', start: 0, end: 52, tags: []},
        {id: 1, name: 'Clip#1', start: 0, end: 17, tags: ['a','b','c']},
        {id: 2, name: 'Clip#2', start: 23, end: 30, tags: ['g','t','w']},
        {id: 3, name: 'Clip#3', start: 31, end: 45, tags: ['j','q','f']}
      ]
    };

    localStorage.setItem('clipList', JSON.stringify(clipList));
    this.props.updateClipList(clipList);
  }

  handleAutoPlay(e) {
    this.props.autoPlay(e.target.checked);
  }

  render() {
    return (
      <PlaylistDiv>
        <div>
          <span>Clip list:</span>
          <SearchBox/>
        </div>
        <ul>
          <ListItem divider className="listOptions"> 
            <span> # of clips: {this.props.listLength-1}</span> 
            <span className="autoplay">Autoplay <Switch onChange={(e) => this.handleAutoPlay(e)}/></span> 
          </ListItem>
          {this.props.clipList.list &&
            this.props.clipList.list.filter((clip) =>
            clip.name.toLowerCase().includes(this.props.filterString.toLowerCase()) ||
            clip.tags.join(' ').toLowerCase().includes(this.props.filterString.toLowerCase()))
           .map((clip) => 
            <ListItem divider>
              <Clip clip={clip}/>
            </ListItem>
          )}
        </ul>
      </PlaylistDiv>
    );
  }
}

function mapStateToProps(state) {
  return {
    filterString: state.filterString,
    clipList: state.clipList,
    listLength: state.listLength
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({updateClipList, autoPlay}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Playlist);