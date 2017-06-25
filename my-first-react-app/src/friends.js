import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

export default class Friends extends Component {
  constructor(props) {
    super();
    this.state = {
      friends: undefined
    }
  }
  getFriends() {
    var self = this;
    axios.get(`http://localhost:3001/friends/` + this.props.userId)
      .then(res => {
        self.setState({ 
          friends: res.data,
          total: res.data.length
        });
      });
  }
  render() {
    if (!this.state.friends) {
      this.getFriends();
      return (
        <div id="friends">Getting friends..</div>
      )
    } else {
      return (
        <div>
          <div id="friends">
            <table><tbody>
              <tr>
                <th>Friend Space</th>
              </tr>
              <tr>
                <td>There are {this.state.total} Friends.</td>
              </tr>
              <tr>
                {
                  this.state.friends.slice(0,4).map((friend, index) => 
                  {
                    return (
                      <td key={index}>
                        <a href='[{friend.url}]'>{friend.name}</a><br/>
                        IMAGE
                      </td>
                    );
                  })
                }
              </tr>
              <tr>
                {
                  this.state.friends.slice(4,8).map((friend, index) => 
                  {
                    return (
                      <td key={index}>
                        <a href='[{friend.url}]'>{friend.name}</a><br/>
                        IMAGE
                      </td>
                    );
                  })
                }
              </tr>
              <tr>
                <th>[View All Friends]</th>
              </tr>
            </tbody></table>
          </div>
        </div>
      )
    }
  }
}
