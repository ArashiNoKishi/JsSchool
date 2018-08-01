import React, {Component} from 'react';
import styled, {injectGlobal} from 'styled-components';

import Header from './MainContainer/Header.jsx';
import Body from './MainContainer/Body.jsx';

injectGlobal`
  body {
    font-family: 'roboto';
  }
`;

class App extends Component {
  render(){
    return (
      <div>
        <Header/>
        <Body/>
      </div>
  );
  }
}

export default App;