import React, {Component} from 'react';
import {ListItem} from '@material-ui/core';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {PlaylistDiv} from "../../styles/StyledComponents.js";

import SearchBox from './SearchBox.jsx';
import Clip from './Clip.jsx';
import {updateClipList} from '../../../actions/updateClipListAction.js';

class Playlist extends Component {
  constructor() {
    super();

    this.state = {
      clipList: []
    };
  }

  componentWillMount() {
    let clipList = JSON.parse(localStorage.getItem('clipList'))?
    JSON.parse(localStorage.getItem('clipList')):
    [
      {id: 1, name: 'Clip#1', start: 0, end: 17, tags: ['a','b','c']},
      {id: 2, name: 'Clip#2', start: 23, end: 30, tags: ['g','t','w']},
      {id: 3, name: 'Clip#3', start: 31, end: 45, tags: ['j','q','f']}
    ];
    localStorage.setItem('clipList', JSON.stringify(clipList));
    this.props.updateClipList(clipList);
  }

  render() {
    let fullVideo = {id: 0, name: 'Full Video', start: 0, end: 52, tags: []};

    return (
      <PlaylistDiv>
        <div>
          <span>Clip list: (# of clips: {this.props.clipList.length})</span>
          <SearchBox/>
        </div>
        <ul>
          <ListItem divider><Clip clip={fullVideo}/></ListItem>
          {this.props.clipList &&
            this.props.clipList.filter((clip) =>
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
    clipList: state.clipList
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({updateClipList}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Playlist);