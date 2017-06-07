import React, { Component } from 'react';
import './App.css';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import axios from 'axios';
import Details from './details';
import Interests from './interests';
//import Blurbs from './blurbs';
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
                  <th>Interests</th>
                </tr>
              </tbody></table>
              <Interests userId={user.id} />

              <table><tbody>
                <tr>
                  <th>Details</th>
                </tr>
              </tbody></table>
              <Details userId={user.id} />

              <table><tbody>
                <tr>
                  <th>Schools</th>
                </tr>
              </tbody></table>
              <Schools userId={user.id} />
  
              <table><tbody>
                <tr>
                  <th>Shows</th>
                </tr>
              </tbody></table>
              <Shows userId={user.id} />
  
              <table><tbody>
                <tr>
                  <th>Prints</th>
                </tr>
              </tbody></table>
              <Prints userId={user.id} />
            </Col>
    
            <Col md={7}>
              <div id = "extended-network">
                {user.name} is in your extended network.
              </div>

          

              <table><tbody>
                <tr>
                  <th>Comments</th>
                </tr>
              </tbody></table>
              <Posts userId={user.id} />
            </Col>
          </Row>
        </Grid>
      );
    }
  }
}


export default App;