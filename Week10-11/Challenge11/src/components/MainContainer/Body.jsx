import React from 'react';

import {MainContainer} from "../styles/StyledComponents.js";

import Player from './VideoPlayer/Player.jsx';
import Playlist from './VideoPlayer/Playlist.jsx';
import CreateClip from './VideoPlayer/CreateClip.jsx';

export class Body extends React.Component {
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

export default Body;