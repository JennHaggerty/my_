//FIXME: get rid of PM2 in favor of systemD
var express = require('express'); // web server
var app = express(); // web server instance
var getData = require("./get-functions")

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
app.get('/shows/:userId', getData.getShows)
app.get('/prints/:userId', getData.getPrints)
app.get('/posts/:userId', getData.getPosts)

// Web server invocation.. starts listening for connection requests here
app.listen(3001, function () {
  console.log('Tom is listening on port 3001!')
});