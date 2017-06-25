import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import App from './App';

var styles = {
  header: {
    textAlign: "center",
    color: "#ffffff"
  },
    controls: {
      background: "#013398"
    },
    banner: {
      
    },
    navigation:{
      background: "#6698cb"
    },
}

export default class Header extends Component {
  constructor(props) {
    super();
    this.state = {
      show: true
    }
  }

  render() {
    return (
      <Row>
        <Col md={12}>
        <div id="header" style={styles.header}>
          <div id="controls" style={styles.controls}>
            <Row>
              <Col xs={12}>
                <Home />
                  <Col id="home" xs={4}>
                  </Col>
                  <Col id="search" xs={4}>
                    Search Bar
                  </Col>
                  <Col id="login" xs={4}>
                    SignUp
                  </Col>
              </Col>
            </Row>
            <div id="banner">
              <img style={{width: 730, height: 100}} src="http://i.imgur.com/kNpUpOm.jpg" alt=" " />
            </div>
          </div>
          <div id="navigation" style={styles.navigation}>
            <table><tbody>
              <tr>
                <td>
                  Home
                  Browse
                  Search
                  Invite
                  Rank
                  Mail
                  Blog
                  Favorites
                  Forum
                  Groups
                  Events
                  Games
                  Music
                  Classifieds
                </td>
              </tr>
            </tbody></table>
          </div>
         </div>
        </Col>
      </Row>
    )
  }
}

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      refresh: false
    };

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    var self = this;
    self.setState = true;
    if (self.refresh === true) {
      window.location.href = e.target.href;
    }
  }
  render() {
    return (
      <a onClick={this.handleClick.bind(this)} {...this.props}>Home</a>
    )
    
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