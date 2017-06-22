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
		// [userDetails1,userDetails2,userDeatils3]
		// [userDetails1]
		// [{ foo: bar, baz: bap, status: asdf}]
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
		// [{ status: asdf, hometown: undefined, [...] }]
		res.send(details);
	});
}

function getBlurbs(req, res, next) {
	var userId = req.params.userId;
	knex.select().from('blurbs').where('userId', userId).then(function(blurbs) {
		blurbs = blurbs.map(function(blurb) {
			var _blurb = {};
			_blurb.about = blurb.about;
			_blurb.meet = blurb.meet
			return _blurb;
		})
		res.send(blurbs);
	});
}

function getFriends(req, res, next) {
	var userId = req.params.userId;
	knex.select().from('friends').where('userId', userId).orderBy('dateAdded', 'desc').then(function(friends) {
		friends = friends.map(function(friend) {
			var _friend = {};
			_friend.name = friend.name;
			_friend.url = friend.url;
			_friend.img = friend.img
			return _friend;
		})
		res.send(friends);
	});
}

function getShows(req, res, next) {
	var userId = req.params.userId;
	knex.select().from('shows').where('userId', userId).orderBy('showDate', 'desc').then(function(shows) {
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
	knex.select().from('prints').where('userId', userId).orderBy('printDate', 'desc').then(function(prints) {
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
	knex.select().from('posts').where('userId', userId).orderBy('postDate', 'desc').then(function(posts) {
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

function editInterests (req, res, next) {
	var userId = req.params.userId;
	var interests = {};
	if (!req.body) {
		return res.send('no data provided!!');
	}

	if (req.body.general) {
		interests.general = req.body.general;
	}
	if (req.body.music) {
		interests.music = req.body.music;
	}
	if (req.body.movies) {
		interests.movies = req.body.movies;
	}
	if (req.body.television) {
		interests.television = req.body.television;
	}
	if (req.body.books) {
		interests.books = req.body.books;
	}
	if (req.body.heroes) {
		interests.heroes = req.body.heroes;
	}

	knex('interests').where('userId', userId).update(interests)
	.then(function(){
		res.send(interests);	
	})
	.catch(function (err) {
		console.log(err);
		res.send('something went wrong');
	})
}

function editDetails (req, res, next) {
	var userId = req.params.userId;
	var details = {};
	if (!req.body) {
		return res.send('no data provided!!');
	}

	if (req.body.status) {
		details.status = req.body.status;
	}
	if (req.body.hereFor) {
		details.hereFor = req.body.hereFor;
	}
	if (req.body.hometown) {
		details.hometown = req.body.hometown;
	}
	if (req.body.bodyType) {
		details.bodyType = req.body.bodyType;
	}
	if (req.body.ethnicity) {
		details.ethnicity = req.body.ethnicity;
	}
	if (req.body.sign) {
		details.sign = req.body.sign;
	}
	if (req.body.smoke) {
		details.smoke = req.body.smoke;
	}
	if (req.body.drink) {
		details.drink = req.body.drink;
	}
	if (req.body.education) {
		details.education = req.body.education;
	}
	if (req.body.occupation) {
		details.occupation = req.body.occupation;
	}

	knex('details').where('userId', userId).update(details)
	.then(function(){
		res.send(details);	
	})
	.catch(function (err) {
		console.log(err);
		res.send('something went wrong');
	})
}

module.exports = {
   getUsers,
   getDetails,
   getInterests,
   getBlurbs,
   getFriends,
   getPosts,
   getSchools,
   getShows,
   getPrints,
   editDetails,
   editInterests
}