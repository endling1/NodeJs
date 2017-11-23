const max = 6999999999;
function cpuBoundTask(callback){
	for(var i = 0; i < max; i++){

	}
	callback();
}

module.exports = cpuBoundTask;