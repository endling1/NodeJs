var tasks = require('./tasks.js');

/*
	Promises are an abstraction which allow asynchronous functions
	to return an object called promise, which represent the eventual 
	result of that operation

*/
// Promisify a callback based function
function promisify(task){
	return function promisified(){
		var args = [].slice.call(arguments);
		return new Promise(function(resolve, reject){
			args.push(function(err, result){
				if(err){
					reject(err);
				}
				if(arguments.length <= 2){
					resolve(result);
				}
				resolve([].slice.call(arguments, 1));
			});
			task.apply(null, args);
		});
	};
}

var promisified = promisify(tasks[0]);
// promisified()
// .then(function(){
// 	console.log('Promisified task executed')
// }, function(err){
// 	console.log(err.message);
// });

var promisifiedTasks = [promisified, promisified, promisified, promisified];

// Sequential
// promisifiedTasks[0]()
// .then(function(){
// 	console.log('Finished executing task 1');
// 	return promisifiedTasks[1]();
// })
// .then(function(){
// 	console.log('Finished executing task 2');
// 	return promisifiedTasks[2]();
// })
// .then(function(){
// 	console.log('Finished executing task 3');
// 	return promisifiedTasks[3]();
// })
// .then(function(){
// 	console.log('Done');
// })
// .catch(function(err){
// 	console.log(err);
// });

function sequential(){
	var promise = Promise.resolve();
	for(let i = 0; i < promisifiedTasks.length; i++){
		    promise = promise.then(function(){
			console.log('Finished executing task ' + i);
			return promisifiedTasks[i]();
		});
	}
	promise
	.then(function(){
		console.log('Done');
	})
	.catch(function(err){
		console.log(err);
	});
}
//sequential();

// Parallel
function parallel(){
	var i = 0;
	var promises = promisifiedTasks.map(function(task){
		return task().then(function(){
			console.log('Finished executing ' + (i++));
		});
	});
	return Promise.all(promises);
}
// parallel()
// .then(function(){
// 	console.log('Done!');
// })
// .catch(function(err){
// 	console.log(err);
// });
