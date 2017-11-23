module.exports = function(data, callback){
	console.log('Received request');
	setTimeout(function(){
		callback(null, 'Stringified : ' + data.toString() + '\n');
	}, 2000);
};