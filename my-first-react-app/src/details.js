import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

export default class Details extends Component {
  constructor(props) {
    super();
    this.state = { 
      details: undefined,
      show: true };

    //this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getDetails() {
    axios.get(`http://localhost:3001/details/` + this.props.userId)
      .then(res => {
        this.setState({ 
          details: res.data
          //showChild: false 
        });
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
    axios.post('http://localhost:3001/details/' + this.props.userId, details)
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
            <td> <button onClick={ () => this.handleClick() }>View/Edit</button> </td>
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
      <div style={style} {...this.props} />
    );
  }
}