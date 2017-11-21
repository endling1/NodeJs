/* 
	Reactor pattern:
	Application->Event Demultiplexer->Event queue->event loop
			(Resource,Operation,handler) (Event,handler)
*/

/*
	Callback pattern:
	Function passed as an argument to another function and is invoked
	with the result when the operation completes
*/

function addAsync(a, b, callback){
	setTimeout(function(){
		callback(a + b)
	}, 500);
}
console.log('before');
addAsync(1, 2, function(result){
	console.log(result);
});
console.log('after');

/* Zalgo: If an api behaves synchronously in some cases and asynchronously
in others, then it is difficult to predict its behaviour */
var sync = false;
function zalgo(){
	if(sync){
		++a;
		return;
	}
	setTimeout(function(){
		++a;
	}, 500);
}

var a = 0;
zalgo();
++a;

console.log(a); // 2 or 1

/*
	Module pattern
*/

// Revealing module

var module = (function(){
	var privateVar;
	function privateFoo(){

	};

	var export = {
		publicFoo: function(){
			privateFoo();
		},
		publicBar: function(){
			++privateVar;
		}
	};
	return export;
})();

// Module loader

function loadModule(filename, module, require){
	var str = '(function(module, exports, require){' + 
		fs.readFileSync(filename, 'utf-8'); +
	'})(module, module.exports, require);';
	eval(str);
}

function require(moduleName){
	var id = require.resolve(moduleName);
	if(require.cache[id]){
		return require.cache[id].exports;
	}
	var module = {
		id: id,
		exports: {}
	};
	require.cache[id] = module;
	loadModule(id, module, require);
	return module.exports;
}
require.cache = {};
require.resolve = function(){};

/*
	Resolving algorithm
	a) File modules: Absolute or relative path
	b) Core modules: Search node core modules
	c) Package modules: Look in node_modules, traverse up, repeat
		<modulename>.js
		<modulename>/index.js
		<modulename>.main in package.json
*/

// Cycles in require
// a.js
exports.loaded = false;
var b = require('./b.js');
module.exports = {
	loaded: true,
	bWasLoaded: b.loaded
};

//b.js
exports.loaded = false;
var a = require('./a.js');
module.exports = {
	loaded: true,
	aWasLoaded: a.loaded
};

//c.js
var a = require('./a.js');
var b = require('./b.js');

console.log(a); // {loaded: true, bWasLoaded: true}
console.log(b);	// {loaded: true, aWasLoaded: false}

/*
	The observer pattern:
	EventEmitter
*/
var EE = require('events').EventEmitter;
var e = new EE();

e.on('timeout', function(){
	console.log('timeout on');
});

e.once('timeout', function(){
	console.log('timeout once');
});

function foo(){
	setTimeout(function(){
		e.emit('timeout');
		e.emit('timeout');
	}, 1000);
}

foo();

// Make any object observable
var EE = require('events').EventEmitter;
var util = require('util');

function Foo(){
	EE.call(this);
}

util.inherits(Foo, EE);

Foo.prototype.add = function(fn){
	this.on('foo', fn);
};

var foo = new Foo();
foo.add(function(){
	console.log('foo!');
});
setTimeout(function(){
	foo.emit('foo');
}, 1000);