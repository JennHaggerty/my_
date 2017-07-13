import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

export default class Schools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: undefined,
      show: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  getSchools() {
    axios.get(`http://localhost:3001/schools/` + this.props.userId)
      .then(res => {
        this.setState({ schools: res.data });
      });
  }
  handleChange(event) {
    const schools = this.state.schools;
    const key = event.target.name;
    const val = event.target.value;
    const index = event.target.parentElement.querySelector('[name="index"]').value;
    schools[index][key] = val;

    this.setState({ schools });
  }
  handleClick(e) {
    this.setState({ show: !this.state.show });
  }
  handleSubmit(e) {
    debugger;
    e.preventDefault();
    var schools = this.state.schools;
    var self = this;

//    [`schoolId`, `schoolName`, `schoolUrl`, `yearStarted`, `yearFinished`, `city`, `state`, 
//    `studentStatus`, `degree`, `major`]
//    .forEach(function(fieldToChange) {
//      schools[fieldToChange] = document.querySelector('[name="'+fieldToChange+'"]').value;
//    }) 
    axios.post('http://localhost:3001/schools/' + this.props.userId,
      schools/* array of shcolls */, {
      headers: {'Authorization': localStorage.token}
    })
    .then(function successcallback(response){
      // update the component state
      self.state.show = false;
      // re-render the component
      //self.forceUpdate();
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
          <table>
            <tbody>
              <tr>
                <th> Schools </th>
                <th>
                {
                  this.props.loggedIn && <button onClick={ () => this.handleClick() }>Add</button> 
                } 
                {
                  this.props.loggedIn && <button onClick={ () => this.handleClick() }>Edit</button> 
                }
                </th>
              </tr>
            </tbody>
          </table>
          {
            this.state.schools.map((school, index) => {
              return (
                
                <div key={index}>
                { this.props.loggedIn && this.state.show
                  ? <form onSubmit={this.handleSubmit}>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <input type="hidden" name="index" value={index} />
                              <input type="hidden" name="schoolId" value={school.id} />
                              Name: <input
                                name="schoolName"
                                value={school.schoolName}
                                onChange={this.handleChange}
                                /> <br/>
                              URL: <input
                                name="schoolUrl"
                                value={this.state.schoolUrl}
                                
                                defaultValue={school.schoolUrl} /><br/>
                              City: <input
                                name="city"
                                value={this.state.city}
                                
                                defaultValue={school.city} />, 
                              State: <input
                                name="state"
                                value={this.state.state}
                                
                                defaultValue={school.state} /><br/>
                              Student Status: <input
                                name="studentStatus"
                                value={this.state.studentStatus}
                                
                                defaultValue={school.studentStatus} /> <br/>
                              Degree: <input
                                name="degree"
                                value={this.state.degree}
                                
                                defaultValue={school.degree} /> <br/>
                              Major: <input
                                name="major"
                                value={this.state.major}
                                
                                defaultValue={school.major} />
                            </td>
                            <td>
                              From <input
                                name="yearStarted"
                                value={this.state.yearStarted}
                                
                                defaultValue={school.yearStarted} /> to 
                                <input
                                name="yearFinished"
                                value={this.state.yearFinished}
                                
                                defaultValue={school.yearFinished} /><br/><br/>

                                      <input type="submit" value="Save" />

                              <button>Delete</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </form>
                  : <table><tbody><tr>
                      <td>
                        <a href='{school.schoolUrl}'>{ school.schoolName }</a><br/>
                        {school.city}, {school.state}<br/>
                        Grad Year: {school.yearFinished}<br/>
                        Student Status: {school.studentStatus}<br/>
                        Degree: {school.degree}<br/>
                        Major: {school.major}
                      </td>
                      <td>
                        From {school.yearStarted} to {school.yearFinished}
                      </td>
                    </tr></tbody></table>
                }
                </div>
                
              );
            })
          }
        </div>
      )
    }
  }
}
