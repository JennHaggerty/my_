import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      details: undefined,
      show: false
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
      self.state.show = false;
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
          {
            this.state.details.map((detail, index) => {
              return (
              <form key={index} onSubmit={event => this.handleSubmit(event)}  >
                <table key={index}><tbody>
                  <tr>
                    <td>Status:</td>
                    { this.props.loggedIn && this.state.show
                      ? <td>
                        <input
                          name="status"
                          value={this.state.status}
                          onChange={this.handleChange}
                          defaultValue={detail.status} />
                        </td>
                      : <td> { detail.status } </td>
                    }
                  </tr>
                  <tr>
                    <td>Here for:</td>
                    { this.props.loggedIn && this.state.show
                      ? <td>
                        <input
                          name="hereFor"
                          value={this.state.hereFor}
                          onChange={this.handleChange}
                          defaultValue={detail.hereFor} />
                        </td>
                      : <td> { detail.hereFor } </td>
                    }
                  </tr>
                  <tr>
                    <td>Hometown:</td>
                    { this.props.loggedIn && this.state.show
                      ? <td>
                        <input
                          name="hometown"
                          value={this.state.hometown}
                          onChange={this.handleChange}
                          defaultValue={detail.hometown} />
                        </td>
                      : <td> { detail.hometown } </td>
                    }
                  </tr>
                  <tr>
                    <td>Body Type:</td>
                    { this.props.loggedIn && this.state.show
                      ? <td>
                        <input
                          name="bodyType"
                          value={this.state.bodyType}
                          onChange={this.handleChange}
                          defaultValue={detail.bodyType} />
                        </td>
                      : <td> { detail.bodyType } </td>
                    }
                  </tr>
                  <tr>
                    <td>Ethnicity:</td>
                    { this.props.loggedIn && this.state.show
                      ? <td>
                        <input
                          name="ethnicity"
                          value={this.state.ethnicity}
                          onChange={this.handleChange}
                          defaultValue={detail.ethnicity} />
                        </td>
                      : <td> { detail.ethnicity } </td>
                    }
                  </tr>
                  <tr>
                    <td>Sign:</td>
                    { this.props.loggedIn && this.state.show
                      ? <td>
                        <input
                          name="sign"
                          value={this.state.sign}
                          onChange={this.handleChange}
                          defaultValue={detail.sign} />
                        </td>
                      : <td> { detail.sign } </td>
                    }
                  </tr>
                  <tr>
                    <td>Smoke / Drink:</td>
                    { this.props.loggedIn && this.state.show
                      ? <td>
                        <input
                          name="smoke"
                          value={this.state.smoke}
                          onChange={this.handleChange}
                          defaultValue={detail.smoke} /> /
                          <input
                          name="drink"
                          value={this.state.drink}
                          onChange={this.handleChange}
                          defaultValue={detail.drink} />

                        </td>
                      : <td> { detail.smoke } / { detail.drink } </td>
                    }
                  </tr>
                  <tr>
                    <td>Education:</td>
                    { this.props.loggedIn && this.state.show
                      ? <td>
                        <input
                          name="education"
                          value={this.state.education}
                          onChange={this.handleChange}
                          defaultValue={detail.education} />
                        </td>
                      : <td> { detail.education } </td>
                    }
                  </tr>
                  <tr>
                    <td>Occupation:</td>
                    { this.props.loggedIn && this.state.show
                      ? <td>
                        <input
                          name="occupation"
                          value={this.state.occupation}
                          onChange={this.handleChange}
                          defaultValue={detail.occupation} />
                        </td>
                      : <td> { detail.occupation } </td>
                    }
                  </tr>
                  { this.props.loggedIn && this.state.show &&
                    <tr>
                      <td>
                        <button onSubmit={ this.handleSubmit }>Submit</button>
                      </td>
                    </tr>
                  }
                </tbody></table>
              </form>
              );
            })
          }
        </div>
      )
    }
  }
}