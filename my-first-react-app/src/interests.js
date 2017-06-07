import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

export default class Interests extends Component {
  constructor(props) {
    super();
    this.state = {
      interests: undefined
    }
  }
  getInterests() {
    axios.get(`http://localhost:3001/interests/` + this.props.userId)
      .then(res => {
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
      return (
        <div id="interests">
          {
            this.state.interests.map((interest, index) => {
              return (
                <table key={index}><tbody>
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