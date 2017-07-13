import React, { Component } from 'react';
import './App.css';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import axios from 'axios';
import Details from './details';
import Interests from './interests';
import Schools from './schools';
import Shows from './shows';
import Prints from './prints';
import Posts from './posts';
import User from './user';
import Login from './login';
import Logout from './logout';


//LOOK AT ternary operation for view and editing mode: 
//https://www.robinwieruch.de/conditional-rendering-react/
class App extends Component {
  constructor(props) {
    super(props);

    var self = this;
    this.state = {
      user: {},
      loggedIn: false,
      toggleLogin: function(value) {
        self.setState({
          loggedIn: value
        }) 
      }
    };
  }

  componentDidMount() {
    if(localStorage.token && this.state.loggedIn === false) {
      this.state.toggleLogin(true);
    }
  }

  getUser() {
    var url = window.location.hash.slice(1);
    axios.get(`http://192.168.1.110:3001/` + url)
      .then(res => {
        this.setState({ 
          user: res.data
        });
      });
  }
   

  render() {
    
    if (!this.state.user.id) {
      this.getUser.call(this);
      return <div>Fetching user data</div>
    } else {
      const user = this.state.user;
      return (
        <Grid>
          <Row>
            <Col lg={12}>
              <Col id="home" xs={4}>
              </Col>
              <Col id="search" xs={4}>
                Search Bar
              </Col>
              <Col id="login" xs={4}>
                { !this.state.loggedIn
                  ? <Login toggleLogin={this.state.toggleLogin} />
                  : " "
                }
                
               { this.state.loggedIn  
                  ? <Logout toggleLogin={this.state.toggleLogin} />
                  : " "
                }
              </Col>
            </Col>
          </Row>
            
            <Col lg={5}>
              <User userId={user.id} loggedIn={this.state.loggedIn} />
              
              <div id = "contact">
                contact info
              </div>
  
              <Interests userId={user.id} loggedIn={this.state.loggedIn} />

              <Details userId={user.id} loggedIn={this.state.loggedIn} />
              
              <Schools userId={user.id} loggedIn={this.state.loggedIn} />
  
              <Shows userId={user.id} loggedIn={this.state.loggedIn} />
  
              <Prints userId={user.id} loggedIn={this.state.loggedIn} />
            </Col>
    
            <Col lg={7}>
              <div id = "extended-network">
                {user.name} is in your extended network.
              </div>

              <Posts userId={user.id} loggedIn={this.state.loggedIn} />
            </Col>

          
        </Grid>
      );
    }
  }
}


export default App;
