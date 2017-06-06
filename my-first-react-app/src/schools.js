import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

export default class Schools extends Component {
  constructor(props) {
    super();
    this.state = {
      schools: undefined
    }
  }
  getSchools() {
    axios.get(`http://localhost:3001/schools/` + this.props.userId)
      .then(res => {
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