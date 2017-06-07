import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Blurbs from './blurbs';

export default class Posts extends Component {
  constructor(props) {
    super();
    this.state = {
      posts: undefined,
      blurbs: {},
      user: props.userId
    }
  }
  getPosts() {
    var self = this;
    axios.get(`http://localhost:3001/posts/` + this.props.userId)
      .then(res => {
        self.setState({ 
          posts: res.data//,
         // total: res.data.length
        });
      });
  }
  render() {
    if (!this.state.posts) {
      this.getPosts();
      return (
        <div id="posts">Getting posts..</div>
      )
    } else {
      return (
        <div>
          <div id="latestPosts">
          <table><tbody>
            <tr>
              <th>Latest Blog Entry [Subscribe to this Blog]</th>
            </tr>
            {
              this.state.posts.slice(0,6).map((post, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {post.title} (<a href='{post.postUrl}'>view more</a>)<br/>
                    </td>
                  </tr>
                );
              })
            }
            <tr>
              <th>[View All Blog Entries]</th>
            </tr>
          </tbody></table>
          </div>

          <div id="blurbs">

                <Blurbs userId={this.state.user} />

          </div>

          <div id="posts">
            <table><tbody>
              <tr>
                <th>Blog Entries [Subscribe to this Blog]</th>
              </tr>
              <tr>
                <td>Displaying 10 of {this.state.total} comments (View/Edit All Comments)</td>
              </tr>
            {
              this.state.posts.slice(0,10).map((post, index) => 
              {
                return (
                  <tr key={index}>
                    <td>
                      <a href='{post.postUrl}'>{post.title}</a><br/>
                      IMAGE
                    </td>
                    <td>
                      {post.postDate}<br/>
                      {post.body}
                    </td>
                  </tr>
                );
              })
            }
            </tbody></table>
          </div>
        </div>
      )
    }
  }
}
