var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var util = require('util');
var imgs = require('../model/imgs.js');
var comments = require('../model/comments.js');

var router = express.Router();
var _util = require('../lib/util.js');
router.all('/details_1/:id', function(req, res, next) {

	if(req.params.id) {

		imgs.findOne(parseInt(req.params.id), function(err, result1) {

			if(err) return res.json({ "status": 0, "error": "获取失败！！" });

			if(result1.length <= 0)
				return res.json({ "status": 0, "error": "图片不存在！！" });
			imgs.userFindAll(result1[0]['user_id'], function(err, result2) {
				if(err) return res.json({ "status": 0, "error": "获取失败！！" });
				comments.imgIdFindAll(parseInt(req.params.id), function(err, result3) {
                     console.log(result3);
					res.render('details_1', {
							"activePage":2,
						"username": req.session.username ? req.session.username : null,
						"user_id": req.session.user_id ? req.session.user_id : null,
						"type": req.session.type ? req.session.type : null,
						"avatar": req.session.avatar ? req.session.avatar : "default.jpg",

						"imgData": result1[0],
						"imglist": result2,
						"comments": result3,
						"changeTime": _util.getDateDiff

					});
				})

			});

		});
	}

});
router.all('/details', function(req, res, next) {
 console.log(req.query.id);
	if(req.query.id) {

		imgs.findOne(parseInt(req.query.id), function(err, result1) {

			if(err) return res.json({ "status": 0, "error": "获取失败！！" });

			if(result1.length <= 0)
				return res.json({ "status": 0, "error": "图片不存在！！" });
			imgs.userFindAll(result1[0]['user_id'], function(err, result2) {
				if(err) return res.json({ "status": 0, "error": "获取失败！！" });
				comments.imgIdFindAll(parseInt(req.query.id), function(err, result3) {
     return    res.json({ "status": 1, "result":{"imgData":result1[0],"imglist": result2,"comments":result3}});
					// res.render('details', {
					// 	"username": req.session.username ? req.session.username : null,
					// 	"user_id": req.session.user_id ? req.session.user_id : null,
					// 	"type": req.session.type ? req.session.type : null,
					// 	"avatar": req.session.avatar ? req.session.avatar : "default.jpg",
					//
					// 	"imgData": result1[0],
					// 	"imglist": result2,
					// 	"comments": result3,
					// 	"changeTime": _util.getDateDiff
					//
					// });
				})

			});

		});
	}

});
router.get('/changOk', function(req, res, next) {
	var id = parseInt(req.query.id);
	var isok = req.query.isok==1?0:1;

	imgs.findOne(id, function(err, result1) {

		if(err) return res.json({ "status": 0, "error": "失败!!" });
		if(result1.length <= 0)
			return res.json({ "status": 0, "error": "作品不存在!!" });
		imgs.changOk(id, isok, function(err, result2) {
			if(err) return res.json({ "status": 0, "error": "失败!!" });
			res.json({ "status": 1, "success": "成功！！","isok":isok});
		});
	});

});
var pageSize = 5;
router.get('/s/show/', function(req, res, next) {
	imgs.typeCount(0,function(err,maxPage){
	res.render('showOk', {
		"activePage":2,
		"username": req.session.username ? req.session.username : null,
		"user_id": req.session.user_id ? req.session.user_id : null,
		"avatar": req.session.avatar ? req.session.avatar : "default.jpg",
		"type": 's',
		maxPage:Math.ceil(maxPage[0].count/pageSize)+1
	});
})
});
router.get('/s/ok/:page', function(req, res, next) {
	var currentPage = parseInt(req.params.page);


	if(!currentPage || typeof currentPage !== 'number') {
		return res.json({ "status": 0, "error": "参数有误page!!" });
	}

	imgs.findAllOk((currentPage - 1) * pageSize, pageSize, function(err, result) {

		if(err) return res.json({ "status": 0, "error": "获取失败！！！!!" });
		if(result.length <= 0 || !result[0]['id']) {
			console.log("没有更多数据------->" + currentPage)
			return res.json({ "status": 0, "error": "没有更多数据" });;
		}
      console.log(result);
		return res.json({ "status": 1, "total": result.length, "result": result  });

	});
});

router.get('/t/show/', function(req, res, next) {

	imgs.typeCount(1,function(err,maxPage){

		res.render('showOk', {
			"activePage":3,
			"username": req.session.username ? req.session.username : null,
			"user_id": req.session.user_id ? req.session.user_id : null,
			"avatar": req.session.avatar ? req.session.avatar : "default.jpg",
			"type": 't',
			maxPage:Math.ceil(maxPage[0].count/pageSize)+1
		});

	})

});
router.get('/t/ok/:page', function(req, res, next) {
	var currentPage = parseInt(req.params.page);


	if(!currentPage || typeof currentPage !== 'number') {
		return res.json({ "status": 0, "error": "参数有误page!!" });
	}


		imgs.findAll(1, (currentPage - 1) * pageSize, pageSize, function(err, result) {

		 if(err) return res.json({ "status": 0, "error": "获取失败！！！!!" });
		 if(result.length <= 0) {
			 console.log("没有更多数据------->" + currentPage)
			 return res.json({ "status": 0, "error": "没有更多数据" });;
		 }

		 return res.json({ "status": 1, "total": result.length, "result": result });

	 });


});
router.get('/addshow', _util.checkLogin);
router.get('/addshow', function(req, res, next) {

	res.render('addImgs', {
			"activePage":0,
		"username": req.session.username ? req.session.username : null,
		"user_id": req.session.user_id ? req.session.user_id : null,
		"avatar": req.session.avatar ? req.session.avatar : "default.jpg"
	});
});
router.get('/add/img', _util.checkLogin);
router.post('/add/img', function(req, res, next) {

	var form = new formidable.IncomingForm();
	form.uploadDir = __dirname + "/../upload";
	form.keepExtensions = true;
	form.encoding = 'utf-8';

	form.parse(req, function(err, fields, files) {

		if(err) {
			return res.json({ "status": 0, "error": "上传失败！！" });

		}

		if(files.file.length == 0) {
			return res.json({ "status": 0, "error": "上传失败！！" });

		}

		var oldPath = files.file.path;

		var newPath = __dirname + '/../upload/' + _util.setMd5(req.session.username + '_' + (new Date().getTime())) + path.extname(files.file.name);

		fs.rename(oldPath, newPath, function(err) {
			if(err) {

				return res.json({ "status": 0, "error": "上传失败！！" });

			}

			req.session.imgurl = path.basename(newPath);
			return res.json({ "status": 1 });
		})

	})
});
router.get('/add/text', _util.checkLogin);
router.post('/add/text', function(req, res, next) {

	if(!req.body.description)
		return res.json({ "status": 0, "error": "描述不能为空！！" });
	if(!req.session.imgurl)
		return res.json({ "status": 0, "error": "图片不能为空！！" });

	var user_id = req.session.user_id;
	var description = req.body.description;
	var imgurl = req.session.imgurl;
	var open = req.body.open;
	var kind = req.body.kind;
	var create_time = new Date().getTime();

	var data = {
		"user_id": user_id,
		"description": description,
		"imgurl": imgurl,
		"open": open,
		"kind": kind,
		"create_time": create_time
	};

	imgs.add(data, function(err, result) {
		console.log(err);
		if(err) return res.json({ "status": 0, "error": "保存失败" });
		req.session.imgurl = null;
		return res.json({ "status": 1, "user_id": user_id });
	});

});
router.get('/delete/:img_id', _util.checkLogin);
router.get('/delete/:img_id', function(req, res, next) {
	if(!req.params.img_id) {

		return res.json({ "status": 0, "error": "删除失败!!" });
	}
	var id = parseInt(req.params.img_id);
	imgs.findOne(id, function(err, result1) {
		if(err) return res.json({ "status": 0, "error": "删除失败!!" });
		if(result1.length <= 0)
			return res.json({ "status": 0, "error": "作品不存在!!" });
		imgs.delete(id, function(err, result2) {
			if(err) return res.json({ "status": 0, "error": "删除失败!!" });
			res.json({ "status": 1, "success": "删除成功！！" });
		});
	});

})
router.get('/updateshow/:id', _util.checkLogin);
router.get('/updateshow/:id', function(req, res, next) {
	if(!req.params.id) {

		return res.json({ "status": 0, "error": "编辑失败!!" });
	}
	var id = parseInt(req.params.id);
	console.log("------" + id);
	imgs.findOne(id, function(err, result) {
		if(err) return res.json({ "status": 0, "error": "编辑失败!!" });
		if(result.length <= 0)
			return res.json({ "status": 0, "error": "作品不存在!!" });
		console.log(result);
		res.render('updateImg', {
				"activePage":0,
			"username": req.session.username ? req.session.username : null,
			"user_id": req.session.user_id ? req.session.user_id : null,
			"avatar": req.session.avatar ? req.session.avatar : "default.jpg",
			"img": result[0]
		});
	});
});
router.get('/updateimg', _util.checkLogin);
router.post('/updateimg', function(req, res, next) {

	var id = parseInt(req.body.id);
	var description = req.body.description;
	var kind = req.body.kind;
	var open = req.body.open;
	console.log("------" + id);
	console.log(req.body);
	imgs.update({ "description": description, "kind": kind, "open": open, "id": id }, function(err, result) {

		if(err) return res.json({ "status": 0, "error": "修改失败！！！!!" });

		console.log(req.body);
		//		if(result.length<=0)
		//		return res.json({ "status": 0, "error": "作品不存在!!" });

		res.json({ "status": 1, "success": "修改成功！！", "user_id": req.session.user_id });
	});
})
router.get('/page/:page', function(req, res, next) {

	var currentPage = parseInt(req.params.page);
	var pageSize_ = 15;

	if(!currentPage || typeof currentPage !== 'number') {
		return res.json({ "status": 0, "error": "参数有误page!!" });
	}

	imgs.findAll(0, (currentPage - 1) * pageSize_, pageSize_, function(err, result) {

		if(err) return res.json({ "status": 0, "error": "获取失败！！！!!" });
		if(result.length <= 0) {
			console.log("没有更多数据------->" + currentPage)
			return res.json({ "status": 0, "error": "没有更多数据" });;
		}

		return res.json({ "status": 1,"total": result.length, "result":result});

	});

})
module.exports = router;
