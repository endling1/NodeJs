// var asyncModule = require('./asyncModule.js');

// asyncModule.initialize(null);

// require('http').createServer(function(req, res){
// 	if(asyncModule.initialized){
// 		asyncModule.say(function(err, result){
// 			if(err){
// 				return res.status(400).send();
// 			}
// 			res.end(result);
// 		});
// 	} else {
// 		res.end('Not initialized\n'); // PROBLEM: This should not happen
// 	}
// }).listen(3000,() => console.log('Listening'));


// Solution
var asyncModuleWrapper = require('./asyncModuleWrapper.js');
asyncModuleWrapper.initialize();

require('http').createServer(function(req, res){
	asyncModuleWrapper.say(function(err, result){
		if(err){
				return res.status(400).send();
			}
		res.end(result);
	})
}).listen(3000,() => console.log('Listening'));