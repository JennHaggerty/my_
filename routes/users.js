var config = require('../config'); // config for db connector/driver
var knex = require('knex')(config); // database connector/driver
var moment = require('moment');
//VIEW user
//exports.list = function(req, res) {
//	req.getConnection(function(err,connection) {
//		connection.query('SELECT * FROM users WHERE id = ?',function(err,rows) {
//			if(err) {
//				console.log("Error Selecting : %s ",err);
//			} else {
//				res.render('users',{page:"User.js",data:rows});
//			};
//		});
//	});
//};
////CREATE user
//exports.add = function(req, res) {
//	var user = req.params.user;
//	if (!user) {
//		console.log("There is no user.");
//		return res.send('There is no user.');	
//	} else {
//		res.render('addUser', {page:"Add User.js"});
//	// Actual user add logic goes here
//	// things to consider:
//	//  - how do I add the user to the db? (knex insert)
//	//	- what if user with that name already exists?
//	//  - what do i use for the other values for a user? (interests, id, whatever)
//	//  - how do I use this route from the client? (aka my webpage)
//
//		return res.send('user ' + user + ' added!');
//	};
//};
////SAVE user
//exports.save = function(req,res) {
//	var input = JSON.parse(JSON.stringify(req.body));
//	req.getConnection(function(err, connection) {
//		
//		var data = {
//			name: input.name,
//			url: input.url,
//			birthday: input.birthday,
//			city: input.city,
//			state: input.state,
//			sex: input.sex,
//			profilePic: input.profilePic,
//			general: input.general,
//			music: input.music,
//			television: input.television,
//			books: input.books,
//			heroes: input.heroes,
//			status: input.status,
//			hereFor: input.hereFor,
//			hometown: input.hometown,
//			ethnicity: input.ethnicity,
//			zodiac: input.zodiac,
//			education: input.education,
//			occupation: input.occupation
//		};
//
//		var query = connection.query("INSERT INTO users set ? ",data, function(err, rows) {
//			if (err) {
//				console.log("Error inserting : %s ", err);
//			} else {
//				res.redirect('/users');
//			};
//		});
//	});
//};
//EDIT USER
exports.edit = function(req, res) {
	var url = req.params.url;
	if (!url) {
		return console.log("There is still no user.");
	}

	// = express docs for getting form data
	var input, hasQueryParams = Object.keys(req.query).length;
	if (hasQueryParams) {
		input = JSON.parse(JSON.stringify(req.query));
	}


		
		//if (input.form_type === 'deleteSchoolForm') {
		
		
		//return knex.select().table('users').where('url', url).then(usersHandler);
	//}

	// looks for and returns user
	return knex.select().table('users').where('url', url).then(usersHandler);

	function usersHandler(users) {
		// no users found. kill it with fire.
		if (!users.length) {
			// TODO if user data input on request, then insert via knex here
			// update to create new user.
			return res.render('editUser', { noUser: true, url: url });
		}

		var user = users[0];
		if (!user) {
			//use this to render new user signup page/
			return res.send('404 No User');
		}

		if (input && input.form_type === 'deleteSchoolForm') {
			//knex('schools').del()
			
			//return knex.del().then(function(){
				input = user;
			  input.form_type = 'user';
			  
//			  	user.schools = schools;
					//if(input type = "checkbox" && ('checked', true){
						knex('schools').del().where('school_id', '=', 'id').then(function(dataFromDB){
							return res.render('editUser', user);
						})
						//})
						return res.send('Unable to delete schools')
				//call function below by name
			//})
		}
		
		dataFromDB(res, url, false, function (user) {
			return res.render('editUser', user);
		})

		// GIVE THIS WHOLE THING A FUNCTION WITH A NAME
		// callfunction by name here also
		function dataFromDB(res, url, noUpdate, callback){
			getSchoolDataFromDB(res, url, function(schools){
				getShowDataFromDB(res, url, function(shows){
					getPrintDataFromDB(res, url, function(prints){
						//getPostDataFromDB(res, url, function(posts){
						user.schools = schools;
						user.shows = shows;
						user.prints = prints;
						//user.posts = posts;
						//console.log('schools', schools);
						if (!input || noUpdate) {
							//return res.send(user);
							// no input?? WHATEVERS
							return callback(user);
							
						}
				
						return databaseUpdate(res, input, user, schools, shows, prints, url);
						//});
					});
				});
			});
		};
		
	}  
};

// error handler
function errorHandler(res) {
	return function(err) {
		console.log('err', err)
		return res.send(err);
	};
}

function databaseUpdate(res, input, user, schools, shows, prints, url) {
	// data shiz
	var formType = input.form_type;
	var id = user.id;

	console.log('user', user);
	console.log('schools', schools);
	// form handler
	if (formType === 'user') {
		var userData = getUserDataFromInput(input);
		console.log('ID',id,userData)
		return knex('users').where('id', '=', id).update(userData)
			.then(function() {
				userData.url = url;
				return res.render('editUser', userData);
			}).catch(errorHandler(res));
	}

	// form handler
	if (formType === 'school') {
		var schoolData = getSchoolDataFromInput(input);
		schoolData.userId = id;
		//console.log('school', schoolData)
		return knex('schools').insert(schoolData)
			.then(function() {
				return res.send('SUCCESS.');
			}).catch(errorHandler(res));
	}

	// form handler
	if (formType == 'show') {
		var showData = getShowDataFromInput(input);
		showData.userId = id;
		return knex('shows').insert(showData)
			.then(function() {
				return res.send('SUCCESS.');
			}).catch(errorHandler(res));
	}
	// form handler
	if (formType == 'print') {
		var printData = getPrintDataFromInput(input);
		printData.userId = id;
		return knex('prints').insert(printData)
			.then(function() {
				return res.send('SUCCESS.');
			}).catch(errorHandler(res));
	}
}

//function getPostDataFromDB(res, url, callback) {
	knex.select('blog.*').from('blog').rightJoin('users', 'users.id', '=', 'blog.userId').orderBy('date', 'desc').then(function(posts){
		if (typeof callback === 'function') {
			callback(posts);
		}	
	})
	.catch(function(err) {
		console.log('couldn\'t find posts')
		console.log(err)
	})
//}
function getPrintDataFromDB(res, url, callback) {
	knex.select('prints.*').from('prints').rightJoin('users', 'users.id', '=', 'prints.userId').orderBy('printDate', 'desc').then(function(prints){
		callback(prints);
		var prints = prints;
		prints = prints.map(function(print) {
			print.printDate = moment(print.printDate).format('YYYY');
			return print;
		});
	})
	.catch(function(err) {
		console.log('couldn\'t find prints')
		console.log(err)
	})
}
function getPrintDataFromInput(qux) {
	return {
		printName: 	qux.printName,
		printUrl:   qux.printUrl,
		printDate:  qux.printDate,
		printType:  qux.printType,
		seriesName: qux.seriesName,
		location:   qux.location
	};
}
function getShowDataFromDB(res, url, callback) {
	knex.select('shows.*').from('shows').rightJoin('users', 'users.id', '=', 'shows.userId').orderBy('showDate', 'desc').then(function(shows){
		if (typeof callback === 'function') {
			callback(shows);
		}	
		var shows = shows;
		shows = shows.map(function(show) {
			show.showDate = moment(show.showDate).format('YYYY');
			return show;
		});
	})
	.catch(function(err) {
		console.log('couldn\'t find shows')
		console.log(err)
	})
}
function getShowDataFromInput(baz) {
	return {
		title: 		 baz.title,
		venueName: baz.venueName,
		location:  baz.location,
		showDate:  baz.showDate,
		showType:  baz.showType
	};
}
function getSchoolDataFromDB(res, url, callback) {
	// MAKE THIS DO THIS QUERY INSTEAD:
	//select * from schools right join users on users.id = schools.id where schools.id is not null
	knex.select('schools.*').from('schools').rightJoin('users', 'users.id', '=', 'schools.userId').whereNotNull('schools.id').orderBy('yearFinished', 'desc').then(function(schools){
		callback(schools);
		var schools = schools;
		schools = schools.map(function(school) {
			school.yearFinished = moment(school.yearFinished).format('YYYY');
			school.yearStarted = moment(school.yearStarted).format('YYYY');
			return school;
		});
	})
	.catch(function(err) {
		console.log('couldn\'t find schools')
		console.log(err)
	})
}
function getSchoolDataFromInput(bar) {
	return {
		schoolName: 		bar.schoolName,
		schoolUrl: 			bar.schoolUrl,
		yearStarted:    bar.yearStarted,
		yearFinished:   bar.yearFinished,
		gradYear: 			bar.gradYear,
		studentStatus: 	bar.studentStatus,
		degree: 				bar.degree,
		major: 					bar.major,
		yearStarted: 		bar.yearStarted,
		yearFinished: 	bar.yearFinished
	};
}
function getUserDataFromInput(foo) {
	return {
		name: 					foo.name,
		sex: 						foo.sex,
		email: 					foo.email,
		city: 					foo.city,
		state: 					foo.state,
		general: 				foo.general,
		music: 					foo.music,
		television: 		foo.television,
		books: 					foo.books,
		heroes: 				foo.heroes,
		status: 				foo.status,
		hereFor: 				foo.hereFor,
		hometown: 			foo.hometown,
		ethnicity: 			foo.ethnicity,
		zodiac: 				foo.zodiac,
		smoke: 					foo.smoke,
		drink: 					foo.drink,
		education: 			foo.education,
		occupation: 		foo.occupation,
		about: 					foo.about,
		meet: 					foo.meet
	};
}
////DELETE user
//exports.deleteUser = function(req,res) {
//	var id = req.params.id;
//	req.getConnection(function(err, connection) {
//		connection.query("DELETE FROM user WHERE id = ? ",[id], function(err,rows) {
//			if(err) {
//				consol.log("Error deleting : %s ",err);
//			} else {
//				res.redirect('/users');
//			};
//		});
//	});
//};