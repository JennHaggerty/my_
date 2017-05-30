var config = require('../config'); // config for db connector/driver
var knex = require('knex')(config); // database connector/driver
var moment = require('moment');
var react = require('react');
var ReactDOM = require ('react-dom');

function Schools(props) {
  // textInput must be declared here so the ref callback can refer to it
  let textInput = null;

  function handleClick() {
    textInput.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={(input) => { textInput = input; }} />
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );  
}