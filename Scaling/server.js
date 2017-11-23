require('http').createServer(function(req, res){
	res.end('Hello world!\n');
}).listen(process.env.port,() => console.log('Listening on ' + process.env.port));

setTimeout(function(){
	throw new Error('Die');
}, Math.ceil(Math.random() * 3) * 1000);