var stream = require('stream');
var util = require('util');
// Readable stream
// Reading data

// Non flowing mode
process.stdin.on('readable', function(){
	var chunk;
	while((chunk = process.stdin.read()) !== null){
		console.log(chunk.toString());
	}
});
process.stdin.on('end', function(){
	console.log('stream ended');
});

// Flowing mode
process.stdin.on('data', function(chunk){
	console.log(chunk.toString());
});
process.stdin.on('end', function(){
	console.log('stream ended');
});

// Implementing readable streams
function Foo(options){
	stream.Readable.call(this, options);
}

util.inherits(Foo, stream.Readable);

Foo.prototype._read = function(){
	var i = 10;
	while(i--){
		this.push('aaaa');
	}
	this.push(null);
}

var foo = new Foo();
foo.on('data', function(chunk){
	console.log(chunk.toString());
});
foo.on('end', function(){
	console.log('stream ended');
});
//---------------------------------------------//

// Writable streams
// Writing data

process.stdout.write('Hello world!');
process.stdout.on('finish', function(){
	console.log('Finished');
});

// write returns false if internal buffer is false
// when buffer empty again, drain event is emitted

// Implementing Writable streams
function Foo(){
	stream.Writable.call(this, {decodeStrings: false});
}

util.inherits(Foo, stream.Writable);

Foo.prototype._write = function(chunk, encoding, callback){
	console.log(chunk);
}

var foo = new Foo();
foo.write('hello world');
//-----------------------------------------------//

// Transform streams
function Foo(){
	stream.Transform.call(this);
}
util.inherits(Foo, stream.Transform);

Foo.prototype._transform = function(chunk, encoding, callback){
	this.push(chunk.toString());
}

Foo.prototype._flush = function(callback){
	this.push('flush');
	callback();
}

var foo = new Foo();
foo.on('data', function(chunk){
	console.log(chunk.toString());
});
foo.write('Hello World!');
foo.end();
//----------------------------------------------//

// Passthrough streams
var foo = new stream.PassThrough();
foo.on('data', function(chunk){
	console.log(chunk.toString());
});
foo.write('Hello World!');
foo.end();
//-------------------------------------------//

// Flow control using streams

function asyncTask(cb){
	setTimeout(function(){
		cb(null);
	}, 500);
};
var tasks = [asyncTask, asyncTask, asyncTask, asyncTask];

var fromArray = require('from2-array');
var through = require('through2');

var i = 0;

// Sequential
fromArray.obj(tasks)
.pipe(through.obj(function(task, enc, done){
	task(function(){
		console.log('Completed task ' + (i++));
		done();
	});
}))
.on('finish', function(){
	console.log('Done!');
});

// Parallel
fromArray.obj(tasks)
.pipe(through.obj(function(task, enc, done){
	task(function(){
		console.log('Completed task ' + (i++));
	});
	done();
}, function(done){
	console.log('flush');
}))
.on('finish', function(){
	console.log('Done!');
});