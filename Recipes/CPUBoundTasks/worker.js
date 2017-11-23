var cpuBoundTask = require('./cpuBoundTask.js');

process.on('message', function(msg){
	cpuBoundTask(function(){
		process.send({});
	});
});