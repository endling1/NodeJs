var task = function(callback){
	setTimeout(function(){
		callback();
	}, 300);
}

var tasks = [task, task, task, task];

module.exports = tasks;