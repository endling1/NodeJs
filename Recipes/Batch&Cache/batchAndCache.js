var api = require('./timeConsumingApi.js');

var batchQ = {};
var cache = {};


module.exports = function(data, callback){

	if(cache[data]){
		console.log('Cached response');
		process.nextTick(function(){
			callback(null, cache[data]);
		});
		return;
	}

	if(batchQ[data]){
		console.log('Batched');
		batchQ[data].push(callback);
		return;
	}

	batchQ[data] = [callback];
	api(data, function(err, res){
		cache[data] = res;
		setTimeout(function(){
			console.log('Deleting cache: ' + data);
			delete cache[data];
		}, 10000);

		var q = batchQ[data];
		batchQ[data] = null;
		q.forEach(function(cb){
			cb(err, res);
		});
	});
};