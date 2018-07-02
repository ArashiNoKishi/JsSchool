import React from 'react';
import { Header, Body } from './Bookshelf/Bookshelf.jsx';


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      filterString: ''
    };
  }

  render() {
    return (
      <div>
        <Header filterUpdate={filter => this.setState({filterString: filter})}/>
        <Body filterString={this.state.filterString}/>
      </div>
    );
  }
}

export default App;
