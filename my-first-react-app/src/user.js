import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: undefined,
      show: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getUser() {
    var url = window.location.hash.slice(1);
    axios.get(`http://192.168.1.110:3001/` + url)
      .then(res => {
        this.setState({ user: res.data });
      });
  }
  handleClick(e) {
    this.setState({ show: !this.state.show });
  }
  handleSubmit(e) {
    e.preventDefault();
    var users = this.state.user;//s[0];
    var self = this;

    [ 'name', 'email', 'city', 'state', 'country', 'sex']
    .forEach(function (fieldToChange) {
      users[fieldToChange] = document.querySelector('[name="'+fieldToChange+'"]').value;
    })
    axios.post('http://localhost:3001/user/' + this.props.userId, 
      users, {
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
    if (!this.state.user) {
      this.getUser();
      return (
        <div id="user">Getting user..</div>
      )
    } else {
      const user = this.state.user;
      return (
        
        <div className="container-fluid" id="user">
          <div className="row">
            {
              this.props.loggedIn && <button onClick={ () => this.handleClick() }>View/Edit</button> 
            }
            <form onSubmit={event => this.handleSubmit(event)}  >
              <div className="row">
                <div className="col-xs-6">
                  <table><tbody>
                    <tr>
                      { this.props.loggedIn && this.state.show
                        ? <th>
                          <input
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            defaultValue={user.name} />
                          </th>
                        : <th> { user.name } </th>
                      }
                    </tr>
                  </tbody></table>
                </div> 
              </div>
              <div className="row">
                <div className="col-xs-8">
                  <div>
                    {user.img}
                  </div>
                  { this.props.loggedIn && this.state.show
                    ?
                      <input
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        defaultValue={user.email} />
                    :
                      <div>
                        {user.email}
                      </div>
                  }
                </div>
                <div className="col-xs-4">
                  <table><tbody>
                    <tr>
                      { this.props.loggedIn && this.state.show
                        ? <td>
                          <input
                            name="sex"
                            value={this.state.sex}
                            onChange={this.handleChange}
                            defaultValue={user.sex} />
                          </td>
                        : <td> { user.sex } </td>
                      }
                    </tr>
                    <tr>
                      { this.props.loggedIn && this.state.show
                        ? <td>
                          <input
                            name="city"
                            value={this.state.city}
                            onChange={this.handleChange}
                            defaultValue={user.city} />
                          </td>
                        : <td> { user.city } </td>
                      }
                    </tr>
                    <tr>
                      { this.props.loggedIn && this.state.show
                        ? <td>
                          <input
                            name="state"
                            value={this.state.state}
                            onChange={this.handleChange}
                            defaultValue={user.state} />
                          </td>
                        : <td> { user.state } </td>
                      }
                    </tr>
                    <tr>
                      { this.props.loggedIn && this.state.show
                        ? <td>
                          <input
                            name="country"
                            value={this.state.country}
                            onChange={this.handleChange}
                            defaultValue={user.country} />
                          </td>
                        : <td> { user.country } </td>
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
                </div>
              </div>
            </form>
          </div>
        </div>
      )
    }
  }
}