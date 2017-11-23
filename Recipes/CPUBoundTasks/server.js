//var cpuBoundTask = require('./cpuBoundTask.js');
//var cpuBoundTask = require('./interleavingWithSetImmediate.js');
var cpuBoundTask = require('./otherProcess.js');

var url = require('url');

require('http').createServer(function(req, res){
	var path = url.parse(req.url).path;
	if(path === '/cpu'){
		cpuBoundTask(function(){
			res.end('Cpu bound task executed\n');
		});
		return;
	}
	res.end('Hello world!\n');
}).listen(3000,() => console.log('Listening'));	