import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

 export default class Prints extends Component {
  constructor(props) {
    super();
    this.state = {
      prints: undefined
    }
  }
  getPrints() {
    axios.get(`http://localhost:3001/prints/` + this.props.userId)
      .then(res => {
        this.setState({ prints: res.data });
      });
  }
  render() {
    if (!this.state.prints) {
      this.getPrints();
      return (
        <div id="prints">Getting prints..</div>
      )
    } else {
      return (
        <div id="prints">
          <table><tbody>
          {
            this.state.prints.map((print, index) => {
              return (
                <tr key={index}>
                  <td>
                    {print.title}<br/>
                    <a href='{print.publicationUrl}'>{print.publication}</a><br/>
                  </td>
                  <td>{print.printDate}</td>
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