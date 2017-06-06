import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

export default class Posts extends Component {
  constructor(props) {
    super();
    this.state = {
      posts: undefined
    }
  }
  getPosts() {
    axios.get(`http://localhost:3001/posts/` + this.props.userId)
      .then(res => {
        this.setState({ posts: res.data });
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
          <div id="posts">
            <table><tbody>
            {
              this.state.posts.map(post => {
                return (
                  <tr>
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
          <div>
              <table><tbody>
              {
              this.state.posts.slice(0,3).map(post => {
                return (
                  <tr>
                    <td>
                      <a href='{post.postUrl}'>{post.title}</a><br/><br/>
                      IMAGE
                    </td>
                    <td>
                      {post.postDate}<br/><br/>
                      {post.post}
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
