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

//LOOK AT ternary operation for view and editing mode: 
//https://www.robinwieruch.de/conditional-rendering-react/
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }

  wireframe() {
    var url = window.location.hash.slice(1);
    debugger;
    axios.get(`http://localhost:3001/` + url)
      .then(res => {
        this.setState({ user: res.data });
      });
  }

  render() {
    if (!this.state.user.id) {
      this.wireframe.call(this);
      return <div>Fetching user data</div>
    } else {
      const user = this.state.user;
      return (
        <Grid>
          <Row>
            <Col md={5}>
              <div id = "user-info">
                {user.name}
              </div>
              
              <div id = "contact">
                {user.email}
              </div>
  
              <table><tbody>
                <tr>
                  <th>{user.name}'s Interests</th>
                </tr>
                <Interests userId={user.id} />
              </tbody></table>

              <table><tbody>
                <tr>
                  <th>{user.name}'s Details</th>
                </tr>
                <Details userId={user.id} />
              </tbody></table>

              <table><tbody>
                <tr>
                  <th>{user.name}'s Schools</th>
                </tr>
                <Schools userId={user.id} />
              </tbody></table>
  
              <table><tbody>
                <tr>
                  <th>{user.name}'s Shows</th>
                </tr>
                <Shows userId={user.id} />
              </tbody></table>
  
              <table><tbody>
                <tr>
                  <th>{user.name}'s Prints</th>
                </tr>
                <Prints userId={user.id} />
              </tbody></table>
            </Col>
    
            <Col md={7}>
              <div id = "extended-network">
                {user.name} is in your extended network.
              </div>
  
              <table><tbody>
                <tr>
                  <th>{user.name}'s Latest Blog Entry[Subscribe to this Blog]</th>
                </tr>
                  
                <tr>
                  <th>[View All Blog Entries]</th>
                </tr>
              </tbody></table>
  
              <div id = "blurbs">
               {user.about},
               {user.meet}
              </div>
  
              <div id = "friends">
              </div>

              <table><tbody>
                <tr>
                  <th>{user.name}'s Comments</th>
                </tr>
                <Posts userId={user.id} />
              </tbody></table>
            </Col>
          </Row>
        </Grid>
      );
    }
  }
}


export default App;