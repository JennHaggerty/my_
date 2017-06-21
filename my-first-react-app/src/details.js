import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

export default class Details extends Component {
  constructor(props) {
    super();
    this.state = { 
      details: undefined,
      show: true };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getDetails() {
    axios.get(`http://localhost:3001/details/` + this.props.userId)
      .then(res => {
        this.setState({ 
          details: res.data,
          showChild: false });
      });
  }
  //TOGGLE edit and view here
  handleClick(e) {
    this.setState({ show: !this.state.show });
  }
  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    var status = document.querySelector('[name="status"]').value
    // change below to look like ^
    axios.post('http://localhost:3001/details/' + this.props.userId, {
      status: status,
      hereFor: this.hereFor,
      hometown: this.hometown,
      bodyType: this.bodyType,
      ethnicity: this.ethnicity,
      sign: this.sign,
      smoke: this.smoke,
      drink: this.drink,
      education: this.education,
      occupation: this.occupation
    })
    .then(function(response){
      alert('Changes submitted.')
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
            <td> <button onClick={ () => this.handleClick() }>View/Edit</button> </td>
          </tr>
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
              <form onSubmit={event => this.handleSubmit(event)}  >
                <table key={index}><tbody>
                  <tr>
                    <td>Status:</td>
                    <td>
                      <input
                        name="status"
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
        </tbody></table>
        </div>
      )
    }
  }
}

function isDefined(val) { return val != null; }
class ToggleDisplay extends Component {
  propTypes: {
    hide: React.PropTypes.bool,
    show: React.PropTypes.bool
  }
  shouldHide() {
    var shouldHide;
    if(isDefined(this.props.show)) { 
      shouldHide = !this.props.show;
    }
    else if(isDefined(this.props.hide)) {
      shouldHide = this.props.hide;
    }
    else {
      shouldHide = false;
    }

    return shouldHide;    
  }
  render() {
    var style = {};
    
    if(this.shouldHide()) {
      style.display = 'none';
    }

    return (
      <span style={style} {...this.props} />
    );
  }
}