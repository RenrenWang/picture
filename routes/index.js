var express = require('express');
var imgs = require('../model/imgs.js');
var util = require('../lib/util.js');
var router = express.Router();

router.get('/', function(req, res, next) {

imgs.typeCount(0,function(err,maxPage){

		res.render('index', {
			"activePage":1,
			"username": req.session.username ? req.session.username : null,
			"user_id": req.session.user_id ? req.session.user_id : null,
			"avatar": req.session.avatar ? req.session.avatar : "default.jpg",
			"maxPage":Math.ceil(maxPage[0].count/15)+1
		});

	})
//  // console.log(new Date().getTime()));
// //	imgs.findAll(1,10,function(err, result) {
// 		//if(err) return console.log(err);
// 		res.render('index', {
      
// //			"imglist":result,
// //			"changTime":util.getDateDiff
// 		});
// 	//});

});

module.exports = router;
