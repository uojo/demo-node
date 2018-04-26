// const mocha = require('mocha')
// const {assert} = require('chai')
var fn3 = require('./cjs/mod1');
var {add} = require('ramda')
// console.log(add)
// console.log(assert)
// var assert = chai.assert;
// console.log(1,fn3)

describe('chai.assert',function(){
  console.log('describe.run', document);

  it('deepEqual',function(){
    assert.deepEqual({ tea: 'green', b:{a:1} }, { tea: 'green', b:{a:1} });
  })

  it('include',function(){
    assert.include([1,2,3], 2, 'array contains value');
    assert.include('foobar', 'foo', 'string contains substring');
    assert.include({ foo: 'bar', hello: 'universe' }, { foo: 'bar' }, 'object contains property');
    assert.include({ foo: 'bar', hello: 'universe' }, {}, 'object contains property');

  })

})

