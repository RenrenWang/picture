var express = require("express");
var formidable = require("formidable");
var fs = require("fs");
var path = require("path");
var util = require("util");
var user = require("../model/users.js");
var imgs = require("../model/imgs.js");
var _util = require("../lib/util.js");
var router = express.Router();

router.post("/login", function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  if (!username || !password) {
    return res.json({ status: 0, error: "用户名或密码不能为空！！" });
  }
  user.usernameFind(username, function (err, result) {
    if (err) return res.json({ status: 0, error: "登录失败！！" });
    if (result.length <= 0 || result[0].password != _util.setMd5(password))
      return res.json({ status: 0, error: "用户名或密码错误！！" });

    var avatar = result[0]["avatar"];
    var id = result[0]["id"];
    var type = result[0]["type"];
    //    return   console.log(result[0]['id']);
    user.updateLastTime(
      { id: id, last_time: new Date().getTime() },
      function (err, result) {
        if (err) return res.json({ status: 0, error: "登录失败！！" });
        console.log("执行执行");
        req.session.username = username;
        req.session.user_id = id;
        req.session.avatar = avatar;
        req.session.type = type;
        return res.json({ status: 1, username: username, user_id: id });
      }
    );
  });
});
router.post("/register", function (req, res, next) {
  //console.log(req.body);
  var username = req.body.username;
  var password = req.body.password;
  var type = parseInt(req.body.type);

  if (!username || !password) {
    return res.json({ status: 0, error: "用户名或密码不能为空！！" });
  }

  //  return  res.json({"status":1,"username":username});
  user.usernameFind(username, function (err, result) {
    if (err) return res.json({ status: 0, error: "注册失败！！" });

    if (result.length > 0)
      return res.json({ status: 0, error: "用户名已存在！！" });
    var create_time = new Date().getTime();

    user.add(
      [username, _util.setMd5(password), create_time, type],
      function (err, result) {
        if (err) return console.log(err);
        return res.json({ status: 1 });
      }
    );
  });
});

router.get("/personal/:id", _util.checkLogin);
router.get("/personal/:id", function (req, res, next) {
  imgs.userFindAll(req.params.id, function (err, result) {
    if (err) console.log(err);
    console.log("=====", result);
    res.render("personal", {
      username: req.session.username ? req.session.username : null,
      user_id: req.session.user_id ? req.session.user_id : req.params.id,
      avatar: req.session.avatar ? req.session.avatar : "default.jpg",
      list: result,
      changTime: _util.getDateDiff,
      activePage: 0,
    });
  });
});
router.all("/updateAvatar", function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.uploadDir = __dirname + "/../avatar";
  form.keepExtensions = true;
  form.encoding = "utf-8";

  form.parse(req, function (err, fields, files) {
    if (err) {
      return res.json({ status: 0, error: "上传失败！！" });
    }

    if (files.file.length == 0) {
      return res.json({ status: 0, error: "上传失败！！" });
    }

    var oldPath = files.file.path;

    var newPath =
      __dirname +
      "/../avatar/" +
      _util.setMd5(req.session.username + "_" + new Date().getTime()) +
      path.extname(files.file.name);

    fs.rename(oldPath, newPath, function (err) {
      if (err) {
        return res.json({ status: 0, error: "上传失败！！" });
      }

      //req.session.imgurl = path.basename(newPath);
      user.updateAvatar(
        { avatar: path.basename(newPath), id: req.session.user_id },
        function (err, result) {
          console.log(err);

          if (err) return res.json({ status: 0, error: "修改失败！！" });
          console.log("---------" + result);
          req.session.avatar = path.basename(newPath);
          return res.json({ status: 1 });
        }
      );
    });
  });
});
router.get("/logout", _util.checkLogin);
router.get("/logout", function (req, res, next) {
  req.session.username = null;
  req.session.user_id = null;
  req.session.type = null;
  req.session.avatar = null;
  res.redirect("/");
});

module.exports = router;
