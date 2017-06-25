import React, { Component } from 'react';
import './App.css';
import './config';

export default class Login extends Component {
  var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
  
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'passwd'
    },
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

  render () {
    return (
      <form action="/login" method="post">
        <div>
            <label>Username:</label>
            <input type="text" name="username"/>
        </div>
        <div>
            <label>Password:</label>
            <input type="password" name="password"/>
        </div>
        <div>
            <input type="submit" value="Log In"/>
        </div>
      </form>
    );
  }
}

//// Using steps from blog prior to using Passportjs: 
//// https://auth0.com/blog/adding-authentication-to-your-react-flux-app/#
//  constructor() {
//    this.state = {
//      user: ‘’,
//      password: ‘’
//    };
//  }
//
//  // This will be called when the user clicks on the login button
//  login(e) {
//    e.preventDefault();
//    // Here, we call an external AuthService. We’ll create it in the next step
//    Auth.login(this.state.user, this.state.password)
//      .catch(function(err) {
//        console.log(“Error logging in”, err);
//      });
//  }
//
//  render() {
//    return (
//        <form role=“form”>
//        <div className=“form-group”>
//          <input type=“text” valueLink={this.linkState(‘user’)}placeholder=“Username” />
//          <input type=“password” valueLink={this.linkState(‘password’)} placeholder=“Password” />
//        </div>
//        <button type=“submit” onClick={this.login.bind(this)}>Submit</button>
//      </form>
//    </div>
//    );
//  }
//}