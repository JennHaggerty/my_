//FIXME: get rid of PM2 in favor of systemD
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var getData = require("./functions")
var passport = require('passport'), 
    LocalStrategy = require('passport-local').Strategy;
var config = require('./config'); // config for db connector/driver
var knex = require('knex')(config); 

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
// get the user
app.get('/:url', getData.getUsers)
// retrieves user information form DB via the URL assigned to user
app.get('/schools/:userId', getData.getSchools)
app.get('/interests/:userId', getData.getInterests)
app.get('/details/:userId', getData.getDetails)
app.get('/blurbs/:userId', getData.getBlurbs)
app.get('/friends/:userId', getData.getFriends)
app.get('/shows/:userId', getData.getShows)
app.get('/prints/:userId', getData.getPrints)
app.get('/posts/:userId', getData.getPosts)
// send input data from forms to DB.
app.post('/details/:userId', getData.editDetails)
app.post('/interests/:userId', getData.editInterests)


// user login
//app.post('/:user', getUser.getUsers)


  // Passport is a server-side tool for managing passwords
  // the client (this react app) is only responsible for sending a
  // user's password string and username string to the server
  //
  // once the login request reaches the server (via axios
  // from the input form submit handler), then on the server you
  // have a passport strategy for sign-up and log-in.
  //
  // honestly, each of those will require their own endpoint.
  // e.g. app.post('/login', someLoginCallbackFunction)
  //      app.post('/signup', someSignupCallbackFunction)
  //      // where both of those functions get (req, res, next)
  //      // and the user data from the req.body (see how details
  //      // done)
  // this is called routing, which is handled by our Express.js `app`
  // see Express documentation for routes for more info.

var session = require('express-session')

app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(id, done) {
  knex.select().from('users').where('email', id)
    		.then(function(users){
    			if (!users.length) {
    				return done('user not found');
    			}

    			done(null, users[0]);
    		})
    		.catch(function(err){
					console.log('fuck,', err);
					done('no');
    		})
});
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(username, password, done) {
    	console.log(username);
    	console.log(password);

var crypto = require('crypto');
//const secret = 'abcdefg';
var hash = crypto.createHmac('sha256', password)
                   //.update('I love cupcakes')
                   .digest('hex');
console.log('hash', hash);

    	knex.select().from('users').where('email', username)
    		.then(function(users){
    			if (!users.length) {
    				return done('user not found');
    			}
if (users[0].password !== hash) {
  return done('try again, motherfucker!!');
}
    			done(null, users[0]);
    		})
    		.catch(function(err){
					console.log('fuck,', err);
					done('no');
    		})
    }
  ));

// Setting the failureFlash option to true instructs Passport to flash
// an error message using the message option set by the verify callback above. 
// This is helpful when prompting the user to try again.
app.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
    if (err) { return res.send(err); }
    if (!user) { return next('no user found'); }
    res.send('ok');
//    req.logIn(user, function(err) {
//      if (err) { return next(err); }
//      return res.redirect('/users/' + user.username);
//    });
  })(req, res, next);
});

// user logout
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


// Web server invocation.. starts listening for connection requests here
app.listen(3001, function () {
  console.log('Tom is listening on port 3001!')
});