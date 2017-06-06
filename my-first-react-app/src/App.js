import React, { Component } from 'react';
import './App.css';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import axios from 'axios';

//ProfilePicture.js
// > export default ProfilePicture;
// import ProfilePicture from './ProfilePicuture'
// ...
// render() { ...
// <ProfilePicture />
/*
class ProfilePicture extends Component {
  render() {
    var user = this.props.xyz
    return (
      <div>
        <img src="blah"></img>
      </div>
    )
  }
}
.. later in another render:
<ProfilePicture xyz={this.state.user} />
*/
/* generic example of stuff
<Hobbies userId={this.state.user.id} /> // var hobbiesUrl = '/hobbies/' + this.props.userId;
{ 
  app.get('/hobbies/:userId', getShitFromDBbyUserID)
  getShitFromDBbyUserId(req,res,next){
   var userId = req.params.userId;
   res.send(dataFromDBOnceYou'veGotIt)
  }
*/
class Interests extends Component {
  constructor(props) {
    super();
    this.state = {
      interests: undefined
    }
  }
  getInterests() {
    axios.get(`http://localhost:3001/interests/` + this.props.userId)
      .then(res => {
        //const posts = res.data.data.children.map(obj => obj.data);
        this.setState({ interests: res.data });
      });
  }
  render() {
    if (!this.state.interests) {
      this.getInterests();
      return (
        <div id="interests">Getting interests..</div>
      )
    } else {
      //this.state.interests;
      return (
        <div id="interests">
          {
            this.state.interests.map(interest => {
              return (
                <table><tbody>
                  <tr>
                    <td>General</td>
                    <td>{ interest.general }</td>
                  </tr>
                  <tr>
                    <td>Music</td>
                    <td>{ interest.music }</td>
                  </tr>
                  <tr>
                    <td>Movies</td>
                    <td>{ interest.movies }</td>
                  </tr>
                  <tr>
                    <td>Television</td>
                    <td>{ interest.television }</td>
                  </tr>
                  <tr>
                    <td>Books</td>
                    <td>{ interest.books }</td>
                  </tr>
                  <tr>
                    <td>Heroes</td>
                    <td>{ interest.heroes }</td>
                </tr>
                </tbody></table>
              );
            })
          }
        </div>
      )
    }
  }
}
class Details extends Component {
  constructor(props) {
    super();
    this.state = {
      details: undefined
    }
  }
  getDetails() {
    axios.get(`http://localhost:3001/details/` + this.props.userId)
      .then(res => {
        //const posts = res.data.data.children.map(obj => obj.data);
        this.setState({ details: res.data });
      });
  }
  render() {
    if (!this.state.details) {
      this.getDetails();
      return (
        <div id="details">Getting details..</div>
      )
    } else {
      //this.state.details;
      return (
        <div id="details">
          {
            this.state.details.map(detail => {
              return (
                <table><tbody>
                  <tr>
                    <td>Status:</td>
                    <td>{ detail.status }</td>
                  </tr>
                  <tr>
                    <td>Here for:</td>
                    <td>{ detail.hereFor }</td>
                  </tr>
                  <tr>
                    <td>Hometown:</td>
                    <td>{ detail.hometown }</td>
                  </tr>
                  <tr>
                    <td>Body Type:</td>
                    <td>{ detail.bodyType }</td>
                  </tr>
                  <tr>
                    <td>Ethnicity:</td>
                    <td>{ detail.ethnicity  }</td>
                  </tr>
                  <tr>
                    <td>Sign:</td>
                    <td>{ detail.sign }</td>
                  </tr>
                  <tr>
                    <td>Smoke / Drink:</td>
                    <td>{ detail.smoke } / { detail.drink }</td>
                  </tr>
                  <tr>
                    <td>Education:</td>
                    <td>{ detail.education }</td>
                  </tr>
                  <tr>
                    <td>Occupation:</td>
                    <td>{ detail.occupation }</td>
                  </tr>
                </tbody></table>
              );
            })
          }
        </div>
      )
    }
  }
}
class Schools extends Component {
  constructor(props) {
    super();
    this.state = {
      schools: undefined
    }
  }
  getSchools() {
    axios.get(`http://localhost:3001/schools/` + this.props.userId)
      .then(res => {
        //const posts = res.data.data.children.map(obj => obj.data);
        this.setState({ schools: res.data });
      });
  }
  render() {
    if (!this.state.schools) {
      this.getSchools();
      return (
        <div id="schools">Getting schools..</div>
      )
    } else {
      return (
        <div id="schools">
          <table><tbody>
          {
            this.state.schools.map(school => {
              return (
                <tr>
                  <td>
                    <a href='{school.schoolUrl}'>{ school.schoolName }</a><br/>
                    {school.city}, {school.state}<br/>
                    Grad Year: {school.yearFinished}<br/>
                    Student Status: {school.status}<br/>
                    Degree: {school.degree}<br/>
                    Major: {school.major}
                  </td>
                  <td>From {school.yearStarted} to {school.yearFinished}</td>
                </tr>
              );
            })
          }
          </tbody></table>
        </div>
      )
    }
  }
}
class Shows extends Component {
  constructor(props) {
    super();
    this.state = {
      shows: undefined
    }
  }
  getShows() {
    axios.get(`http://localhost:3001/shows/` + this.props.userId)
      .then(res => {
        //const posts = res.data.data.children.map(obj => obj.data);
        this.setState({ shows: res.data });
      });
  }
  render() {
    if (!this.state.shows) {
      this.getShows();
      return (
        <div id="shows">Getting shows..</div>
      )
    } else {
      return (
        <div id="shows">
          <table><tbody>
          {
            this.state.shows.map(show => {
              return (
                <tr>
                  <td>
                    { show.title }<br/>
                    {show.showType} at <a href='{show.venueUrl}'>{show.venueName}</a><br/>
                    {show.city}, {show.state}<br/>
                    
                  </td>
                  <td>{show.showDate}</td>
                </tr>
              );
            })
          }
          </tbody></table>
        </div>
      )
    }
  }
}
class Prints extends Component {
  constructor(props) {
    super();
    this.state = {
      prints: undefined
    }
  }
  getPrints() {
    axios.get(`http://localhost:3001/prints/` + this.props.userId)
      .then(res => {
        //const posts = res.data.data.children.map(obj => obj.data);
        this.setState({ prints: res.data });
      });
  }
  render() {
    if (!this.state.prints) {
      this.getPrints();
      return (
        <div id="prints">Getting prints..</div>
      )
    } else {
      return (
        <div id="prints">
          <table><tbody>
          {
            this.state.prints.map(print => {
              return (
                <tr>
                  <td>
                    {print.title}<br/>
                    <a href='{print.publicationUrl}'>{print.publication}</a><br/>
                  </td>
                  <td>{print.printDate}</td>
                </tr>
              );
            })
          }
          </tbody></table>
        </div>
      )
    }
  }
}
class Posts extends Component {
  constructor(props) {
    super();
    this.state = {
      posts: undefined
    }
  }
  getPosts() {
    axios.get(`http://localhost:3001/posts/` + this.props.userId)
      .then(res => {
        //const posts = res.data.data.children.map(obj => obj.data);
        this.setState({ posts: res.data });
      });
  }
  render() {
    if (!this.state.posts) {
      this.getPosts();
      return (
        <div id="posts">Getting posts..</div>
      )
    } else {
      return (
        <div>
          <div id="posts">
            <table><tbody>
            {
              this.state.posts.map(post => {
                return (
                  <tr>
                    <td>
                      <a href='{post.postUrl}'>{post.title}</a><br/>
                      IMAGE
                    </td>
                    <td>
                      {post.postDate}<br/>
                      {post.body}
                    </td>
                  </tr>
                );
              })
            }
            </tbody></table>
          </div>
          <div>
              <table><tbody>
              {
              this.state.posts.slice(0,3).map(post => {
                return (
                  <tr>
                    <td>
                      <a href='{post.postUrl}'>{post.title}</a><br/><br/>
                      IMAGE
                    </td>
                    <td>
                      {post.postDate}<br/><br/>
                      {post.post}
                    </td>
                  </tr>
                );
              })
            }
            </tbody></table>
          </div>
        </div>
      )
    }
  }
}
//class LatestPosts extends Component {
//  constructor(props) {
//    super();
//    this.state = {
//      posts: undefined
//    }
//  }
//  getLatestPosts() {
//    axios.get(`http://localhost:3001/posts/` + this.props.userId)
//      .then(res => {
//        debugger;
//        const posts = res.data.slice(0,6);
//        this.setState({ 
//          posts: posts
//        });
//      });
//  }
//  render() {
//    if (!this.state.posts) {
//      this.getLatestPosts();
//      return (
//        <div id="posts">Getting posts..</div>
//      )
//    } else {
//      return (
//        <div id="posts">
//          <table><tbody>
//          {
//            this.state.posts.map(post => {
//              return (
//                <tr>
//                  <td>
//                    <a href='{post.postUrl}'>{post.title}</a> (view more)
//                  </td>
//                </tr>
//              );
//            })
//          }
//          </tbody></table>
//        </div>
//      )
//    }
//  }
//}

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
    // TODO get URL from actual URL instead of using this hardcoded value
    var url = window.location.hash.slice(1);
    debugger;
    axios.get(`http://localhost:3001/` + url)
      .then(res => {
        //const posts = res.data.data.children.map(obj => obj.data);
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
                  <Posts userId={user.id} />
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