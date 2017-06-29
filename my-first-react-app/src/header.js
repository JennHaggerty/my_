import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Login from './login';
import Logout from './logout';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    var details = this.state.details[0];
    var self = this;

    axios.post('http://localhost:3001/' + this.props.userId, 
      details, {
      headers: {'Authorization': localStorage.token}
    })
    .then(function successcallback(response){
      // update the component state
      //self.state.show = true;
      // re-render the component
      self.forceUpdate();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <Row>
        <Col md={12}>
        <div id="header">
          
          <div id="controls">
            <Row>
              <Col xs={12}>
                  <Col id="home" xs={4}>
                    <a href="/">Home</a>
                  </Col>
                  <Col id="search" xs={4}>
                    Search Bar
                  </Col>
                  <Col id="login" xs={4}>
                    <Login toggleLogin={this.props.toggleLogin} />
                    <Logout toggleLogin={this.props.toggleLogin} />
                  </Col>
              </Col>
            </Row>
            
            <div id="banner">
              
            </div>
          </div>
          
          <div id="navigation">
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
