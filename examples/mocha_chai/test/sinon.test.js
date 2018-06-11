var sinon = require('sinon')
var data = require('./utils/data')
describe('sinon > spy', () => {
  let spy
  beforeEach(() => {
    spy = sinon.spy()
  })
  afterEach(function () {
    // spy.resetHistory()
  })

  it('spy > called', () => {
    // 执行传入的函数
    data.callback(spy)
    sinon.assert.called(spy)
  })

  it('spy > calledWith', () => {
    spy(data.b)
    sinon.assert.calledWith(spy, data.b)
  })

})