import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

export default class Shows extends Component {
  constructor(props) {
    super();
    this.state = {
      shows: undefined
    }
  }
  getShows() {
    axios.get(`http://localhost:3001/shows/` + this.props.userId)
      .then(res => {
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
            this.state.shows.map((show, index) => {
              return (
                <tr key={index}>
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