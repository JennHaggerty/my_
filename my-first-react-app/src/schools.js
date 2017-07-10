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
  deleteSchool() {

  } 
  handleClick(e) {
    this.setState({ show: !this.state.show });
  }
  handleSubmit(e) {
    e.preventDefault();
    var schools = this.state.schools;
    var self = this;

    ['schoolName', 'schoolUrl', 'url', 'yearStarted', 'yearFinished', 'city', 'state', 
    'status', 'degree', 'major']
    .forEach(function(fieldToChange) {
      schools[fieldToChange] = document.querySelector('[name="'+fieldToChange+'"]').value;
    }) 
    axios.post('http://localhost:3001/schools/' + this.props.userId,
      schools, {
      headers: {'Authorization': localStorage.token}
    })
    .then(function successcallback(response){
      // update the component state
      self.state.show = false;
      // re-render the component
      self.forceUpdate();
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    if (!this.state.schools) {
      this.getSchools();
      return (
        <div id="schools">Getting schools...</div>
      )
    } else {
      return (
        <div id="schools">
          <table><tbody>
            <tr>
              <th> Schools </th>
            </tr>
          </tbody></table>
          <table><tbody>
          {
            this.state.schools.map((school, index) => {
              return (
                <form key={index} onSubmit={event => this.handleSubmit(event)}  >
                <tr key={index}>
                { this.props.loggedIn
                  ? <tr>
                      <td>
                        <a href='{school.schoolUrl}'>{ school.schoolName }</a><br/>
                        {school.city}, {school.state}<br/>
                        Grad Year: {school.yearFinished}<br/>
                        Student Status: {school.status}<br/>
                        Degree: {school.degree}<br/>
                        Major: {school.major}
                      </td>
                      <td>
                        From {school.yearStarted} to {school.yearFinished}
                      </td>
                      <td>
                        <button onClick={ () => this.handleClick() }>Edit</button>
                      </td>
                      <td>
                        <button onClick={ () => this.deleteSchool() }>Delete</button>
                      </td>
                    </tr>
                  : <tr>
                      <td>
                        <a href='{school.schoolUrl}'>{ school.schoolName }</a><br/>
                        {school.city}, {school.state}<br/>
                        Grad Year: {school.yearFinished}<br/>
                        Student Status: {school.status}<br/>
                        Degree: {school.degree}<br/>
                        Major: {school.major}
                      </td>
                      <td>
                        From {school.yearStarted} to {school.yearFinished}
                      </td>
                    </tr>
                }
                </tr>

                </form>
              );
            })
          }
          </tbody></table>
        </div>
      )
    }
  }
}
