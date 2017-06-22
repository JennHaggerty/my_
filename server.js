//FIXME: get rid of PM2 in favor of systemD
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var getData = require("./functions")

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//REACT VERSION
app.get('/:url', getData.getUsers)
app.get('/schools/:userId', getData.getSchools)
app.get('/interests/:userId', getData.getInterests)
app.get('/details/:userId', getData.getDetails)
app.get('/blurbs/:userId', getData.getBlurbs)
app.get('/friends/:userId', getData.getFriends)
app.get('/shows/:userId', getData.getShows)
app.get('/prints/:userId', getData.getPrints)
app.get('/posts/:userId', getData.getPosts)
app.post('/details/:userId', getData.editDetails)
app.post('/interests/:userId', getData.editInterests)

// Web server invocation.. starts listening for connection requests here
app.listen(3001, function () {
  console.log('Tom is listening on port 3001!')
});