import sinon from 'sinon'
import data from '../src/data'
import log from '../src/log'

describe('sinon > fake', () => {
  let fake

  beforeEach(() => {
    fake = sinon.fake.returns(data.requestPromise(data.b))
  })

  it('promise', (done) => {
    fake().then((e) => {
      expect(e).toBe(data.b)
      done()
    })
    sinon.assert.calledOnce(fake)
  })

})
