import React, { Component } from 'react';
import './App.css';
//import './config';


export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      show: false};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    var self = this;
    localStorage.removeItem('token');
    self.state.show = false;
    self.forceUpdate();
  }


  render () {
    return (
      <div id="logout">
      {
        this.props.loggedIn && <button type="submit" onSubmit={ () => this.handleSubmit()}>Logout</button>
      }
      </div>
    );
  }
}