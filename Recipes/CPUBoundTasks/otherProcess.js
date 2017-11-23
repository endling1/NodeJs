var fork = require('child_process').fork;

module.exports = function(callback){
	var worker = fork('./worker.js');
	worker.on('message', callback);
	worker.send({});
}