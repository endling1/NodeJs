const max = 1000000000;
const range = 1000000;
var i = 0;

function cpuBoundTask(callback){
	var j = i + range;
	while(i < j && i < max){
		++i;
	}
	if(i >= max){
		return callback();
	}
	setImmediate(function(){
		cpuBoundTask(callback);
	});
}

module.exports = cpuBoundTask;