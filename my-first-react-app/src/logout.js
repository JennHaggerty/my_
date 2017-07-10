import React, { Component } from 'react';
import './App.css';
//import './config';


export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = { };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    var self = this;
    localStorage.removeItem('token');
    self.props.toggleLogin(false);
  }


  render () {
    return (
      <div id="logout" className="toggleShow">
        <button type="submit" onClick={ () => this.handleSubmit()}>Logout</button>
      </div>
    );
  }
}