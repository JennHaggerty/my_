import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

export default class Interests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interests: undefined,
      show: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getInterests() {
    axios.get(`http://localhost:3001/interests/` + this.props.userId)
      .then(res => {
        this.setState({ interests: res.data });
      });
  }
  handleClick(e) {
    this.setState({ show: !this.state.show });
  }
  handleSubmit(e) {
    e.preventDefault();
    var interests = this.state.interests[0];
    var self = this;

    ['general', 'music', 'movies', 'television', 'books', 'heroes']
    .forEach(function(fieldToChange) {
      interests[fieldToChange] = document.querySelector('[name="'+fieldToChange+'"]').value;
    }) 
    axios.post('http://localhost:3001/interests/' + this.props.userId,
      interests, {
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
    if (!this.state.interests) {
      this.getInterests();
      return (
        <div id="interests">Getting interests..</div>
      )
    } else {
      return (
        <div id="interests">
          <table><tbody>
            <tr>
              <th> Interests </th>
              <th>
              {
                this.props.loggedIn && <button onClick={ () => this.handleClick() }>Edit</button> 
              } 
             </th>
            </tr>
          </tbody></table>
          {
            this.state.interests.map((interest, index) => {
              return (
              <form key={index} onSubmit={event => this.handleSubmit(event)}  >
                <table key={index}><tbody>
                  <tr>
                    <td>General</td>
                    { this.props.loggedIn && this.state.show
                      ? <td>
                        <input
                          name="general"
                          value={this.state.general}
                          onChange={this.handleChange}
                          defaultValue={interest.general} />
                        </td>
                      : <td> { interest.general } </td>
                    }
                  </tr>
                  <tr>
                    <td>Music</td>
                    { this.props.loggedIn && this.state.show
                      ? <td>
                        <input
                          name="music"
                          value={this.state.music}
                          onChange={this.handleChange}
                          defaultValue={interest.music} />
                        </td>
                      : <td> { interest.music } </td>
                    }
                  </tr>
                  <tr>
                    <td>Movies</td>
                    { this.props.loggedIn && this.state.show
                      ? <td>
                        <input
                          name="movies"
                          value={this.state.movies}
                          onChange={this.handleChange}
                          defaultValue={interest.movies} />
                        </td>
                      : <td> { interest.movies } </td>
                    }
                  </tr>
                  <tr>
                    <td>Television</td>
                    { this.props.loggedIn && this.state.show
                      ? <td>
                        <input
                          name="television"
                          value={this.state.television}
                          onChange={this.handleChange}
                          defaultValue={interest.television} />
                        </td>
                      : <td> { interest.television } </td>
                    }
                  </tr>
                  <tr>
                    <td>Books</td>
                    { this.props.loggedIn && this.state.show
                      ? <td>
                        <input
                          name="books"
                          value={this.state.books}
                          onChange={this.handleChange}
                          defaultValue={interest.books} />
                        </td>
                      : <td> { interest.books } </td>
                    }
                  </tr>
                  <tr>
                    <td>Heroes</td>
                    { this.props.loggedIn && this.state.show
                      ? <td>
                        <input
                          name="heroes"
                          value={this.state.heroes}
                          onChange={this.handleChange}
                          defaultValue={interest.heroes} />
                        </td>
                      : <td> { interest.heroes } </td>
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