import React from 'react';

import {MainContainer} from "../../styles/StyledComponents.js";

import Player from './Player.jsx';
import Playlist from './Playlist.jsx';
import CreateClip from './CreateClip.jsx';


export class VideoPlayer extends React.Component {
  render() {    
    return (
      <MainContainer>
        <Player/>
        <div className="Sidebar">
          <CreateClip/>
          <Playlist/>
        </div>
      </MainContainer>
    );
  }
}

export default VideoPlayer;