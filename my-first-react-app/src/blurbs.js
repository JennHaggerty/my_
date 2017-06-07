import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

export default class Blurbs extends Component {
  constructor(props) {
    super();
    this.state = {
      blurbs: undefined
    }
  }
  getBlurbs() {
    axios.get(`http://localhost:3001/blurbs/` + this.props.userId)
      .then(res => {
        debugger;
        this.setState({ blurbs: res.data });
      });
  }
  render() {
    if (!this.state.blurbs) {
      this.getBlurbs();
      return (
        <div id="blurbs">Getting blurbs..</div>
      )
    } else {
    	return (
        <div id="blurbs">
          {
            this.state.blurbs.map((blurb, index) => {
              return (
                <table key={index}><tbody>
                  <tr>
                    <td>About</td>
                    <td>{ blurb.about }</td>
                  </tr>
                  <tr>
                    <td>Who I'd like to meet</td>
                    <td>{ blurb.meet }</td>
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