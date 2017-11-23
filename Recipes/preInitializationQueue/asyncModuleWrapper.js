var asyncModule = require('./asyncModule.js');
var preInitializationQueue = [];

var notInitializedState = {
	initialize: function(){
		asyncModule.initialize(function(){
			activeState = initializedState;
			preInitializationQueue.forEach(function(cb){
				asyncModule.say(cb);
			});
			preInitializationQueue = [];
		});
	},
	say: function(callback){
		preInitializationQueue.push(callback);
	}
};

var initializedState = asyncModule;

var activeState = notInitializedState;

module.exports.say = function(callback){
	activeState.say(callback);
};

module.exports.initialize = function(){
	activeState.initialize();
}