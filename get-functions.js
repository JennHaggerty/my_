var config = require('./config'); // config for db connector/driver
var knex = require('knex')(config); // database connector/driver
var moment = require('moment');

function getUsers(req, res, next) {
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
}

function getSchools(req, res, next) {
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
}

function getInterests(req, res, next) {
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
}

function getDetails(req, res, next) {
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
}

function getShows(req, res, next) {
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
}

function getPrints(req, res, next) {
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
}

function getPosts(req, res, next) {
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
}

module.exports = {
   getUsers,
   getDetails,
   getInterests,
   getPosts,
   getSchools,
   getShows,
   getPrints
}