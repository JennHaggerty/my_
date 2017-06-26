import React, { Component } from 'react';
import './App.css';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Login from './login';

var styles = {
  header: {
    textAlign: "center"
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
                  <Col id="home" xs={4}>
                    <a href="/">Home</a>
                  </Col>
                  <Col id="search" xs={4}>
                    Search Bar
                  </Col>
                  <Col id="login" xs={4}>
                    <Login />
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
      refresh: true
    };

    this.handleClick = this.handleClick.bind(this);
  }
  onClicked = function(e){
e.stopPropagation();
}
  render() {
    return (
      <a href={this.props.url} onClick={this.onClicked} data-url={this.props.url}>Home</a>
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