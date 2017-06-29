import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import ToggleDisplay from './toggledisplay';

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      details: undefined,
      show: true,
      secretData: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getDetails() {
    axios.get(`http://localhost:3001/details/` + this.props.userId)
      .then(res => {
        this.setState({  details: res.data });
      });
  }
  handleClick(e) {
    this.setState({ show: !this.state.show });
  }
  handleSubmit(e) {
    e.preventDefault();
    var details = this.state.details[0];
    var self = this;

    ['status','hereFor', 'hometown', 'bodyType', 'ethnicity', 'sign', 'smoke', 
     'drink', 'education', 'occupation']
    .forEach(function (fieldToChange) {
      details[fieldToChange] = document.querySelector('[name="'+fieldToChange+'"]').value;
    })
    axios.post('http://localhost:3001/details/' + this.props.userId, 
      details, {
      headers: {'Authorization': localStorage.token}
    })
    .then(function successcallback(response){
      // update the component state
      self.state.show = true;
      // re-render the component
      self.forceUpdate();
    })
    .catch(function (error) {
      console.log(error);
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
        <table><tbody>
          <tr>
            <th> Details </th>
            <th>
              {
                this.props.loggedIn && <button onClick={ () => this.handleClick() }>View/Edit</button> 
              } 
            </th>
          </tr>
        </tbody></table>
        <ToggleDisplay show={this.state.show}>
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
        </ToggleDisplay>
        <ToggleDisplay hide={this.state.show}>
          {
            this.state.details.map((detail, index) => {
              return (
              <form key={index} onSubmit={event => this.handleSubmit(event)}  >
                <table ><tbody>
                  <tr>
                    <td>Status:</td>
                    <td>
                      <input
                        name="status"
                        type="text"
                        value={this.state.status}
                        onChange={this.handleChange}
                        defaultValue={detail.status} />
                    </td>
                  </tr>
                  <tr>
                    <td>Here for:</td>
                    <td >
                      <input
                        name="hereFor"
                        value={this.state.hereFor}
                        onChange={this.handleChange}
                        defaultValue={detail.hereFor} />
                    </td>
                  </tr>
                  <tr>
                    <td>Hometown:</td>
                    <td>
                      <input
                        name="hometown"
                        value={this.state.hometown}
                        onChange={this.handleChange}
                        defaultValue={detail.hometown} />
                    </td>
                  </tr>
                  <tr>
                    <td>Body Type:</td>
                    <td>
                      <input
                        name="bodyType"
                        value={this.state.bodyType}
                        onChange={this.handleChange}
                        defaultValue={detail.bodyType} />
                    </td>
                  </tr>
                  <tr>
                    <td>Ethnicity:</td>
                    <td>
                      <input
                        name="ethnicity"
                        value={this.state.ethnicity}
                        onChange={this.handleChange}
                        defaultValue={detail.ethnicity} />
                    </td>
                  </tr>
                  <tr>
                    <td>Sign:</td>
                    <td>
                      <input
                        name="sign"
                        value={this.state.sign}
                        onChange={this.handleChange}
                        defaultValue={detail.sign} />
                    </td>
                  </tr>
                  <tr>
                    <td>Smoke / Drink:</td>
                    <td>
                      <input
                        name="smoke"
                        value={this.state.smoke}
                        onChange={this.handleChange}
                        defaultValue={detail.smoke} />
                       / 
                      <input
                        name="drink"
                        value={this.state.drink}
                        onChange={this.handleChange}
                        defaultValue={detail.drink} />
                    </td>
                  </tr>
                  <tr>
                    <td>Education:</td>
                    <td>
                      <input
                        name="education"
                        value={this.state.education}
                        onChange={this.handleChange}
                        defaultValue={detail.education} />
                    </td>
                  </tr>
                  <tr>
                    <td>Occupation:</td>
                    <td>
                      <input
                        name="occupation"
                        value={this.state.occupation}
                        onChange={this.handleChange}
                        defaultValue={detail.occupation} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button onSubmit={ this.handleSubmit }>Submit</button>
                    </td>
                  </tr>
                </tbody></table>
              </form>
              );
            })
          }
        </ToggleDisplay>
        
        </div>
      )
    }
  }
}