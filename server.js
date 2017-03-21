//FIXME: get rid of PM2 in favor of systemD
var config = require('./config'); // config for db connector/driver
var knex = require('knex')(config); // database connector/driver
var blog  = require('./blog'); // rudimentary server-side template example
var express = require('express'); // web server
var app = express(); // web server instance

/* web server routes */
// Route for 'GET /' (AKA also /index.html, /index.htm)
app.get('/', function (req, res) {
	 //latest comments
   knex.select('title', 'comment', 'date').from('blog')
     .then(function(comments) {

//var template = /*generate my template*/;
//res.send(template) or res.render(template)

       res.send(blog.buildLatestCommentsHtml(comments))
     })
		 .catch(function(err) {
 			 if (err) {
				 // do something with error, maybe even just:
				 console.log(err);
			 }
		 });
});

// STATIC WEB RESOURCES
// web server middleware to look for static files for any unhandled requests to this point
app.use(express.static('www'))

// Web server invocation.. starts listening for connection requests here
app.listen(80, function () {
  console.log('Tom is listening on port 80!')
});
