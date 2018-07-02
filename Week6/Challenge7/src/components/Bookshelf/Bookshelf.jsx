import React from 'react';
import MainContent from '../MainContainer/MainContent.jsx';

export class Header extends React.Component {
  constructor(){
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="header">
        <div className="logo">
          <img src="https://www.jobsity.com/themes/custom/jobsity/images/icons/logo2.svg" alt="Jobsity"/><span>JOBSITY</span>
        </div>
        <div className="title">
          <span className="titleText">Bookshelf</span>
        </div>
        <SearchBox onTextChange={text => this.props.filterUpdate(text)}/>
        <UserAvatar user={{name: 'Jacob Treml', avatar:'./src/css/images/User_avatar.png'}}/>
      </div>
    );
  }
}

class UserAvatar extends React.Component {
  render() {
    return (
      <div className="user">
        <span>{this.props.user.name}</span><i className="fas fa-angle-down"></i>
        <img src={this.props.user.avatar} alt="avatar"/>
      </div>
    );
  }
}

class SearchBox extends React.Component {
  render() {
    return (
      <div className="search">
        <div className="searchBox">
          <i className="fas fa-search"></i>
          <input type="text" name="search" placeholder="Search..." className="searchField" onKeyUp={event => this.props.onTextChange(event.target.value)}/>
        </div>
      </div>
    );
  }
}

export class Body extends React.Component {
  constructor(){
    super();
    this.state = {
      selectedShelf: 'All',
    };
  }

  componentDidMount(){

  }

  render() {
    return (
        <div className="mainContainer">
          <SidebarLeft shelf={this.state.selectedShelf} changeShelf={shelf => this.setState({selectedShelf: shelf})}/>
          <MainContent shelf={this.state.selectedShelf} filterString={this.props.filterString}/>
          <div className="sidebarRight"> 

          </div>
      </div>
    );
  }
}

class SidebarLeft extends React.Component {
  render() {
    let optionList = [
      {name:'All', icon:'globe'},
      {name:'Quito', icon:'globe'},
      {name:'Cartagena', icon:'globe'},
      {name:'Medellin', icon:'globe'},
      {name:'Digital', icon:'tablet-alt'}
    ];

    return (
      <div className="sidebar">
        <div className="menuBookshelf">
          <h3>MAIN</h3>
          <ul className="fa-ul">
            {optionList.map(shelf =>
              <BookshelfOption shelf={shelf} selected={this.props.shelf} selectShelf={shelf => this.props.changeShelf(shelf)}/>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

class BookshelfOption extends React.Component {
  render() {
    let itemClass = "loader";

    if (this.props.shelf.name == this.props.selected) {
      itemClass += " active";
    }

    let loaderId = "loader" + this.props.shelf.name;
    let iconClass = "fas fa-" + this.props.shelf.icon;

    return (
      <li className={itemClass} id={loaderId} onClick={event => this.props.selectShelf(this.props.shelf.name)}><span className="fa-li"><i className={iconClass}></i></span> {this.props.shelf.name}</li>
    );
  }
}
