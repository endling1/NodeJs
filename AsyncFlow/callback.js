var tasks = require('./tasks.js');

// Callback hell
tasks[0](function(err){
	if(err){

	} else {
		tasks[1](function(err){
			if(err){

			} else {
				tasks[2](function(err){
					if(err){

					} else {

					}
				})
			}
		})
	}
});
// Resolution
// Step 1: Early return
tasks[0](function(err){
	if(err){
		return;
	}
	tasks[1](function(err){
		if(err){
			return;
		}
		tasks[2](function(err){
			if(err){
				return;
			} 
		});
	});
});
// Step 2: Named functions for callbacks
// Step 3: Modularize code
tasks[0](cb1);

function cb1(err){
	if(err){
		return;
	}
	tasks[1](cb2);
}

function cb2(err){
	if(err){
		return;
	}
	tasks[2](cb3);
}

function cb3(err){
	if(err){
		return;
	} 
}

// Sequential
function sequential(n){
	if(n === tasks.length){
		return console.log('Done');
	}
	tasks[n](function(){
		console.log('Finished ' + n);
		sequential(++n);
	});
}
sequential(0);

// Parallel
function parallel(){
	let n = tasks.length;
	let count = 0;
	for(let i = 0; i < n; i++){
		tasks[i](function(){
			console.log('Finished ' + i);
			if(++count === n){
				console.log('Done');
			}
		});
	}
}
parallel();

// Limited parallel
var concurrency = 2;
var running, completed, i;
running = completed = i = 0;
function limitedParallel(){
	if(completed === tasks.length){
		return console.log('Done');
	}
	while(running < concurrency && i < tasks.length){
		++running;
		(function(i){
			tasks[i](function(){
				console.log('Finished ' + i);
				--running;
				++completed;
				limitedParallel();
			});
		})(i);
		++i;
	}
}

limitedParallel();