import React, { Component } from 'react';
import './App.css';
//import './config';


export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      show: true};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({ show: !this.state.show });
  }

  handleSubmit(e) {
    var self = this;
    localStorage.removeItem('token');
    self.forceUpdate();
  }


  render () {
    return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <a type="submit" onClick={ () => this.handleClick() }>Logout</a>
      </form>
      
    );
  }
}