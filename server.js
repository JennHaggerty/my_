//FIXME: get rid of PM2 in favor of systemD
var config = require('./config'); // config for db connector/driver
var knex = require('knex')(config); // database connector/driver
var express = require('express'); // web server
var app = express(); // web server instance
var moment = require('moment');

// first-attempt.
//var blog  = require('./blog'); // rudimentary server-side template example
//       res.send(blog.buildLatestCommentsHtml(comments))

app.set('views', './templates')
app.set('view engine', 'pug')

/* web server routes */
// Route for 'GET /' (AKA also /index.html, /index.htm).
app.get('/:url', function (req, res, next) {
	var url = req.params.url;
	//console.log('someone is looking for user: ', url)

	//first data inquiry, will stop at res.render (BECAUSE THAT IS OUR RESPONSE TO THE BROWSER SAYING HEY. WE DONE.).
	knex.select().table('users').where('url', url).then(function(users) {
		if (!users.length) {
			// no users found. move to next middleware or route
			return next();
		}
		//user info
		var user = users[0];
		var userName = user.name;
		var userSex = user.sex;
		var userAge = user.age;
		var city = user.city;
		var state = user.state;
		//user interests
		var general = user.general;
		var music = user.music;
		var movies = user.movies;
		var television = user.television;
		var books = user.books;
		var heroes = user.heroes;
		//user details
		var status = user.status;
		var hereFor = user.hereFor;
		var hometown = user.hometown;
		var bodyType = user.bodyType;
		var ethnicity = user.ethnicity;
		var sign = user.sign;
		var smoke = user.smoke;
		var drink = user.drink;
		var education = user.education;
		var occupation = user.occupation;
		//user experience
		var shows = user.galleryShows;
		var prints = user.prints;
		var schools = user.schools;
		//comments
		var comments = user.comments;
		var latestComments = user.latestComments;

		console.log('shows', user.galleryShows)

		// will begin another data inquiry, further inquiries must continue the nesting with res.render going INTO THE LAST ONE.
		knex.select().from('blog').where('owner', user.id).orderBy('date', 'desc').then(function(comments) {
			var latestComments = comments.slice(0, 6);
			var comment = comments;

			comments = comments.map(function(comment) {
				comment.date = moment(comment.date).format('MMMM DD, YYYY hh:mm A');
				return comment;
			})

			knex.select().from('galleryShows').then(function(galleryShows)	{
				var shows = galleryShows;
				shows = shows.map(function(show) {
					show.startDate = moment(show.startDate).format('MM/DD/YYYY');
					show.endDate = moment(show.endDate).format('MM/DD/YYYY');
					return show;
				})

				var myData = {
					//user info
					userName: userName,
					userSex: userSex,
					userAge: userAge,
					city: city,
					state: state,
					//user interests
					general: general,
					music: music,
					movies: movies,
					television: television,
					books: books,
					heroes: heroes,
					//user details
					status: status,
					hereFor: hereFor,
					hometown: hometown,
					bodyType: bodyType,
					ethnicity: ethnicity,
					sign: sign,
					smoke: smoke,
					drink: drink,
					education: education,
					occupation: occupation,
					//user experience
					shows: shows,
					prints: prints,
					schools: schools,
					//comments
					latestComments: latestComments,
					comments: comments
				}

				res.render('user', myData);
			});
			// feed 'myData' to the 'user'(.pug) template.
			//	//will allow the page to render, waiting for ALL queries to finish before spitting out ALL the information requested.
			//res.render('user', myData);
		});
	})
  // do something with error, maybe even just:
	.catch(console.log)
  
	//anything added here will spit out whether or not the queries ^ have finished, probably causing it to crash.
	//something can go here to say don't start until ^ is finished, right? No. If something needs to wait for something else
	//to finish, put it in the ^ scope otherwise it will run regardless if ^ is finished.
});

app.get('/', function (req, res, next) {
  return res.render('index', {/*nodata*/});
});

// STATIC WEB RESOURCES
// web server middleware to look for static files for any unhandled requests to this point
app.use(express.static('www'))

// Web server invocation.. starts listening for connection requests here
app.listen(80, function () {
  console.log('Tom is listening on port 80!')
});
