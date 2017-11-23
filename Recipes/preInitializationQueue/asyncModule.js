var asyncModule = module.exports;

asyncModule.initialized = false;

asyncModule.initialize = function(callback){
	setTimeout(function(){
		asyncModule.initialized = true;
		if(typeof callback === 'function'){
			callback();
		}	
	}, 4000);
}

asyncModule.say = function(callback){
	process.nextTick(function(){
		if(asyncModule.initialized){
			callback(null, 'hello\n');
		} else {
			callback(new Error('module not initialized'));
		}
	});
}