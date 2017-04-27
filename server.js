//FIXME: get rid of PM2 in favor of systemD
var config = require('./config'); // config for db connector/driver
var knex = require('knex')(config); // database connector/driver
var express = require('express'); // web server
var app = express(); // web server instance
var moment = require('moment');
var users = require('./routes/users');
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
app.get('/users/edit/:url', users.edit); //edit user
//app.post('/users/edit/:url', users.saveEdit); //commits changes to user

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

app.get('/', function (req, res, next) {
  return res.render('index', {/*nodata*/});
});

// STATIC WEB RESOURCES
// web server middleware to look for static files for any unhandled requests to this point
app.use(express.static('www'))

// Web server invocation.. starts listening for connection requests here
app.listen(3000, function () {
  console.log('Tom is listening on port 3000!')
});