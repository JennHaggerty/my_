import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import ToggleDisplay from './toggledisplay.js';

//import './config';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      show: true };

    //this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleClick(e) {
    this.setState({ show: !this.state.show });
  }
  handleSubmit(e) {
    e.preventDefault();
    var _details = {};
    var self = this;
    ['email', 'password']
    .forEach(function (fieldToChange) {
      _details[fieldToChange] = document.querySelector('[name="'+fieldToChange+'"]').value;
    })
    axios.post('http://localhost:3001/login', _details)
    .then(function successcallback(response){
      // update the component state
//      self.state.show = true;
      // re-render the component
      localStorage.setItem('token', response.data.token);
      self.props.toggleLogin(true);
      self.state.show = true;
      self.forceUpdate();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render () {
    return (
      <div>
        <a onClick={ () => this.handleClick() }>Login</a>
        <ToggleDisplay hide={this.props.show}>
          <form onSubmit={event => this.handleSubmit(event)}>
                <input type="text" placeholder="email" name="email"/> <br />
                <input type="password" placeholder="password" name="password"/> <br />
                <input type="submit" value="Log In"/>
          </form>
        </ToggleDisplay>
        </div>
    );
  }
}
