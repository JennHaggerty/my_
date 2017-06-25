import React, { Component } from 'react';
import './App.css';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import axios from 'axios';
import Header from './header';
import Details from './details';
import Interests from './interests';
import Schools from './schools';
import Shows from './shows';
import Prints from './prints';
import Posts from './posts';



//LOOK AT ternary operation for view and editing mode: 
//https://www.robinwieruch.de/conditional-rendering-react/
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }

  getUser() {
    var url = window.location.hash.slice(1);
    axios.get(`http://192.168.1.110:3001/` + url)
      .then(res => {
        this.setState({ user: res.data });
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
            <Header />
            <Col md={5}>
              <div id = "user-info">
                {user.name}
                <div><img style={{width: 150, height: 150}} src="https://pbs.twimg.com/profile_images/868231878989541377/xgtoREGN_400x400.jpg" alt='' /></div>
              </div>
              
              <div id = "contact">
                {user.email}
              </div>
  
              <Interests userId={user.id} />

              <Details userId={user.id} />
              
              <Schools userId={user.id} />
  
              <Shows userId={user.id} />
  
              <Prints userId={user.id} />
            </Col>
    
            <Col md={7}>
              <div id = "extended-network">
                {user.name} is in your extended network.
              </div>

              <Posts userId={user.id} />
            </Col>

          </Row>
        </Grid>
      );
    }
  }
}


export default App;
