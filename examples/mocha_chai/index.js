// const mocha = require('mocha')
const {assert} = require('chai')
// console.log(mocha)
// console.log(assert)

describe('chai.assert',()=>{
  it('deepEqual',()=>{
    assert.deepEqual({ tea: 'green', b:{a:1} }, { tea: 'green', b:{a:1} });

  })

  it('include',()=>{
    assert.include([1,2,3], 2, 'array contains value');
    assert.include('foobar', 'foo', 'string contains substring');
    assert.include({ foo: 'bar', hello: 'universe' }, { foo: 'bar' }, 'object contains property');
    assert.include({ foo: 'bar', hello: 'universe' }, {}, 'object contains property');

  })

})

