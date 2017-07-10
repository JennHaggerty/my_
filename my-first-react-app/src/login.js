import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

//import './config';

export default class Login extends Component {
  constructor(props) {
    super(props);
    debugger
    this.state = { 
      show: false };

    //this.handleClick = this.handleClick.bind(this);
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
      // sets cookie in local storage
      localStorage.setItem('token', response.data.token);
      // sets the login state to 'true'
      self.props.toggleLogin(true);
      // hides the login form
      self.state.show = false;
      //self.forceUpdate();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render () {
    return (
      <div>
      <a onClick={ () => this.handleClick() }>Login</a>
      { this.state.show 
        ? <form onSubmit={event => this.handleSubmit(event)}>
            <input type="text" placeholder="email" name="email"/> <br />
            <input type="password" placeholder="password" name="password"/> <br />
            <button onSubmit={ () => this.handleSubmit() }>wtf</button>
          </form>
        : null
       }
      </div>
    );
  }
}
