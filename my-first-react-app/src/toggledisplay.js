import React, { Component } from 'react';
//import axios from 'axios';

function isDefined(val) { return val != null; }
export default class ToggleDisplay extends Component {
  //propTypes: {
  //  hide: React.PropTypes.bool,
  //  show: React.PropTypes.bool
  //}
  shouldHide(props) {
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