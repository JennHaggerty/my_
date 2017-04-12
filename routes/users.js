var config = require('../config'); // config for db connector/driver
var knex = require('knex')(config); // database connector/driver
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
		console.log("There is still no user.")
	} else {
	 	var input;
	 	if (Object.keys(req.query).length) {
	    input = JSON.parse(JSON.stringify(req.query)); // = express docs for getting form data
	  }
	  if (!input) {
	  	knex.select().table('users').where('url', url).then(function(users) {
			 if (!users.length) {
					// no users found. move to next middleware or route
					return next();
				}
				var user = users[0];
				var userUrl = user.url;
				//return res.render('editUser', user);
  		});  
		} else {
			console.log('userUrl', userUrl);
			var userData = {
		    name: input.name,
		    email: input.email,
		    city: input.city,
		    state: input.state,
		    general: input.general,
				music: input.music,
				television: input.television,
				books: input.books,
				heroes: input.heroes,
				status: input.status,
				hereFor: input.hereFor,
				hometown: input.hometown,
				ethnicity: input.ethnicity,
				zodiac: input.zodiac,
				smoke: input.smoke,
				drink: input.drink,
				education: input.education,
				occupation: input.occupation,
				about: input.about,
				meet: input.meet
			};
			var schools = {
					schoolName: input.schoolName,
					schoolUrl: input.schoolUrl,
					gradYear: input.gradYear,
					studentStatus: input.studentStatus,
					degree: input.degree,
					major: input.major,
					yearStarted: input.yearStarted,
					yearFinished: input.yearFinished
			};

			//EDIT USER
			knex('users').where('url', '=', url).update(userData).then(function() {
				//ADD SCHOOLS
				knex('schools').where('url', '=', url).insert(schools).then(function() {
					return res.render('editUser', user);
					//return res.send('SUCCESS.');
				}).catch(function(err) {
					return res.send(err);
				});
			});
		};
	};
};
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