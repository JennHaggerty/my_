//FIXME: get rid of PM2 in favor of systemD
var config = require('./config'); // config for db connector/driver
var knex = require('knex')(config); // database connector/driver
var express = require('express'); // web server
var app = express(); // web server instance
var moment = require('moment');
//var users = require('./routes/users-react');
var multer  = require('multer');
var upload = multer(); // for parsing multipart/form-data
// first-attempt.
//var blog  = require('./blog'); // rudimentary server-side template example
//       res.send(blog.buildLatestCommentsHtml(posts))
app.set('views', './templates')
app.set('view engine', 'pug')
// CREATE, READ, UPDATE, DELETE users
//app.get('/users/add', users.add); //add new user
//app.post('/users/add', users.save); //save new user
//app.get('/users/delete/:url', users.deleteUser); //deletes user
//app.get('/users/edit/:url', users.edit); //edit user
//app.post('/users/edit/:url', users.saveEdit); //commits changes to user

// Adds CORS support for ALL (*) domains.. will want to limit in production
// to only EXPECTED domains (granted, not really an issue if/when this is
// merged with the react app code on the same port)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//REACT VERSION
app.get('/:url', function (req, res, next) {
	var url = req.params.url;
	knex.select().table('users').where('url', url).then(function(users) {
		if (!users.length) {
			// no users found. move to next middleware or route
			return next();
		}

		return res.send(users[0]);
	})
  // do something with error, maybe even just:
	.catch(console.log)
})
app.get('/schools/:userId', function (req, res, next) {
	var userId = req.params.userId;
	knex.select().from('schools').where('userId', userId).orderBy('yearFinished', 'desc').then(function(schools) {
		var schools = schools;

		schools = schools.map(function(school) {
			school.yearFinished = moment(school.yearFinished).format('YYYY');
			school.yearStarted = moment(school.yearStarted).format('YYYY');
			return school;
		});

		res.send(schools);
	});
})
app.get('/interests/:userId', function (req, res, next) {
	var userId = req.params.userId;
	knex.select().from('interests').where('userId', userId).then(function(interests) {
		interests = interests.map(function(interest) {
			var _interest = {};
			_interest.general = interest.general;
			_interest.music = interest.music;
			_interest.movies = interest.movies;
			_interest.television = interest.television;
			_interest.books = interest.books;
			_interest.heroes = interest.heroes
			return _interest;
		})
		res.send(interests);
	});
})
app.get('/details/:userId', function (req, res, next) {
	var userId = req.params.userId;
	knex.select().from('details').where('userId', userId).then(function(details) {
		details = details.map(function(detail) {
			var _detail = {};
			_detail.status = detail.status;
			_detail.hereFor = detail.hereFor;
			_detail.hometown  = detail.hometown;
			_detail.bodyType = detail.bodyType;
			_detail.ethnicity = detail.ethnicity;
			_detail.sign = detail.sign;
			_detail.smoke = detail.smoke;
			_detail.drink = detail.drink;
			_detail.education = detail.education;
			_detail.occupation = detail.occupation
			return _detail;
		})
		res.send(details);
	});
})
app.get('/shows/:userId', function (req, res, next) {
	var userId = req.params.userId;
	knex.select().from('shows').where('userId', userId).then(function(shows) {
		shows = shows.map(function(show) {
			var _show = {};
			_show.venueName = show.venueName;
			_show.title = show.title;
			_show.city = show.city;
			_show.state = show.state;
			_show.showDate = show.showDate;
			_show.venueUrl = show.venueUrl;
			_show.showDate = moment(show.showDate).format('YYYY');
			_show.showType = show.showType
			return _show;
		})
		res.send(shows);
	});
})
app.get('/prints/:userId', function (req, res, next) {
	var userId = req.params.userId;
	knex.select().from('prints').where('userId', userId).then(function(prints) {
		prints = prints.map(function(print) {
			var _print = {};
			_print.title = print.title;
			_print.publication = print.publication;
			_print.printDate = moment(print.printDate).format('YYYY');
			_print.publicationUrl = _print.publicationUrl
			return _print;
		})
		res.send(prints);
	});
})
app.get('/posts/:userId', function (req, res, next) {
	var userId = req.params.userId;
	knex.select().from('posts').where('userId', userId).then(function(posts) {
		posts = posts.map(function(post) {
			var _post = {};
			_post.title = post.title;
			_post.body = post.body;
			_post.postDate = moment(post.date).format('MMMM DD, YYYY hh:mm A');
			_post.featuredImg = post.featuredImg;
			_post.latestPosts = posts.slice(0, 6);
			_post.lastLogin = moment(posts.slice(0)[0].date).format('MM/DD/YYYY');
			return _post;
		})
		res.send(posts);
	});
})
//ORIGINAL CODE prior to React
/* web server routes */
// Route for 'GET /' (AKA also /index.html, /index.htm).
/*
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
		//posts
		var posts = user.posts;
		var latestPosts = user.latestPosts;
		var totalPosts = user.totalPosts;
		var about = user.about;
		var meet = user.meet;

		// will begin another data inquiry, further inquiries must continue the nesting with res.render going INTO THE LAST ONE.
		knex.select().from('blog').where('owner', user.id).orderBy('date', 'desc').then(function(posts) {
			if (posts !== null) {
				var latestPosts = posts.slice(0, 6);
				var post = posts;
				var totalPosts = posts.length;
				var lastLogin = moment(posts.slice(0)[0].date).format('MM/DD/YYYY');

				posts = posts.map(function(post) {
					post.date = moment(post.date).format('MMMM DD, YYYY hh:mm A');
					return post;
				})
			};
				
			knex.select().from('shows').orderBy('showDate', 'desc').then(function(shows)	{
				var shows = shows;
				shows = shows.map(function(show) {
					show.showDate = moment(show.showDate).format('YYYY');
					return show;
				});
				knex.select().from('schools').orderBy('yearFinished', 'desc').then(function(schools) {
					var schools = schools;
					schools = schools.map(function(school) {
						school.yearFinished = moment(school.yearFinished).format('YYYY');
						school.yearStarted = moment(school.yearStarted).format('YYYY');
						return school;
					});
					knex.select().from('prints').orderBy('printDate', 'desc').then(function(prints)	{
						var prints = prints;
						prints = prints.map(function(print) {
							print.printDate = moment(print.printDate).format('YYYY');
							return print;
						});
						//USER DATA	
						var myData = {
						//user info
						userName: userName,
						userSex: userSex,
						userAge: userAge,
						city: city,
						state: state,
						lastLogin: lastLogin,
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
						//posts
						latestPosts: latestPosts,
						posts: posts,
						totalPosts: totalPosts,
						about: about,
						meet: meet
						}
	
						//RENDER THE DATA
						res.render('user', myData);	
					});
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
});
*/

//app.get('/', function (req, res, next) {
//  return res.render('index', {/*nodata*/});
//});


// STATIC WEB RESOURCES
// web server middleware to look for static files for any unhandled requests to this point
//app.use(express.static('www'))

// Web server invocation.. starts listening for connection requests here
app.listen(3001, function () {
  console.log('Tom is listening on port 3001!')
});