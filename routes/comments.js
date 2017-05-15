var express = require('express');
var comments = require('../model/comments.js');
var util = require('../lib/util.js');
var router = express.Router();

router.post('/add',function(req,res,next){
  if(!req.session.user_id){
  	 return res.json({ "status": 0,error:"未登录，请先登录！！"});
    }
	if(req.body){
		//return console.log(req.body);
	   var content= req.body.content;
	   var create_time=req.body.create_time;
	   var img_id=req.body.img_id;
	   var data={"content":content,"create_time":create_time,"user_id":req.session.user_id,"img_id":img_id};
	    comments.add(data,function(err,result){
	    	console.log(err);
//	    	if(err)  return res.json({ "status": 0});
	    	if(result) return res.json({ "status": 1,"type":req.session.type});
	    	
	    	
	    });
	}
});
module.exports = router;
