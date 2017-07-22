var express = require('express');
var mongoose = require('mongoose');
var User = require('../model/user');
var router = express.Router();
var request = require('request');

/* 显示主页 */
router.get('/', function(req, res, next) {
  res.render('index');
});

// 增加

// router.get("/saveUser",function(req,res,next){
// 	console.log('dtaat')
// 	res.send(user);
// })
router.post("/saveUser",function(req,res,next){
	// console.log("save success",req.body.name,req.body.age);
	var user = new User({
		name:req.body.name,
		sex:req.body.sex,
		age:req.body.age,
		school:req.body.school
	})

	user.save(function(err,data){
		if(err) console.log(err);
		// console.log("data is "+ data._id);
	});

	// 返回数据给前台
	res.json(user);
})

// 修改
router.post('/modify',function (req,res,next) {
	// 传入要查询的id值
	var id = req.body.id || '';
	// console.log(req.body)
	User.update({
		_id: id,
	},{
		name:req.body.name,
		sex:req.body.sex,
		age:req.body.age,
		school:req.body.school
	}).then(function(){
		User.findById(id,function(err,user){
			if(err) console.log(err);
			res.json(user); 
		})
	})
})

// 删除
router.post('/delete',function(req,res,next){
	var id = req.body.id || '';

	User.remove({
		_id: id,
	}).then(function(){
		res.json('删除成功');
	})
})


module.exports = router;
