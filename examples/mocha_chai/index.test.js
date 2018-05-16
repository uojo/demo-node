// const mocha = require('mocha')
// const {assert} = require('chai')
var fn3 = require('./cjs/mod1');
var {add} = require('ramda')
var {ajax} = require('jquery')
// console.log(add)
// console.log(assert)
// var assert = chai.assert;
// console.log(1,fn3)
// console.log('jquery.ajax',ajax);

describe('chai.assert',function(){
  // console.log('describe.run', document);

  it('deepEqual',function(){
    assert.deepEqual({ tea: 'green', b:{a:1} }, { tea: 'green', b:{a:1} });
  })

  it('include',function(){
    assert.include([1,2,3], 2, 'array contains value');
    assert.include('foobar', 'foo', 'string contains substring');
    assert.include({ foo: 'bar', hello: 'universe' }, { foo: 'bar' }, 'object contains property');
    assert.include({ foo: 'bar', hello: 'universe' }, {}, 'object contains property');
    assert.deepEqual([1,2], [1,2], '数组相同');
    // assert.deepEqual([1,2], [2,1], '无序数组相同');
    assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'baz']);
    
  })

  false && it('async.jquery.ajax',function(done){
    ajax({
      url:'http://localhost:3000/data/_true',
      success:function(e){
        console.log('ajax.success',e);
        assert(true,'hello')
        done()
      }
    });
  })

})

