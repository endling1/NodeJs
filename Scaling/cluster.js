var cluster = require('cluster');

if(cluster.isMaster){
	var list = {};

	// Availability and Resiliency
	cluster.on('exit', function(worker, code){
		console.log('Worker: ' + worker.id + ' crashed with code ' + code);
		if(!worker.suicide && code !== 0){
			var newWorker = cluster.fork({port: list[worker.id]});
			list[newWorker.id] = list[worker.id];
			delete list[worker.id];
		}
	});

	// Zero downtime restart
	process.on('SIGUSR2', function(){
		console.log('Restarting workers');
		var ids = Object.keys(list);

		function restartWorkers(i){
			if(i >= ids.length){
				return;
			}
			var worker = cluster.workers[ids[i]];
			console.log('Stopping: ' + worker.id);
			worker.disconnect();

			worker.on('exit', function(){
				var newWorker = cluster.fork({port: list[worker.id]});
				list[newWorker.id] = list[worker.id];
				delete list[worker.id];
				newWorker.on('listening', function(){
					restartWorkers(++i);
				});
			});
		}

		restartWorkers(0);
	});

	for(var i = 0; i < 3; i++){
		var worker = cluster.fork({port: (3000 + i)});
		list[worker.id] = 3000 + i;
	}
} else {
	require('./server.js');
}