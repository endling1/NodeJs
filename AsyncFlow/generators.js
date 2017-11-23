function* makeGenerator(){
	yield 'Hello generator!';
	var value = yield null;
	console.log(value);
}

var gen = makeGenerator();
console.log(gen.next()); //{ value: 'Hello generator!', done: false }
console.log(gen.next()); //{ value: null, done: false }
//gen.throw(new Error('error'));
console.log(gen.next('Hello world!'));//{ value: undefined, done: true }
