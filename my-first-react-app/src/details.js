import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

export default class Details extends Component {
  constructor(props) {
    super();
    this.state = {
      details: undefined
    }
  }
  getDetails() {
    axios.get(`http://localhost:3001/details/` + this.props.userId)
      .then(res => {
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
      return (
        <div id="details">
          {
            this.state.details.map((detail, index) => {
              return (
                <table key={index}><tbody>
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