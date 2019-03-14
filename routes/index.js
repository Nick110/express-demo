var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //引入对象
var TodoModel = mongoose.model('todo'); //引入模型
var URL = require('url'); //引入URL中间件，获取req中的参数需要

// 设置允许跨域访问该服务.
router.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  // Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.type('html');
  res.render('index');
});

router.post('/create', function (req, res) {
  console.log('req.body', req.body);
  new TodoModel({ //实例化对象，新建数据
    content: req.body.content,
    updated_at: Date.now()
  }).save(function (err, todo, count) { //保存数据
    console.log('内容', todo, '数量', count); //打印保存的数据
    res.redirect('/'); //返回首页
  });
});

router.get('/search', function (req, res, next) {
  TodoModel.
  find().
  sort('updated_at').
  exec(function (err, aa, count) {
    res.send(aa);
  });
});

router.get('/edit', function (req, res) {
  var params = URL.parse(req.url, true).query;
  //res.send(params);
  TodoModel.findById(params.id, function (err, todo) {
    // res.redirect('edit'); //返回首页
    res.send(todo);
  })
})

router.post('/update', function (req, res) {
  //res.send(req);
  console.log(req.body);
  TodoModel.findById(req.body._id, function (err, todo) {
    todo.content = req.body.content;
    todo.updated_at = Date.now();
    todo.save();
  })
  res.redirect('/'); //返回首页
})

router.get('/destroy', function (req, res) {
  var params = URL.parse(req.url, true).query;
  console.log(params);
  //根据待办事项的id 来删除它
  TodoModel.findById(params.id, function (err, todo) {
    todo.remove(function (err, todo) {
      res.redirect('/');
    });
  });
})

module.exports = router;