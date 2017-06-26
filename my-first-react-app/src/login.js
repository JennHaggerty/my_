import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

//import './config';

var styles = {
  a: {
    color: "#ffffff"
  }
}


export default class Login extends Component {
  constructor(props) {
    super();
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
    var details = {};
    var self = this;
    ['email', 'password']
    .forEach(function (fieldToChange) {
      details[fieldToChange] = document.querySelector('[name="'+fieldToChange+'"]').value;
    })
    axios.post('http://localhost:3001/login', details)
    .then(function successcallback(response){
      // update the component state
//      self.state.show = true;
      // re-render the component
      self.forceUpdate();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render () {
    return (
      <div><a onClick={ () => this.handleClick() }>Login</a>
        <ToggleDisplay hide={this.state.show}>
          <form onSubmit={event => this.handleSubmit(event)}>
            <div>
                <input type="text" placeholder="email" name="email"/> <br />
                <input type="password" placeholder="password" name="password"/> <br />
                <input type="submit" value="Log In"/>
            </div>
          </form>
        </ToggleDisplay>
      </div>
    );
  }
}

function isDefined(val) { return val != null; }
class ToggleDisplay extends Component {
  propTypes: {
    hide: React.PropTypes.bool,
    show: React.PropTypes.bool
  }
  shouldHide(props) {
    var shouldHide;
    if(isDefined(this.props.show)) { 
      shouldHide = !this.props.show;
    }
    else if(isDefined(this.props.hide)) {
      shouldHide = this.props.hide;
    }
    else {
      shouldHide = false;
    }

    return shouldHide;    
  }
  render() {
    var style = {};
    
    if(this.shouldHide()) {
      style.display = 'none';
    }

    return (
      <div style={style} {...this.props} />
    );
  }
}