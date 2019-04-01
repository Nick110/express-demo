var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //引入对象
var poetModel = mongoose.model('poets')
var poetryModel = mongoose.model('poetry')
var URL = require('url'); //引入URL中间件，获取req中的参数需要


/* GET poets listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 设置允许跨域访问该服务.
router.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  // Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

router.get('/search', function (req, res, next) {
  poetModel.find({name: '李白'}).exec(function (err, searchRes, count) {
    console.log('poetModel: ', poetModel)
    debugger
    res.send(searchRes);
  });
});

// 查询tags包括‘唐诗三百首’的poetry的name和poet.name字段
router.get('/tangshi300', function(req, res, next) {
    poetryModel.find({tags: '唐诗三百首'}, 'name poet.name', function(err, poetryResult) {
        res.send(poetryResult)
    })
})

router.get('/songci300', function(req, res, nexr) {
    poetryModel.find({tags: '宋词三百首'}, 'name poet.name', function(err, poetryResult) {
        res.send(poetryResult)
    })
})

router.get('/poetryListByTag', function(req, res) {
    const tagName = req.query.tagName
    poetryModel.find({tags: tagName}, 'name poet.name', function (err, poetryResult) {
        if(err) {
            return console.log(err)
        }
        res.send(poetryResult)
    })
})

module.exports = router;