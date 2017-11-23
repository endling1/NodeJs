// var api = require('./timeConsumingApi.js');
// var url = require('url');

// require('http').createServer(function(req, res){
// 	var data = url.parse(req.url, true).query.data;
// 	api(data, function(err, result){
// 		res.end(result);
// 	});
// }).listen(3000,() => console.log('Listening'));

var api = require('./batchAndCache.js');
var url = require('url');

require('http').createServer(function(req, res){
	var data = url.parse(req.url, true).query.data;
	api(data, function(err, result){
		res.end(result);
	});
}).listen(3000,() => console.log('Listening'));